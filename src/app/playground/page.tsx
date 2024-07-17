"use client";

import ConsolePanel from "@/components/ConsolePanel";
import EditorButtons from "@/components/EditorButtons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
        jsx: typescript.JsxEmit.React,
        jsxFactory: `React.createElement`,
        jsxFragmentFactory: `React.Fragment`,
        // Add this line
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
