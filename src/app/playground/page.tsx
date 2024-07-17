"use client";
import { VscDebugStart, VscListFlat } from "react-icons/vsc";

import ConsolePanel from "@/components/ConsolePanel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import compile, { addLibs } from "@/main/main";
import Util from "@/main/Util";
import { wait } from "@/utils/helpers";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef, useState } from "react";
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
  autoFrameCheckbox = true,
}: Props) {
  // TODO: check if need parent node in the getReactflowGraphElements           ✅
  // TODO: add waiting time                                                     ✅
  // TODO: create draw frames array                                             ✅
  // TODO: make interface have getReactFlowElements method                      ✅
  // TODO: edit vector can highlight the index                                  ✅
  // TODO: make vector support two highlight for two pointer and sliding window ✅
  // TODO: edit vector that can take all items in constructor                   ✅
  // TODO: make item for vector have unique id                                  ✅
  // TODO: add hash map                                                         ✅
  // TODO: crete alert function                                                 ✅
  // TODO: set value name options in the IReactFlow interface                   ✅
  // TODO: fix hash map                                                         ✅
  // TODO: make function to auto create deep copy                               ✅
  // TODO: create table                                                         ✅
  // TODO: add console panel                                                    ✅
  // TODO: add generic function to make copies                                  ✅
  // TODO: fix this function to accept all types and createToast Function       ✅
  // TODO: add function to auto copy                                            ✅
  // TODO: add db                                                               ✅
  // TODO: add IReactFlow interface to the web                                  ✅
  // TODO: add one element class like string number                             ✅
  // TODO: add backend                                                          ✅
  // TODO: add helper functions to the web                                      ✅
  // TODO: make the playground as tsx file                                      ✅
  // TODO: add the stack
  // TODO: add more feature to compile function
  // TODO: enhance animation

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [running, setRunning] = useState(false);
  const [code, setCode] = useState(codeString);
  const [logs, setLogs] = useState<string[] | null>(null);
  const [autoFrame, setAutoFrame] = useState<boolean>(autoFrameCheckbox);
  const [theme, setTheme] = useState<string>("andromeeda");

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [newNodes, setNewNodes] = useState(Util.getAllNodeTypes());
  const [newEdges, setNewEdges] = useState(Util.getAllEdgeTypes());

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
      if (typeof ele?.getReactFlowElements === "function") {
        await ele.getReactFlowElements().then((res: any) => {
          nodes = nodes.concat(res.nodes);
          edges = edges.concat(res.edges);
        });
      } else {
        ele?.call();
      }
      window.requestAnimationFrame(() => {
        setElements(nodes, edges);
      });
    });
  }

  async function handleRun() {
    setRunning(true);
    // handle console.log to use it in console panel
    const log = console.log;
    const capturedLogs: string[] = [];

    console.log = (...args: any[]) => {
      capturedLogs.push(args.join(" "));
      log(...args);
    };
    let runCode = code;
    if (autoFrame)
      runCode = Util.autoCopy(code, [
        "Table",
        "BinarySearchTree",
        "HashMap",
        "VectorRF",
        "ElementRF",
      ]);

    // Convert typescript code to JavaScript
    const result = typescript.transpileModule(runCode, {
      compilerOptions: {
        module: typescript.ModuleKind.ESNext,
        target: typescript.ScriptTarget.ESNext,
        jsx: typescript.JsxEmit.React, // Add this line
      },
    });
    try {
      // Run the compiled JavaScript code
      const res = await compile(result.outputText);
      setNewNodes(Util.getAllNodeTypes());
      setNewEdges(Util.getAllEdgeTypes());

      // Restore the original console.log
      console.log = log;
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
    } catch (error) {
      console.log(error);
    }
    setRunning(false);
  }

  function handleFormat() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-screen flex"
    >
      <ResizablePanel
        defaultSize={30}
        className="w-1/2 h-full flex-col items-center "
      >
        <EditorButtons
          setAutoFrame={setAutoFrame}
          autoFrame={autoFrame}
          handleFormat={handleFormat}
          handleRun={handleRun}
          running={running}
          theme={theme}
          setTheme={setTheme}
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
          <ResizablePanel defaultSize={20}>
            <ConsolePanel logs={logs} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function EditorButtons({
  handleRun,
  handleFormat,
  running,
  autoFrame,
  setAutoFrame,
  theme,
  setTheme,
}: {
  handleRun: () => void;
  handleFormat: () => void;
  running: boolean;
  autoFrame: boolean;
  setAutoFrame: (value: boolean) => void;
  theme: string;
  setTheme: (value: string) => void;
}) {
  return (
    <div className="w-full flex items-center h-5 bg-zinc-800">
      <Button
        onClick={handleRun}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
        disabled={running}
      >
        <span className="flex items-center gap-1">
          <VscDebugStart size={18} />
          Run
        </span>
      </Button>
      <Button
        onClick={handleFormat}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
      >
        <span className="flex items-center gap-1">
          <VscListFlat size={18} />
          format
        </span>
      </Button>
      <div>
        <div className="flex  bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none text-white gap-1 items-center ">
          <Checkbox
            id="autoFrame"
            checked={autoFrame}
            onCheckedChange={() => setAutoFrame(!autoFrame)}
          />
          <Label htmlFor="autoFrame">Auto Frame</Label>
        </div>
      </div>
      <div className="flex ">
        <div className="bg-zinc-700 hover:bg-zinc-600 rounded-none text-white">
          <Select onValueChange={setTheme} value={theme}>
            <SelectTrigger className="w-[150px]  border-none">
              <SelectValue placeholder="theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Theme</SelectLabel>
                {themes.map((themeName) => (
                  <SelectItem key={themeName} value={themeName}>
                    {themeName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
const themes = [
  "andromeeda",
  "catppuccin-frappe",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dark-plus",
  "dracula",
  "dracula-soft",
  "github-dark",
  "monokai",
  "one-dark-pro",
  "poimandres",
];
