import { Handle, Position } from "reactflow";

function HashMapNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden rounded border border-green-600 m-5 h-10 w-20 font-bold  flex items-center justify-center shadow-sm shadow-black">
      {data.label}
    </div>
  );
}
function RedHashMapNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden rounded border border-red-600 bg-red-400 m-5 h-10 w-20 font-bold  flex items-center justify-center shadow shadow-blue-900">
      {data.label}
    </div>
  );
}
export const HashMapNodeType = {
  HashMapNode: HashMapNode,
  RedHashMapNode: RedHashMapNode,
};
