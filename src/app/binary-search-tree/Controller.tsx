"use client";

import { BinarySearchTree } from "@/classes/BinarySearchTree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { wait } from "@/utils/helpers";
import { useState } from "react";
import { Node, useReactFlow } from "reactflow";
import { Item } from "./Types";
import { createGraphElements } from "./utilsFunctions";
import { useToast } from "@/components/ui/use-toast";

const Controller = ({
  bst,
  setShowingItems,
}: {
  bst: BinarySearchTree<number>;
  setShowingItems: React.Dispatch<React.SetStateAction<Item[]>>;
}) => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [value, setValue] = useState<number | null>(null);
  const [randomSize, setRandomSize] = useState<number | null>(null);
  const [watingTime, setWatingTime] = useState(1);
  const [search, setSearch] = useState<number | null>(null);
  const { getNodes, setNodes, setEdges } = useReactFlow();
  const { toast } = useToast();
  function setNode(node: Node) {
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
  }

  async function handleSearch() {
    if (search === null) return;
    setShowingItems([]);
    let newNodes: Node[] = getNodes();
    let newNodesId: string[] = [];

    const res = bst.search(search, (node) => {
      newNodesId.push(node.id);
    });

    for (let i = 0; i < newNodesId.length; i++) {
      newNodes = newNodes.map((node) => {
        if (node.id === newNodesId[i]) {
          setShowingItems((items) => [
            ...items,
            { label: node.data["label"], id: node.id },
          ]);
          return { ...node, type: "red" };
        }
        return node;
      });
      handleSetNodes(newNodes);
      await wait(watingTime);
    }
    if (res)
      toast({
        title: "found",
        description: "Item found",
        variant: "default",
        className: "bg-green-200 border-green-500 border-2  ",
      });
    else
      toast({
        title: "not found",
        description: "Item not found",
        variant: "destructive",
      });
    updateGraphElements();
    setSearch(null);
  }

  function updateGraphElements() {
    setElements({ nodes: [], edges: [] });
    const TreeDepth = bst.getDepth();
    createGraphElements(bst.getRoot(), 300, 40, 0, elements, TreeDepth);
    setNodes(elements.nodes);
    setEdges(elements.edges);
  }

  function handleRandomSize(e: React.ChangeEvent<HTMLInputElement>) {
    setRandomSize(Number(e.target.value));
  }

  function handleSubmitRandomSize() {
    if (randomSize === null) return;
    for (let i = 0; i < randomSize; i++) {
      bst.insert(Math.round(Math.random() * 100));
    }
    updateGraphElements();
    setRandomSize(null);
  }

  function handleAddNode(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value));
  }

  function handleSubmit() {
    if (value === null) return;
    bst.insert(value);
    updateGraphElements();
    setValue(null);
  }

  function handleSetNodes(nodes: Node[]) {
    setNodes(nodes);
  }

  async function handleInOrder() {
    setShowingItems([]);
    let newNodes: Node[] = getNodes();
    let newNodesId: string[] = [];
    bst.inOrderTraverse((node) => {
      newNodesId.push(node.id);
    });

    for (let i = 0; i < newNodesId.length; i++) {
      newNodes = newNodes.map((node) => {
        if (node.id === newNodesId[i]) {
          setShowingItems((items) => [
            ...items,
            { label: node.data["label"], id: node.id },
          ]);
          return { ...node, type: "red" };
        }
        return node;
      });
      handleSetNodes(newNodes);
      await wait(watingTime);
    }
    updateGraphElements();
  }

  async function handlePreOrder() {
    setShowingItems([]);
    let newNodes: Node[] = getNodes();
    let newNodesId: string[] = [];
    bst.preOrderTraverse((node) => {
      newNodesId.push(node.id);
    });

    for (let i = 0; i < newNodesId.length; i++) {
      newNodes = newNodes.map((node) => {
        if (node.id === newNodesId[i]) {
          setShowingItems((items) => [
            ...items,
            { label: node.data["label"], id: node.id },
          ]);
          return { ...node, type: "red" };
        }
        return node;
      });
      handleSetNodes(newNodes);
      await wait(watingTime);
    }
    updateGraphElements();
  }

  async function handlePostOrder() {
    setShowingItems([]);
    let newNodes: Node[] = getNodes();
    let newNodesId: string[] = [];
    bst.postOrderTraverse((node) => {
      newNodesId.push(node.id);
    });

    for (let i = 0; i < newNodesId.length; i++) {
      newNodes = newNodes.map((node) => {
        if (node.id === newNodesId[i]) {
          setShowingItems((items) => [
            ...items,
            { label: node.data["label"], id: node.id },
          ]);
          return { ...node, type: "red" };
        }
        return node;
      });
      handleSetNodes(newNodes);
      await wait(watingTime);
    }
    updateGraphElements();
  }

  return (
    <div className="absolute top-5 left-5 bg-white text-black text-sm p-2 shadow w-72 z-50">
      <div className="flex gap-2 my-2 items-center w-full  ">
        <Label htmlFor="random" className="w-16">
          Random
        </Label>
        <Input
          type="text"
          value={randomSize ? randomSize : ""}
          onChange={handleRandomSize}
          placeholder="Enter a value"
          id="random"
          className="w-1/2"
        />
        <Button onClick={handleSubmitRandomSize} size="sm" className="w-16">
          create
        </Button>
      </div>
      <div className="flex gap-2 my-2 items-center w-full ">
        <Label htmlFor="value" className="w-16">
          Value
        </Label>
        <Input
          type="text"
          value={value ?? ""}
          onChange={handleAddNode}
          placeholder="Enter a value"
          id="value"
          className="w-1/2"
        />
        <Button onClick={handleSubmit} size="sm" className="w-16">
          insert
        </Button>
      </div>
      <div className="flex gap-2 my-2 items-center w-full ">
        <Label htmlFor="search" className="w-16">
          Search
        </Label>
        <Input
          type="text"
          value={search ?? ""}
          onChange={(event) => setSearch(Number(event.target.value))}
          placeholder="Enter a value"
          id="search"
          className="w-1/2"
        />
        <Button onClick={handleSearch} size="sm" className="w-16">
          search
        </Button>
      </div>
      <div className="flex flex-col gap-2 my-2  w-full ">
        <Label>Animation Time {watingTime}(s)</Label>
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={[watingTime]}
          className="my-2 bg-green-100"
          onValueChange={(value) => {
            setWatingTime(value[0]);
          }}
        />
      </div>

      <div className="flex gap-2 my-2 items-center w-full flex-wrap ">
        <Button onClick={handlePreOrder} size={"sm"} className="w-1/2">
          Pre Order Traverse
        </Button>
        <Button onClick={handleInOrder} size={"sm"} className="w-1/2">
          In Order Traverse
        </Button>
        <Button onClick={handlePostOrder} size={"sm"} className="w-1/2">
          Post Order Traverse
        </Button>
      </div>
    </div>
  );
};

export default Controller;
