import { Handle, Position } from "reactflow";

function VectorNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden border-2 border-gray-800  bg-gray-50  h-10 w-20 font-semibold flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="opacity-0" />

      {data.label}
      <Handle type="target" position={Position.Top} className="opacity-0" />
    </div>
  );
}

export const VectorNodeType = {
  VectorNode: VectorNode,
};
