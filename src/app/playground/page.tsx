"use client";

import { BSTNodeType } from "@/classes/BinarySearchTree/BSTNodeType";
import { HashMapNodeType } from "@/classes/HashMap/HashMapNodeType";
import { VectorNodeType } from "@/classes/VectorRF/VecNodeType";
import ConsolePanel from "@/components/ConsolePanel";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import compile, { Util, addLibs } from "@/main/main";
import { wait } from "@/utils/helpers";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {};

const allNodesTypes = {
  ...BSTNodeType,
  ...HashMapNodeType,
  ...VectorNodeType,
};

export default function Playground({}: Props) {
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
  // TODO: add db
  // TODO: enhance animation
  // TODO: add custom node
  // TODO: add custom edge

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [running, setRunning] = useState(false);
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState<string[] | null>(null);
  const [autoFrame, setAutoFrame] = useState<boolean>(true);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
    addLibs(monaco);
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
        // const { posX, posY } = ele.getPosition();
        // if (posX === 0 && posY === 0) ele.setPosition(0, i * 200);
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
    // Util.autoCopy(code);
    let runCode = code;
    if (autoFrame)
      runCode = Util.autoCopy(code, [
        "Table",
        "BinarySearchTree",
        "HashMap",
        "VectorRF",
      ]);
    // const runCode = code;
    // Convert typescript code to JavaScript
    const result = typescript.transpileModule(runCode, {
      compilerOptions: {
        module: typescript.ModuleKind.ESNext,
        target: typescript.ScriptTarget.ESNext,
      },
    });
    try {
      // Run the compiled JavaScript code

      const res = await compile(result.outputText);
      // Restore the original console.log
      console.log = log;
      setLogs(capturedLogs);
      await wait(0.3);

      // setElements([], []);
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

  useEffect(() => {
    setCode(`
enum ElkAlgorithm {
  SporeOverlap = "sporeOverlap",
  Layered = "layered",
  Random = "random",
  Box = "box",
  MrTree = "mrtree",
  Disco = "disco",
  Fixed = "fixed",
  Force = "force",
  Radial = "radial",
  RectPacking = "rectpacking",
  SporeCompaction = "sporeCompaction",
  Stress = "stress",
}

const defaultElkLayoutOptionsBS = {
  "elk.algorithm": ElkAlgorithm.MrTree,
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  // Add default values for other options as needed
};

let nodes = [];
let edges = [];
let animatedNodesIds = [];


let frame = [];

function main() {

  const vec = new VectorRF<number>();

  const bst = new BinarySearchTree<number>();

  for (let i = 0; i < 30; i++) {
    const num = Math.round(Math.random() * 100);
    bst.insert(num);
    vec.push_back(num)
   
  }

  return { frame };
} 
      `);
  }, []);

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
        />
        <Editor
          className="w-full h-full"
          height={"100%"}
          defaultLanguage="typescript"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          value={code}
          theme="vs-dark"
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
              nodeTypes={allNodesTypes}
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
}: {
  handleRun: () => void;
  handleFormat: () => void;
  running: boolean;
  autoFrame: boolean;
  setAutoFrame: (value: boolean) => void;
}) {
  return (
    <div className="w-full flex items-center h-5 bg-zinc-800">
      <Button
        onClick={handleRun}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
        disabled={running}
      >
        Run
      </Button>
      <Button
        onClick={handleFormat}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
      >
        format
      </Button>
      <div className="flex  bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none text-white gap-2 items-center ">
        <Checkbox
          id="autoFrame"
          checked={autoFrame}
          onCheckedChange={() => setAutoFrame(!autoFrame)}
        />
        <Label htmlFor="autoFrame">Auto Frame</Label>
      </div>
    </div>
  );
}
