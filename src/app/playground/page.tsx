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

function formateTSX(code: string) {
  const sharedCode = code.replace("code=", "");
  const decoded = decodeURIComponent(sharedCode);
  return decoded;
}

type Props = {
  codeString?: string;
  autoFrameCheckbox?: boolean;
};

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

export default function Playground({
  codeString = `let frame = [];
let wait = 0.5;

function main() {
    // write your code here

    return { frame, wait }
}`,
  autoFrameCheckbox = false,
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

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    let sharedCode = window.location.href.split("?")[1];
    if (!sharedCode || !sharedCode.startsWith("code=")) return;
    setCode(formateTSX(sharedCode));
  }, []);

  function handleShare() {
    navigator.clipboard.writeText(
      `https://fundamental-iota.vercel.app/playground?code=${encodeURIComponent(
        code
      )}`
    );
    toast({
      title: "shared link copied",
      description: "link copied to clipboard",
      className: "bg-green-200 border-green-400 border-2 text-gray-700",
    });
  }

  async function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    addLibs(editor, monaco);
    editorRef.current = editor;
  }

  function handleEditorChange(
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) {
    setCode(value || "");
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
      // handle console.log to use it in console panel
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

      let runCode = code;

      // Convert typescript code to JavaScript
      const result = typescript.transpileModule(runCode, {
        compilerOptions: {
          module: typescript.ModuleKind.ESNext,
          target: typescript.ScriptTarget.ESNext,
          jsx: typescript.JsxEmit.React,
          jsxFactory: `React.createElement`,
          jsxFragmentFactory: `React.Fragment`,
          // Add this line
        },
      });

      // Run the compiled JavaScript code
      const res = await compile(result.outputText);
      setNewNodes(Util.getAllNodeTypes());
      setNewEdges(Util.getAllEdgeTypes());

      // Restore the original console.log
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
          <Editor
            className="w-full h-full"
            height={"100%"}
            defaultLanguage="typescript"
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            defaultPath={"index.tsx"}
            path="index.tsx"
            value={code}
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
