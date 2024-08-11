"use client";

import ConsolePanel from "@/components/ConsolePanel";
import EditorButtons from "@/components/EditorButtons";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "@/components/ui/use-toast";
import compile, { addLibs } from "@/main/main";
import Util from "@/main/Util";
import { wait } from "@/utils/helpers";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import pako from "pako";
import { useEffect, useRef, useState } from "react";
import { LuExpand } from "react-icons/lu";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import * as typescript from "typescript";
import { animate } from "../binary-search-tree/utilsFunctions";

function compressAndEncode(data: any): string {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(jsonString);
  return btoa(
    Array.from(compressed, (byte) => String.fromCharCode(byte)).join("")
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeAndDecompress(encoded: string): any {
  try {
    // Restore base64 padding
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = encoded.length % 4;
    if (pad) {
      encoded += "=".repeat(4 - pad);
    }

    const binary = atob(encoded);
    const compressed = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      compressed[i] = binary.charCodeAt(i);
    }
    const decompressed = pako.inflate(compressed, { to: "string" });
    return JSON.parse(decompressed);
  } catch (error) {
    console.error("Decompression error:", error);
    throw new Error("Failed to decode or decompress shared data");
  }
}

// Helper function to stringify any value
function stringifyValue(value: any): string {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value);
    }
  }
  return String(value);
}

// Function to capture and format log messages
function captureLog(
  type: string,
  originalConsole: any,
  capturedLogs: { type: string; message: string }[],
  args: any[]
): void {
  const formattedArgs = args.map(stringifyValue);
  const logMessage = formattedArgs.join(" ");
  capturedLogs.push({ type, message: logMessage });
  originalConsole[type](...args);
}

type Props = {
  codeString?: string;
  autoFrameCheckbox?: boolean;
};

