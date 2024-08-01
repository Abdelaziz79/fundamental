import IController from "@/interfaces/IController";
import IReactFlow from "@/interfaces/IReactFlow";
import Util from "@/main/Util";
import {
  BaseEdge,
  Edge,
  EdgeProps,
  getSmoothStepPath,
  Handle,
  Node,
  NodeProps,
  Position,
} from "reactflow";

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedListRF<T> implements IReactFlow, IController {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private length: number;
  private posX: number | undefined;
  private posY: number | undefined;
  private options: {
    nodeType: string;
    edgeType: string;
    layoutOptions?: any;
  };
  private pointerNode: ListNode<T> | null = null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.posX = 0;
    this.posY = 0;
    this.options = {
      nodeType: "lln",
      edgeType: "lle",
      layoutOptions: {
        nodeSpacing: 150,
        levelSpacing: 100,
      },
    };
  }
  getHead(): ListNode<T> | null {
    return this.head;
  }
  setHead(head: ListNode<T> | null) {
    this.head = head;
  }
  getTail(): ListNode<T> | null {
    return this.tail;
  }
  setTail(tail: ListNode<T> | null) {
    this.tail = tail;
  }
  setPointer(index: number): boolean {
    if (index < 0 || index >= this.length) return false;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    this.pointerNode = current;
    return true;
  }
  push_back(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  pop_back(): T | undefined {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current.value;
  }

  size(): number {
    return this.length;
  }

  push_front(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  pop_front(): T | undefined {
    if (!this.head) return undefined;

    const oldHead = this.head;
    this.head = oldHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return oldHead.value;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current!.value;
  }

  set(index: number, value: T): boolean {
    if (index < 0 || index >= this.length) return false;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    current!.value = value;
    return true;
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === 0) {
      this.push_front(value);
      return true;
    }
    if (index === this.length) {
      this.push_back(value);
      return true;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    newNode.next = current!.next;
    current!.next = newNode;
    this.length++;
    return true;
  }

  remove(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.pop_front();
    if (index === this.length - 1) return this.pop_back();

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    const removed = current!.next;
    current!.next = removed!.next;
    this.length--;
    return removed!.value;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  async getReactFlowElements() {
    const elements: { nodes: Node[]; edges: Edge[] } = { nodes: [], edges: [] };

    let current = this.head;
    let index = 0;

    while (current) {
      const nodeId = `node-${crypto.randomUUID()}`;
      elements.nodes.push({
        id: nodeId,
        type: this.options.nodeType,
        data: {
          label: current.value,
          isPointer: current === this.pointerNode, // Add this line
        },
        position: { x: 0, y: 0 },
      });

      if (index > 0) {
        elements.edges.push({
          id: `edge-${crypto.randomUUID()}`,
          source: elements.nodes[index - 1].id,
          target: nodeId,
          type: this.options.edgeType,
        });
      }

      current = current.next;
      index++;
    }

    return this.applyLayout(elements);
  }

  clearPointer(): void {
    this.pointerNode = null;
  }

  private applyLayout(elements: { nodes: Node[]; edges: Edge[] }): {
    nodes: Node[];
    edges: Edge[];
  } {
    const { nodeSpacing, levelSpacing } = this.options.layoutOptions;

    elements.nodes.forEach((node, index) => {
      node.position = {
        x: index * nodeSpacing + (this.posX || 0),
        y: this.posY || 0,
      };
    });

    return elements;
  }

  getOptions(): {} {
    return this.options;
  }

  setPosition(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  getPosition(): { posX: number | undefined; posY: number | undefined } {
    return { posX: this.posX, posY: this.posY };
  }

  setOptions(options: {
    nodeType: string;
    edgeType: string;
    layoutOptions?: any;
  }): void {
    this.options = { ...this.options, ...options };
  }

  clone<U>(instance: U): U {
    if (instance instanceof LinkedListRF) {
      const cloned = new LinkedListRF<T>();

      let current = (instance as unknown as LinkedListRF<T>).head;
      let index = 0;
      let pointerIndex = -1;

      // First pass: clone nodes and find pointer index
      while (current) {
        cloned.push_back(current.value);
        if (current === (instance as unknown as LinkedListRF<T>).pointerNode) {
          pointerIndex = index;
        }
        current = current.next;
        index++;
      }

      // Set the pointer in the cloned list
      if (pointerIndex !== -1) {
        cloned.setPointer(pointerIndex);
      }

      cloned.posX = this.posX;
      cloned.posY = this.posY;
      cloned.options = JSON.parse(JSON.stringify(this.options));

      return cloned as unknown as U;
    }

    // If the instance is not a LinkedList, return a shallow copy
    // This is a fallback and might not be suitable for all cases
    return { ...instance };
  }
}

function LinkedListNodeType({ data }: NodeProps) {
  return (
    <div className="transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer">
      <Handle type="target" position={Position.Left} className={"opacity-0"} />
      <div className="flex rounded-lg shadow-lg overflow-hidden">
        <div
          className={`${
            data?.isPointer ? "bg-red-400" : "bg-green-400"
          } w-16 h-16 flex justify-center items-center text-white font-bold text-lg`}
        >
          {data?.label}
        </div>
        <div className="w-8 bg-gray-200 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className={"opacity-0"} />
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
