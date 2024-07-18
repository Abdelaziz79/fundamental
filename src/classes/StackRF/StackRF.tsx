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

    this.reactFlowElements.nodes.push({
      id: parentNodeId,
      type: "group",
      data: { label: null },
      position: { x: this.posX ?? 0, y: this.posY ?? 0 },
      style: {
        border: "1px solid rgb(22,163,74)",
        // padding: "2rem",
        backgroundColor: undefined,
        height: this.elements.length * 80,
        width: 112,
        boxShadow: "2px 2px 5px #888888",
      },
    });

    for (let i = this.elements.length - 1; i >= 0; i--) {
      const element = this.elements[i];
      const nodeId = crypto.randomUUID();
      const node = {
        id: nodeId,
        data: { label: element?.toString() },
        parentId: parentNodeId,
        position: { x: 0, y: (this.elements.length - 1 - i) * 80 },
        expandParent: true,
        extent: "parent",
        draggable: false,
        type: nodeType ?? "stackNode",
        style: {
          backgroundColor: `${
            this.pointer === i ? "rgb(248, 113, 113)" : " white"
          } `,
        },
      };
      this.reactFlowElements.nodes.push(node);
    }
    return this.reactFlowElements;
  }
}

export const StackNode = ({ data }: { data: { label: any } }) => {
  return (
    <div className="overflow-hidden border  border-green-600 h-20 w-28 font-bold flex items-center justify-center">
      {data.label}
    </div>
  );
};

export const StackNodeType = {
  stackNode: StackNode,
};