export default function Playground({
  codeString = `let frame = [];
let wait = 0.5;

function main() {
    // write your code here

    return { frame, wait }
}`,
}: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [running, setRunning] = useState(false);
  const [code, setCode] = useState(codeString);
  const [logs, setLogs] = useState<{ type: string; message: string }[] | null>(
    null
  );
  const [theme, setTheme] = useState<string>("andromeeda");
  const [newNodes, setNewNodes] = useState(Util.getAllNodeTypes());
  const [newEdges, setNewEdges] = useState(Util.getAllEdgeTypes());
  const [codePanelOpen, setCodePanelOpen] = useState(true);
  const [consolePanelOpen, setConsolePanelOpen] = useState(true);
  const [files, setFiles] = useState([
    { name: "index.tsx", content: codeString },
  ]);
  const [currentFile, setCurrentFile] = useState("index.tsx");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get("shared");

    if (sharedData) {
      try {
        const decodedFiles = decodeAndDecompress(sharedData);
        if (Array.isArray(decodedFiles) && decodedFiles.length > 0) {
          setFiles(decodedFiles);
          setCurrentFile(decodedFiles[0].name);
        } else {
          throw new Error("Invalid file data structure");
        }
      } catch (error: any) {
        console.error("Error parsing shared files:", error);
        toast({
          title: "Error",
          description: `Failed to load shared files: ${error.message}`,
          variant: "destructive",
        });
      }
    }
  }, []);

  function handleShare() {
    try {
      const encodedFiles = compressAndEncode(files);
      const shareUrl = `https://fundamental-iota.vercel.app/playground?shared=${encodedFiles}`;

      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Shared link copied",
        description: "Link copied to clipboard",
        className: "bg-green-200 border-green-400 border-2 text-gray-700",
      });
    } catch (error) {
      console.error("Error sharing files:", error);
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive",
      });
    }
  }

  async function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    addLibs(editor, monaco);
    editorRef.current = editor;
  }

  function handleEditorChange(fileName: string, value: string | undefined) {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.name === fileName ? { ...file, content: value || "" } : file
      )
    );
  }

  function addNewFile() {
    const newFileName = `file${files.length + 1}.tsx`;
    setFiles((prevFiles) => [...prevFiles, { name: newFileName, content: "" }]);
    setCurrentFile(newFileName);
  }

  function setElements(nodes: any[], edges: any[]) {
    setNodes(nodes);
    setEdges(edges);
  }

  async function getFrameElements({
    frame,
    watingTime,
  }: {
    frame: any[];
    watingTime: number;
  }) {
    await wait(watingTime);

    let nodes: any[] = [];
    let edges: any[] = [];
    frame?.map(async (ele: any, i) => {
      try {
        if (typeof ele?.getReactFlowElements === "function") {
          await ele.getReactFlowElements().then((res: any) => {
            if (!res) {
              return;
            }
            nodes = nodes.concat(res.nodes);
            edges = edges.concat(res.edges);
          });
        } else if (typeof ele?.call === "function") {
          ele?.call();
        } else {
          throw new Error("invalid frame element", ele);
        }
        window.requestAnimationFrame(() => {
          setElements(nodes, edges);
        });
      } catch (e: any) {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      }
    });
  }

  async function handleRun() {
    setRunning(true);
    try {
      // Handle console.log to use it in console panel
      const originalConsole = { ...console };
      const capturedLogs: { type: string; message: string }[] = [];

      // Override console methods
      console.log = (...args: any[]) =>
        captureLog("log", originalConsole, capturedLogs, args);
      console.error = (...args: any[]) =>
        captureLog("error", originalConsole, capturedLogs, args);
      console.warn = (...args: any[]) =>
        captureLog("warn", originalConsole, capturedLogs, args);
      console.info = (...args: any[]) =>
        captureLog("info", originalConsole, capturedLogs, args);
      console.debug = (...args: any[]) =>
        captureLog("debug", originalConsole, capturedLogs, args);

      let compiledCode = "";

      // Compile all files
      for (const file of files) {
        // Convert typescript code to JavaScript
        const result = typescript.transpileModule(file.content, {
          compilerOptions: {
            module: typescript.ModuleKind.ESNext,
            target: typescript.ScriptTarget.ESNext,
            jsx: typescript.JsxEmit.React,
            jsxFactory: `React.createElement`,
            jsxFragmentFactory: `React.Fragment`,
          },
        });

        compiledCode += result.outputText + "\n";
      }

      // Run the compiled JavaScript code
      const res = await compile(compiledCode);
      setNewNodes(Util.getAllNodeTypes());
      setNewEdges(Util.getAllEdgeTypes());

      // Restore the original console
      console = originalConsole;
      setLogs(capturedLogs);
      await wait(0.2);

      if (res?.frame) {
        for (let i = 0; i < res?.frame.length; i++) {
          await getFrameElements({
            frame: res?.frame[i],
            watingTime: res?.wait ?? 0.2,
          });
        }
      }

      if (res?.nodes && res?.edges) {
        setElements(res?.nodes, res?.edges);
      }
      if (res?.animatedNodesIds) {
        await animate({
          NodesId: res?.animatedNodesIds,
          newNodes: res?.nodes ?? [],
          watingTime: res?.wait ?? 0.2,
          setNodes,
          newNodeType: "red",
        });
      }
      if (res?.nodes && res?.edges) {
        setElements(res?.nodes, res?.edges);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setRunning(false);
  }

  function handleFormat() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }

  function handleExpand() {
    setCodePanelOpen(!codePanelOpen);
    setConsolePanelOpen(!consolePanelOpen);
  }

  return (
    <div className="h-screen">
      <ExpandComp handleExpand={handleExpand} />

      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-screen flex"
      >
        <ResizablePanel
          defaultSize={30}
          className={`w-1/2 h-full flex-col items-center ${
            codePanelOpen ? "" : "hidden"
          }`}
        >
          <EditorButtons
            handleFormat={handleFormat}
            handleRun={handleRun}
            running={running}
            theme={theme}
            setTheme={setTheme}
            handleShare={handleShare}
          />
          <FileTabs
            files={files}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            addNewFile={addNewFile}
          />
          <Editor
            className="w-full h-full"
            height={"100%"}
            defaultLanguage="typescript"
            onMount={handleEditorDidMount}
            defaultPath={"index.tsx"}
            value={files.find((f) => f.name === currentFile)?.content || ""}
            path={currentFile}
            onChange={(value) => handleEditorChange(currentFile, value)}
            theme={theme ?? "vs-dark"}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={newNodes}
                edgeTypes={newEdges}
              >
                <Controls />
                <Background variant={BackgroundVariant.Dots} />
              </ReactFlow>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel
              defaultSize={20}
              className={`${consolePanelOpen ? "" : "hidden"}`}
            >
              <ConsolePanel logs={logs} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function ExpandComp({ handleExpand }: { handleExpand: () => void }) {
  return (
    <div className="z-50 absolute top-4 right-4">
      <Button size={"icon"} variant={"outline"} onClick={handleExpand}>
        <LuExpand size={24} />
      </Button>
    </div>
  );
}
function FileTabs({
  files,
  currentFile,
  setCurrentFile,
  addNewFile,
}: {
  files: { name: string; content: string }[];
  currentFile: string;
  setCurrentFile: (file: string) => void;
  addNewFile: () => void;
}) {
  return (
    <div className="w-full flex items-center h-5 bg-zinc-800">
      {files.map((file) => (
        <Button
          key={file.name}
          className={` hover:bg-zinc-600 h-5 rounded-none ${
            currentFile === file.name ? "bg-blue-500 text-white" : "bg-zinc-700"
          }`}
          onClick={() => setCurrentFile(file.name)}
        >
          {file.name}
        </Button>
      ))}
      <Button
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
        onClick={addNewFile}
      >
        + New File
      </Button>
    </div>
  );
}
