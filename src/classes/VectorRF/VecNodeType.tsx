import { Handle, Position } from "reactflow";

function VectorNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden border border-green-600 h-10 w-20 font-bold flex items-center justify-center">
      {data.label}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

function IndexNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden h-10 text-sm w-10 font-bold flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

export const VectorNodeType = {
  VectorNode: VectorNode,
  IndexNode: IndexNode,
};
