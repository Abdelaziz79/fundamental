import { memo } from "react";

function VectorNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden border border-green-600 h-10 w-20 font-bold flex items-center justify-center">
      {data.label}
    </div>
  );
}

function IndexNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden h-10 text-sm w-10 font-bold flex items-center justify-center">
      {data.label}
    </div>
  );
}

export const VectorNodeType = {
  VectorNode: memo(VectorNode),
  IndexNode: memo(IndexNode),
};
