"use client";
import { cn } from "@/lib/utils";
import { animated, config, useSpring } from "@react-spring/web";
import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  getSmoothStepPath,
  Handle,
  MarkerType,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const CustomNodeComponent = ({
  data,
}: {
  data: {
    label: string;
    description: string;
    icon?: string;
    headerColor: string;
    stats?: any;
    difficulty?: string;
    difficultyColor?: string;
  };
}) => {
  const spring = useSpring({
    from: { opacity: 0, transform: "scale(0.8) translateY(20px)" },
    to: { opacity: 1, transform: "scale(1) translateY(0)" },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={spring}
      className="custom-node w-72 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className={`custom-node-header p-4 ${data.headerColor} text-white`}>
        <h2 className="text-xl font-bold mb-1">{data.label}</h2>
        <p className="text-sm opacity-80">{data.description}</p>
      </div>
      <div className="custom-node-content p-4">
        <div className="flex items-center justify-between mb-4">
          {data.difficulty && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${data.difficultyColor}`}
            >
              {data.difficulty}
            </span>
          )}
        </div>
        {data.stats && (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className="bg-white p-2 rounded-lg shadow">
                <p className="text-xs font-semibold text-gray-500">{key}</p>
                <p className="text-lg font-bold text-gray-800">
                  {value as string}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </animated.div>
  );
};
function CustomEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: React.CSSProperties;
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 20,
  });

  const springProps = useSpring({
    from: { strokeDashoffset: 1000 },
    to: { strokeDashoffset: 0 },
    delay: 500,
  });

  return (
    <animated.path
      style={{
        ...style,
        ...springProps,
        strokeWidth: 2,
        stroke: "#888",
        fill: "none",
        strokeDasharray: 5,
      }}
      d={edgePath}
      markerEnd={MarkerType.ArrowClosed}
    />
  );
}

const newNodeTypes = {
  customNode: CustomNodeComponent,
};

const newEdgeTypes = {
  customEdge: CustomEdgeComponent,
};

type Props = {
  mainNodes: any[];
  mainEdges: any[];
  className?: string;
};
export default function MainRF({ mainNodes, mainEdges, className }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  useEffect(() => {
    setNodes(mainNodes);
    setEdges(mainEdges);
  }, [mainNodes, mainEdges, setNodes, setEdges]);
  return (
    <div className={cn("", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={newNodeTypes}
        edgeTypes={newEdgeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
