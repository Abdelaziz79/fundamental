"use client";

import { BinarySearchTree } from "@/classes/BinarySearchTree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { getRandomNumber, wait } from "@/utils/helpers";
import { PopoverContent } from "@radix-ui/react-popover";
import { useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Node, useReactFlow } from "reactflow";
import RandomCreation from "./RandomCreation";
import { Item } from "./Types";
import { createGraphElements, processNode } from "./utilsFunctions";

const Controller = ({
  bst,
  setShowingItems,
  open,
  setOpen,
}: {
  bst: BinarySearchTree<number>;
  setShowingItems: React.Dispatch<React.SetStateAction<Item[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [value, setValue] = useState<number | null>(null);
  const [deleteVal, setDeleteVal] = useState<number | null>(null);
  const [search, setSearch] = useState<number | null>(null);
  const [randomSize, setRandomSize] = useState<number | null>(null);
  const [watingTime, setWatingTime] = useState(1);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [running, setRunning] = useState(false);
  const { getNodes, setNodes, setEdges } = useReactFlow();

  function setNode(node: Node) {
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
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

  function handleSetNodes(nodes: Node[]) {
    setNodes(nodes);
  }

  async function handleSearch() {
    await processNode({
      actionType: "search",
      value: search,
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue: setSearch,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  async function handleInsert() {
    await processNode({
      actionType: "insert",
      value,
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  async function handleInOrder() {
    await processNode({
      actionType: "inOrder",
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  async function handlePreOrder() {
    await processNode({
      actionType: "preOrder",
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  async function handlePostOrder() {
    await processNode({
      actionType: "postOrder",
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  async function handleDelete() {
    await processNode({
      actionType: "delete",
      value: deleteVal,
      setRunning,
      setShowingItems,
      binarySearchTree: bst,
      getNodes,
      updateGraphElements,
      setValue: setDeleteVal,
      watingTime,
      handleSetNodes,
      wait,
    });
  }

  function handleReset() {
    setElements({ nodes: [], edges: [] });
    bst = new BinarySearchTree<number>();
    setNodes([]);
    setEdges([]);
    setShowingItems([]);
    setValue(null);
    setRandomSize(null);
    setSearch(null);
    setWatingTime(1);
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
        <div className="absolute top-4 left-4 bg-white text-black text-sm p-2 shadow w-72 z-50">
          <div className="flex gap-2 my-2 items-center w-full">
            <Label className="w-1/2">Random creation</Label>

            <Popover>
              <PopoverTrigger asChild className="w-1/2">
                <Button disabled={running} size={"sm"}>
                  Random
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
              Insert
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
              onClick={handleInsert}
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
          <div className="flex gap-2 my-2 items-center w-full ">
            <Label htmlFor="delete" className="w-16">
              Delete
            </Label>
            <Input
              type="text"
              value={deleteVal ?? ""}
              onChange={(event) => setDeleteVal(Number(event.target.value))}
              placeholder="Enter a value"
              id="delete"
              className="w-1/2"
            />
            <Button
              disabled={running}
              onClick={handleDelete}
              size="sm"
              variant={"destructive"}
              className="w-16"
            >
              delete
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
          <div className="flex gap-2 my-2  w-full">
            <div className="flex gap-2 my-2 items-center w-1/2 flex-wrap ">
              <Button
                disabled={running}
                onClick={handlePreOrder}
                size={"sm"}
                className="w-full"
                variant={"outline"}
              >
                Pre Order
              </Button>
              <Button
                disabled={running}
                onClick={handleInOrder}
                size={"sm"}
                className="w-full"
                variant={"outline"}
              >
                In Order
              </Button>
              <Button
                className="w-full"
                disabled={running}
                onClick={handlePostOrder}
                size={"sm"}
                variant={"outline"}
              >
                Post Order
              </Button>
              <Button
                className="w-full"
                disabled={running}
                onClick={handleReset}
                size={"sm"}
                variant={"destructive"}
              >
                Reset
              </Button>
            </div>
            <div className="flex  my-2 p-2 rounded items-center w-1/2 flex-wrap border border-gray-200">
              <div className="flex gap-2 my-2 items-center w-full  ">
                <Label className="">Tree Depth:</Label>
                <Label className="">{bst.getDepth()}</Label>
              </div>
              <div className="flex gap-2 my-2 items-center w-full ">
                <Label className="">Min Node:</Label>
                <Label className="">{bst.getMinItem()}</Label>
              </div>
              <div className="flex gap-2 my-2 items-center w-full ">
                <Label className="">Max Node:</Label>
                <Label className="">{bst.getMaxItem()}</Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Controller;
