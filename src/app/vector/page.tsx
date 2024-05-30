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
type Props = {};

function VectorRFComp({ vec }: { vec: VectorRF<number> }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  useEffect(() => {
    createVector({ vec, elements });
    setNodes(elements.nodes);
    setEdges(elements.edges);
  }, [vec, elements, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={VectorNodeType}
    >
      <MiniMap />
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}

export default function VectorComp({}: Props) {
  const vec = new VectorRF<number>();
  vec.push_back(1);
  vec.push_back(2);
  vec.push_back(3);
  vec.push_back(1);
  vec.push_back(2);
  vec.push_back(3);
  vec.push_back(1);
  vec.push_back(2);
  vec.push_back(3);
  vec.push_back(1);
  vec.push_back(2);
  vec.push_back(3);
  return (
    <div className="bg-gray-100 h-screen w-screen">
      <VectorRFComp vec={vec} />
    </div>
  );
}
