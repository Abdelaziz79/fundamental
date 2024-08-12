import { LuExpand } from "react-icons/lu";
import { Button } from "./ui/button";

export default function ExpandComp({
  handleExpand,
}: {
  handleExpand: () => void;
}) {
  return (
    <div className="z-50 absolute top-4 right-4">
      <Button size={"icon"} variant={"outline"} onClick={handleExpand}>
        <LuExpand size={24} />
      </Button>
    </div>
  );
}
