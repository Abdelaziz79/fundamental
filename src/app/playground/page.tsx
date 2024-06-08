"use client";

import { Button } from "@/components/ui/button";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import * as typescript from "typescript";

import compile, { addLibs } from "@/main/main";
import { NodeType } from "@/classes/BinarySearchTree/BSTNodeType";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { animate } from "../binary-search-tree/utilsFunctions";
type Props = {};

export default function Playground({}: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [code, setCode] = useState("");
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

  const fullCode = `${code}`;

  async function handleRun() {
    const result = typescript.transpileModule(fullCode, {
      compilerOptions: {
        module: typescript.ModuleKind.ESNext,
        target: typescript.ScriptTarget.ESNext,
      },
    });
    try {
      // Run the compiled JavaScript code
      const res = await compile(result.outputText);
      setNodes(res?.nodes || []);
      setEdges(res?.edges || []);
      if (res?.animatedNodesIds) {
        await animate({
          NodesId: res?.animatedNodesIds,
          newNodes: res?.nodes,
          watingTime: 0.5,
          setNodes,
          newNodeType: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFormate() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-screen flex"
    >
      <ResizablePanel className="w-1/2 h-full flex-col items-center ">
        <div className="w-full flex items-center h-5 bg-zinc-800">
          <Button
            onClick={handleRun}
            className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
          >
            Run
          </Button>
          <Button
            onClick={handleFormate}
            className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
          >
            formate
          </Button>
        </div>
        <Editor
          className="w-full h-full"
          height={"100%"}
          defaultLanguage="typescript"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={NodeType}
        >
          <Controls />

          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
