"use client";

import { BinarySearchTree } from "@/classes/BinarySearchTree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { getRandomNumber, wait } from "@/utils/helpers";
import { PopoverContent } from "@radix-ui/react-popover";
import { useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Node, useReactFlow } from "reactflow";
import RandomCreation from "./RandomCreation";
import { Item } from "./Types";
import { createGraphElements } from "./utilsFunctions";

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
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(true);
  const { getNodes, setNodes, setEdges } = useReactFlow();
  const { toast } = useToast();
  function setNode(node: Node) {
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
  }

  async function handleSearch() {
    if (search === null) return;
    setRunning(true);
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
    setRunning(false);
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
      bst.insert(getRandomNumber(min, max));
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
    setRunning(true);
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
    setRunning(false);
  }

  async function handlePreOrder() {
    setRunning(true);
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
    setRunning(false);
  }

  async function handlePostOrder() {
    setRunning(true);
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
    setRunning(false);
  }

  function handleReset() {
    setElements({ nodes: [], edges: [] });
    bst = new BinarySearchTree<number>();
    setNodes([]);
    setEdges([]);
    setShowingItems([]);
    setValue(null);
    setRandomSize(null);
    setWatingTime(1);
    setSearch(null);
    setMin(0);
    setMax(100);
  }

  return (
    <>
      <div className="z-50 absolute top-4 right-4">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setOpen(!open)}
        >
          <LuSlidersHorizontal size={24} />
        </Button>
      </div>
      {open && (
        <div className="absolute opacity-90 top-4 left-4 bg-white text-black text-sm p-2 shadow w-72 z-50">
          <div className="flex gap-2 my-2 items-center w-full">
            <Label className="w-1/2">Random creation</Label>

            <Popover>
              <PopoverTrigger asChild className="w-1/2">
                <Button disabled={running} size={"sm"}>
                  Random{" "}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <RandomCreation
                  treeSize={randomSize}
                  handleTreeSize={handleRandomSize}
                  min={min}
                  max={max}
                  setMin={setMin}
                  setMax={setMax}
                  handleSubmit={handleSubmitRandomSize}
                />
              </PopoverContent>
            </Popover>
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
            <Button
              disabled={running}
              onClick={handleSubmit}
              size="sm"
              className="w-16"
            >
              insert
            </Button>
          </div>
          <div className="flex gap-2 my-2 items-center w-full ">
            <Label htmlFor="find" className="w-16">
              Find
            </Label>
            <Input
              type="text"
              value={search ?? ""}
              onChange={(event) => setSearch(Number(event.target.value))}
              placeholder="Enter a value"
              id="find"
              className="w-1/2"
            />
            <Button
              disabled={running}
              onClick={handleSearch}
              size="sm"
              className="w-16"
            >
              find
            </Button>
          </div>
          <div className="flex flex-col gap-2 my-2  w-full ">
            <Label>Animation Time {watingTime}(s)</Label>
            <Slider
              min={0.1}
              max={2}
              step={0.1}
              value={[watingTime]}
              className="my-2 bg-green-100 "
              onValueChange={(value) => {
                setWatingTime(value[0]);
              }}
            />
          </div>

          <div className="flex gap-2 my-2 items-center w-full flex-wrap ">
            <Button
              disabled={running}
              onClick={handlePreOrder}
              size={"sm"}
              className="w-1/2"
              variant={"outline"}
            >
              Pre Order Traverse
            </Button>
            <Button
              disabled={running}
              onClick={handleInOrder}
              size={"sm"}
              className="w-1/2"
              variant={"outline"}
            >
              In Order Traverse
            </Button>
            <Button
              disabled={running}
              onClick={handlePostOrder}
              size={"sm"}
              className="w-1/2"
              variant={"outline"}
            >
              Post Order Traverse
            </Button>
            <Button
              disabled={running}
              onClick={handleReset}
              size={"sm"}
              className="w-1/2"
              variant={"destructive"}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Controller;
