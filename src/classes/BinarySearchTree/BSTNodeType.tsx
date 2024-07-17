import { Handle, Position } from "reactflow";

export const CustomNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="overflow-hidden bg-green-200 border-green-400 border-2 text-gray-700 rounded-full w-14 h-14 font-semibold flex items-center justify-center hover:bg-green-500">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="opacity-0"
      />
      {data.label}
    </div>
  );
};

export const MidCustomNode: React.FC<{ data: { label: string } }> = ({
  data,
}) => {
  return (
    <div className="overflow-hidden bg-green-200 border-green-400 border-2 text-gray-700 rounded-full w-11 h-11 text-sm font-semibold flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="opacity-0"
      />

      {data.label}
    </div>
  );
};

export const RedNode: React.FC<{ data: { label: string } }> = ({ data }) => {
  return (
    <div className="overflow-hidden bg-red-200 border-red-400 border-2 text-gray-700 rounded-full w-14 h-14 font-semibold flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="opacity-0"
      />
      {data.label}
    </div>
  );
};

export const SmallCustomNode: React.FC<{ data: { label: string } }> = ({
  data,
}) => {
  return (
    <div className="overflow-hidden bg-green-200 border-green-400 border-2 text-gray-700 rounded-full w-7 h-7 text-sm font-semibold flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="opacity-0"
      />

      {data.label}
    </div>
  );
};

export const BSTNodeType = {
  custom: CustomNode,
  mid: MidCustomNode,
  red: RedNode,
  small: SmallCustomNode,
};
