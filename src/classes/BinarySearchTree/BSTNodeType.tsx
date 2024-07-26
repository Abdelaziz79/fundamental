import { memo } from "react";
import { Handle, Position } from "reactflow";

import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

export const CustomNode = ({ data }: { data: { label: string } }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    boxShadow: isHovered
      ? "0 0 15px 5px rgba(72, 187, 120, 0.7)"
      : "0 0 5px 2px rgba(72, 187, 120, 0.3)",
    config: { tension: 300, friction: 10 },
  });

  const labelProps = useSpring({
    opacity: isHovered ? 1 : 0.8,
    transform: isHovered ? "translateY(0px)" : "translateY(2px)",
  });

  return (
    <animated.div
      style={springProps}
      className="overflow-hidden bg-gradient-to-br from-green-200 to-green-300 border-green-400 border-2 text-gray-700 rounded-full w-20 h-20 font-semibold flex items-center justify-center cursor-pointer transition-colors duration-300 hover:from-green-300 hover:to-green-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <animated.span style={labelProps} className="text-sm">
        {data.label}
      </animated.span>
    </animated.div>
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
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    boxShadow: isHovered
      ? "0 0 15px 5px rgba(245, 101, 101, 0.7)"
      : "0 0 5px 2px rgba(245, 101, 101, 0.3)",
    config: config.wobbly,
  });

  const labelProps = useSpring({
    opacity: isHovered ? 1 : 0.8,
    transform: `rotateZ(${isHovered ? 0 : -5}deg)`,
  });

  const pulseAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "scale(1.05)" });
        await next({ transform: "scale(1)" });
      }
    },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={{ ...springProps, ...pulseAnimation }}
      className="overflow-hidden bg-gradient-to-br from-red-200 to-red-300 border-red-400 border-2 text-gray-700 rounded-full w-20 h-20 font-semibold flex items-center justify-center cursor-pointer transition-colors duration-300 hover:from-red-300 hover:to-red-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-500 transition-transform duration-300 hover:scale-125"
      />
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
      <animated.span style={labelProps} className="text-sm">
        {data.label}
      </animated.span>
    </animated.div>
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
  custom: memo(CustomNode),
  mid: memo(MidCustomNode),
  red: memo(RedNode),
  small: memo(SmallCustomNode),
};
