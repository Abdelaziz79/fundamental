interface VectorNodeProps {
  data: {
    label: string;
    index: number;
    isHighlighted: boolean;
  };
}

const VectorNode: React.FC<VectorNodeProps> = ({ data }) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        w-20 h-16 m-2
        bg-gradient-to-br ${
          data.isHighlighted
            ? "from-red-400 to-pink-500"
            : "from-blue-400 to-indigo-500"
        }
        text-white font-bold
        rounded-xl shadow-lg
        border-2 ${data.isHighlighted ? "border-red-200" : "border-blue-200"}
        overflow-hidden
        relative
        hover:shadow-xl hover:shadow-blue-300/50 hover:scale-110
        transition-all duration-300 ease-in-out 
      `}
    >
      <div className="absolute top-1 left-1 text-xs opacity-70">
        {data.index}
      </div>
      <div className="text-2xl z-10">{data.label}</div>
    </div>
  );
};

function IndexNode({ data }: { data: { label: string } }) {
  return (
    <div className="overflow-hidden h-10 text-sm w-10 font-bold flex items-center justify-center">
      {data.label}
    </div>
  );
}

export const VectorNodeType = {
  VectorNode: VectorNode,
  IndexNode: IndexNode,
};
