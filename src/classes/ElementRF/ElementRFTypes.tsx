const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="group">
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg transform transition-all duration-300 ease-in-out group-hover:scale-105">
        <div className="font-bold text-white">{data.label}</div>
      </div>
    </div>
  );
};

export const elementNodeTypes = {
  customElementNode: CustomNode,
};
