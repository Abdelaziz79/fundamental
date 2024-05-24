import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

export default function RandomCreation({
  treeSize,
  handleTreeSize,
  min,
  max,
  setMin,
  setMax,
  handleSubmit,
}: {
  handleSubmit: () => void;
  min: number | null;
  max: number | null;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  treeSize: number | null;
  handleTreeSize: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="absolute left-20">
      <div className="flex flex-col bg-white m-2 shadow-xl w-[300px] p-2  ">
        <div className="flex gap-2 my-2 items-center w-full ">
          <Label htmlFor="TreeSize" className="w-1/2 ">
            Tree size
          </Label>
          <Input
            id="TreeSize"
            placeholder="Value"
            value={treeSize ?? ""}
            onChange={handleTreeSize}
          />
        </div>
        <div className="flex gap-2 my-2 items-center w-full ">
          <Label htmlFor="min" className="w-1/2 ">
            Min number
          </Label>
          <Input
            id="TreeSize"
            placeholder="Value"
            value={min ?? ""}
            onChange={(e) => setMin(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 my-2 items-center w-full ">
          <Label htmlFor="max" className="w-1/2 ">
            Max number
          </Label>
          <Input
            id="max"
            placeholder="Value"
            value={max ?? ""}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 my-2 items-center w-full ">
          <Button className="" size={"sm"} onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
