import { Handle, Position } from "reactflow";

import React from "react";

export const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="hover:scale-110 ease-in-out shadow-xl hover:shadow-green-500/35 overflow-hidden bg-gradient-to-br from-green-200 to-green-300 border-green-400 border-2 text-gray-700 rounded-full min-w-20 min-h-20 font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-green-300 hover:to-green-400">
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
      <span className="text-sm">{data.label}</span>
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

export const RedNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="hover:scale-105 ease-in-out transition-all  shadow-2xl hover:shadow-red-500/35 overflow-hidden bg-gradient-to-br from-red-200 to-red-300 border-red-400 border-2 text-gray-700 rounded-full min-w-20 min-h-20 font-semibold flex items-center justify-center cursor-pointer  duration-300 hover:from-red-300 hover:to-red-400">
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
      <span className="text-sm">{data.label}</span>
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
