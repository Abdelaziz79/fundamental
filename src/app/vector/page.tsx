"use client";
import VectorRF from "@/classes/VectorRF";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { VectorNodeType } from "./utilsComponents";
import { createVector } from "./utilsFunctions";
import Controller from "./Controller";
type Props = {};

function VectorRFComp({ vec }: { vec: VectorRF<string> }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  useEffect(() => {
    createVector({ vec, elements, posX: 100, posY: 100 });
    setNodes(elements.nodes);
    setEdges(elements.edges);
  }, [vec, elements, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={VectorNodeType}
    >
      <MiniMap />
      <Controls />
      <Controller vec={vec} elements={elements} setElements={setElements} />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}

export default function VectorComp({}: Props) {
  const vec = new VectorRF<string>();
  vec.push_back("I");
  vec.push_back("am");
  vec.push_back("too");
  vec.push_back("good");

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <VectorRFComp vec={vec} />
    </div>
  );
}
