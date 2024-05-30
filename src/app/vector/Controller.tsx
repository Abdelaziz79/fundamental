import VectorRF from "@/classes/VectorRF";
import Control, { ControlElement } from "@/components/Controller";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useState } from "react";
import { useReactFlow } from "reactflow";
import { createVector } from "./utilsFunctions";
type Props = {
  vec: VectorRF<string>;
  elements: {
    nodes: never[];
    edges: never[];
  };
  setElements: Dispatch<
    SetStateAction<{
      nodes: never[];
      edges: never[];
    }>
  >;
};

export default function Controller({ vec, elements, setElements }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const { setNodes } = useReactFlow();
  function updateGraphElements() {
    setElements({ nodes: [], edges: [] });
    createVector({ vec, elements, posX: 100, posY: 100 });
    setNodes(elements.nodes);
  }
  function handlePush() {
    if (!value) return;
    vec.push_back(value);
    updateGraphElements();
    setValue(null);
  }
  function handlePop() {
    vec.pop_back();
    updateGraphElements();
  }
  return (
    <Control>
      <ControlElement>
        <Label htmlFor="push" className="w-16">
          push
        </Label>
        <Input
          id="push"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Value"
          className="w-1/2"
        />
        <Button size={"sm"} className="w-16" onClick={handlePush}>
          push
        </Button>
      </ControlElement>
      <ControlElement>
        <Label htmlFor="pop" className="w-16">
          pop
        </Label>

        <Button size={"sm"} id="pop" className="w-16" onClick={handlePop}>
          pop
        </Button>
      </ControlElement>
    </Control>
  );
}
