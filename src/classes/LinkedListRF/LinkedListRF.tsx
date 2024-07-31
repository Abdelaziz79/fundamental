import IController from "@/interfaces/IController";
import IReactFlow from "@/interfaces/IReactFlow";
import Util from "@/main/Util";
import { getLayoutElements } from "@/utils/helpers";
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  Handle,
  NodeProps,
  Position,
} from "reactflow";

export default class LinkedListRF<T> implements IReactFlow, IController {
  private list: T[];
  private posX?: number = 0;
  private posY?: number = 0;
  private options: {
    nodeType: string;
    edgeType: string;
    elkOptions?: any;
  } = {
    nodeType: "lln",
    edgeType: "lle",
  };
  constructor() {
    this.list = [];
  }

  push_back(ele: T) {
    this.list.push(ele);
  }

  pop_back() {
    return this.list.pop();
  }

  size() {
    return this.list.length;
  }

  // Enhanced getReactFlowElements method
  async getReactFlowElements() {
    const { nodeType, edgeType, elkOptions } = this.options;
    const elements: { nodes: any[]; edges: any[] } = {
      nodes: [],
      edges: [],
    };
    if (this.list.length === 0) return Promise.resolve(elements);

    elements.nodes.push({
      id: `node-0`,
      type: nodeType ?? "lln",
      data: { label: this.list[0] },
    });

    let preNodeId = `node-0`;

    for (let i = 1; i < this.list.length; i++) {
      const node = {
        id: `node-${i}`,
        type: nodeType ?? "lln",
        data: { label: this.list[i] },
      };
      elements.nodes.push(node);

      const edge = {
        id: `edge-${i}`,
        source: preNodeId,
        target: `node-${i}`,
        type: edgeType ?? "lle",
      };

      elements.edges.push(edge);
      preNodeId = `node-${i}`;
    }

    // Using ELK for layout
    const res = await getLayoutElements(
      elements.nodes,
      elements.edges,
      elkOptions ?? {
        "elk.algorithm": "rectpacking",
        "elk.spacing.nodeNode": 80,
        "elk.layered.spacing.baseValue": 100,
      }
    );
    elements.nodes = (res as any).nodes;
    elements.edges = (res as any).edges;
    return Promise.resolve(elements);
  }

  getOptions(): {} {
    return this.options;
  }

  setPosition(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  getPosition() {
    return {
      posX: this.posX,
      posY: this.posY,
    };
  }
  setOptions(options: {
    nodeType: string;
    edgeType: string;
    elkOptions?: any;
  }): void {
    this.options = { ...this.options, ...options };
  }

  clone<U>(instance: U): U {
    if (instance instanceof LinkedListRF) {
      const cloned = new LinkedListRF<T>();

      // Deep copy the list
      cloned.list = this.list.map((item) => {
        if (typeof item === "object" && item !== null) {
          return JSON.parse(JSON.stringify(item));
        }
        return item;
      });

      // Copy primitive properties
      cloned.posX = this.posX;
      cloned.posY = this.posY;

      // Deep copy the options object
      cloned.options = {
        nodeType: this.options.nodeType,
        edgeType: this.options.edgeType,
        elkOptions: this.options.elkOptions
          ? JSON.parse(JSON.stringify(this.options.elkOptions))
          : undefined,
      };

      return cloned as U;
    }

    // If the instance is not a LinkedListRF, return a shallow copy
    // This is a fallback and might not be suitable for all cases
    return { ...instance };
  }
}

function LinkedListNodeType({ data }: NodeProps) {
  return (
    <div className="transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        className={"opacity-0"}
      />
      <div className="flex rounded-lg shadow-lg overflow-hidden">
        <div
          className={`bg-green-400 w-16 h-16 flex justify-center items-center text-white font-bold text-lg`}
        >
          {data?.label}
        </div>
        <div className="w-8 bg-gray-200 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        className={"opacity-0"}
      />
    </div>
  );
}

function LinkedListEdgeType({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd="url(#arrowhead)"
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "#888",
          animation: "flowAnimation 1s infinite linear",
        }}
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
        </marker>
      </defs>
    </>
  );
}

Util.addNodeType("lln", LinkedListNodeType);
Util.addEdgeType("lle", LinkedListEdgeType);
