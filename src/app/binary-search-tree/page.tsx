"use client";

import BinarySearchTree from "@/classes/BinarySearchTree";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";

import Controller from "./Controller";

import { useState } from "react";
import "reactflow/dist/style.css";
import { Item } from "./Types";
import { NodeType } from "./utilsComponents";

const BSTFlow = ({ bst }: { bst: BinarySearchTree<number> }) => {
  const [nodes, _setNodes, onNodesChange] = useNodesState([]);
  const [edges, _setEdges, onEdgesChange] = useEdgesState([]);
  const [showingItems, setShowingItems] = useState<Item[]>([]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NodeType}
      >
        <MiniMap />
        <Controls />
        <Controller
          bst={bst}
          setShowingItems={setShowingItems}
          showingItems={showingItems}
        />

        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </>
  );
};

export default function BinarySearchTreeComponent() {
  const bst = new BinarySearchTree<number>();

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <BSTFlow bst={bst} />
    </div>
  );
}
