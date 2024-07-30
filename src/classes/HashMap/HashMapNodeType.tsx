function HashMapNode({ data }: { data: { label: string } }) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-lg border-2 border-emerald-500 bg-gradient-to-br from-green-400 to-cyan-500 m-2 h-12 w-28 font-bold text-white flex items-center justify-center shadow-lg shadow-emerald-200/50 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:shadow-emerald-300/50 group-hover:scale-105">
        {data.label}
      </div>
    </div>
  );
}

function RedHashMapNode({ data }: { data: { label: string } }) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-lg border-2 border-red-600 bg-gradient-to-br from-red-500 to-pink-500 m-2 h-12 w-28 font-bold text-white flex items-center justify-center shadow-lg shadow-red-200/50 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:shadow-red-300/50 group-hover:scale-105">
        {data.label}
      </div>
    </div>
  );
}

export const HashMapNodeType = {
  HashMapNode: HashMapNode,
  RedHashMapNode: RedHashMapNode,
};
