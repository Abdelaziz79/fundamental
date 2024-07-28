"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
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

interface CustomNodeProps {
  data: {
    label: string;
    description: string;
    icon?: string;
    headerColor: string;
    stats?: Record<string, string>;
    difficulty?: string;
    difficultyColor?: string;
    items?: Array<{ id: string; title: string; topics: string }>;
    href?: string;
  };
}

const CustomNodeComponent: React.FC<CustomNodeProps> = ({ data }) => {
  const spring = useSpring({
    from: { opacity: 0, transform: "scale(0.9) translateY(20px)" },
    to: { opacity: 1, transform: "scale(1) translateY(0) " },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={spring}
      className="w-80 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />

      <div className={`p-5 ${data.headerColor} text-white`}>
        <h2 className="text-2xl font-bold mb-2">{data.label}</h2>
        <p className="text-sm opacity-90">{data.description}</p>
      </div>

      <div className="p-5 space-y-4">
        {data.difficulty && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${data.difficultyColor}`}
          >
            {data.difficulty}
          </span>
        )}

        {data.stats && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className="bg-gray-100 p-3 rounded-lg">
                <p className="text-xs font-semibold text-gray-600">{key}</p>
                <p className="text-lg font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        )}

        {data.items && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                View Topics
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[400px] sm:w-[540px] sm:max-w-[80vw] overflow-y-auto"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold">
                  {data.label}
                </SheetTitle>
                <SheetDescription>{data.description}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 pb-6">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Topics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.items?.map((item) => (
                      <Link
                        key={item.id}
                        href={`${data.href}/${item.id}`}
                        className="bg-white bg-opacity-20 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-30"
                      >
                        <span className="text-white font-medium">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
