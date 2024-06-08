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

import compile, { addLibs } from "@/allClassses/main";
import { NodeType } from "@/classes/BinarySearchTree/BSTNodeType";
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
      setNodes(res.nodes);
      setEdges(res.edges);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2 h-full flex-col items-center ">
        <Editor
          className="w-full h-full"
          height={"100%"}
          defaultLanguage="typescript"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <Button onClick={handleRun} className="absolute bottom-0">
          Run
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NodeType}
      >
        <MiniMap />
        <Controls />

        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
