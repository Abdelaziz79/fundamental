import IController from "@/interfaces/IController";
import IReactFlow from "@/interfaces/IReactFlow";

export default class StackRF<T> implements IReactFlow, IController {
  private elements: T[];
  private reactFlowElements: { nodes: any[]; edges: any[] };
  private options: { nodeType: string } = {
    nodeType: "stackNode",
  };
  private posX?: number = 0;
  private posY?: number = 0;
  private pointer: number | null = null;

  constructor() {
    this.elements = [];
    this.reactFlowElements = {
      nodes: [],
      edges: [],
    };
  }
  setPointer(index: number | null) {
    this.pointer = index;
  }
  clone<T>(instance: T): T {
    if (instance === null || typeof instance !== "object") {
      return instance;
    }

    if (Array.isArray(instance)) {
      return instance.map((item) => this.clone(item)) as unknown as T;
    }

    const copy = Object.create(Object.getPrototypeOf(instance));
    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        (copy as any)[key] = this.clone((instance as any)[key]);
      }
    }

    return copy;
  }
  getOptions(): {} {
    return this.options;
  }
  getPosition(): { posX: number | undefined; posY: number | undefined } {
    return { posX: this.posX, posY: this.posY };
  }
  setOptions(options: { nodeType: string }): void {
    this.options = options;
  }
  setPosition(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  push(element: any) {
    this.elements.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.elements.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.elements[this.elements.length - 1];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  size() {
    return this.elements.length;
  }

  async getReactFlowElements() {
    const { nodeType } = this.options;
    const parentNodeId = `parent-${crypto.randomUUID()}`;

    const nodeHeight = 72; // Adjusted node height
    const nodeSpacing = 8; // Space between nodes
    const parentPadding = 16; // Padding inside parent node

    this.reactFlowElements.nodes.push({
      id: parentNodeId,
      type: "group",
      data: { label: null },
      position: { x: this.posX ?? 0, y: this.posY ?? 0 },
      style: {
        border: "2px solid #4B5563",
        borderRadius: "8px",
        backgroundColor: "#F3F4F6",
        padding: `${parentPadding}px`,
        height:
          this.elements.length * (nodeHeight + nodeSpacing) + parentPadding * 2,
        width: 180,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    });
    for (let i = this.elements.length - 1; i >= 0; i--) {
      const element = this.elements[i];
      const nodeId = crypto.randomUUID();
      const node = {
        id: nodeId,
        data: { label: element?.toString(), isPointer: this.pointer === i },
        parentId: parentNodeId,
        position: {
          x: parentPadding,
          y:
            (this.elements.length - 1 - i) * (nodeHeight + nodeSpacing) +
            parentPadding,
        },
        expandParent: true,
        extent: "parent",
        draggable: false,
        type: nodeType ?? "stackNode",
      };
      this.reactFlowElements.nodes.push(node);
    }
    return this.reactFlowElements;
  }
}

export const StackNode = ({
  data,
}: {
  data: { label: any; isPointer: boolean };
}) => {
  return (
    <div>
      <div
        className={`
        h-[72px] w-[148px] 
        flex items-center justify-center 
        border-2 ${data.isPointer ? "border-blue-500" : "border-gray-300"}
        rounded-md 
        ${data.isPointer ? "bg-blue-100" : "bg-white"}
        shadow-md 
        transition-all duration-300 ease-in-out
        hover:shadow-lg
        hover:scale-110
      `}
      >
        <div
          className={`
          text-lg font-semibold 
          ${data.isPointer ? "text-blue-700" : "text-gray-700"}
        `}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
};

export const StackNodeType = {
  stackNode: StackNode,
};
