import IReactFlow from "@/interfaces/IReactFlow";
import { Edge, Node } from "reactflow";
import VectorNodeType from "./VectorNodeType";

export default class VectorRF<T> implements IReactFlow {
  private items: VectorNodeType<T>[] = [];
  private options: {
    posX?: number;
    posY?: number;
    nodeType?: string;
    indexType?: string;
  };

  private h1: number | null = null;
  private h2: number | null = null;
  private h3: number | null = null;
  private setSlidingWindow = false;

  constructor({
    items = [],
    h1 = null,
    h2 = null,
    h3 = null,
    setSlidingWindow = false,
    options = {
      posX: 0,
      posY: 0,
      nodeType: "VectorNode",
      indexType: "IndexNode",
    },
  }: {
    items?: T[];
    h1?: number | null;
    h2?: number | null;
    h3?: number | null;
    setSlidingWindow?: boolean;
    options?: {
      posX?: number;
      posY?: number;
      nodeType?: string;
      indexType?: string;
    };
  } = {}) {
    items.forEach((item) => {
      this.items.push({ value: item, id: crypto.randomUUID() });
    });
    this.h1 = h1;
    this.h2 = h2;
    this.h3 = h3;
    this.setSlidingWindow = setSlidingWindow;
    this.options = options;
  }

  private async createVector({
    items,
    elements,
    posX,
    posY,
    nodeType,
    indexType,
  }: {
    items: VectorNodeType<T>[];
    elements: { nodes: Node[]; edges: Edge[] };
    posX: number | undefined;
    posY: number | undefined;
    nodeType: string | undefined;
    indexType: string | undefined;
  }) {
    if (items === null || items === undefined || items.length === 0) return;
    const parentId = `parent-${crypto.randomUUID()}`;
    elements.nodes.push({
      id: parentId,
      type: "group",
      data: { label: null },
      position: { x: posX ?? 0, y: posY ?? 0 },
      style: {
        border: "1px solid rgb(22,163,74)",
        padding: "2rem",
        width: items.length * 80,
        backgroundColor: "white",
        boxShadow: "2px 2px 5px #888888",
      },
    });
    for (let i = 0; i < items.length; i++) {
      elements.nodes.push({
        id: `node-${items[i].id}`,
        data: { label: items[i].value?.toString() },
        position: { x: i * 80, y: 0 },
        type: nodeType ?? "default",
        parentId: parentId,
        expandParent: true,
        extent: "parent",
        draggable: false,
        style: {
          backgroundColor: this.setSlidingWindow
            ? i >= this.h1! && i <= this.h2!
              ? "rgb(248, 113, 113)"
              : "white"
            : i === this.h1 || i === this.h2 || i === this.h3
            ? "rgb(248, 113, 113)"
            : "white",
        },
      });
      elements.nodes.push({
        id: `index-${items[i].id}`,
        data: { label: i.toString() },
        position: { x: i * 80 + 20, y: 30 },
        type: indexType ?? "default",
        parentId: parentId,
        extent: "parent",
        draggable: false,
        connectable: false,
        style: {
          color:
            this.h1 === i || this.h2 === i || this.h3 === i ? "red" : "black",
        },
      });
    }
  }

  setOptions(options: {
    posX?: number;
    posY?: number;
    nodeType?: string;
    indexType?: string;
  }): void {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  setPosition(posX: number, posY: number): void {
    this.options.posX = posX;
    this.options.posY = posY;
  }

  getPosition() {
    return {
      posX: this.options.posX,
      posY: this.options.posY,
    };
  }

  oneHighlight(index: number) {
    this.h1 = index;
  }

  twoHighlight(index1: number, index2: number, setSlidingWindow = false) {
    this.h1 = index1;
    this.h2 = index2;
    this.setSlidingWindow = setSlidingWindow;
  }

  threeHighlight(index1: number, index2: number, index3: number) {
    this.h1 = index1;
    this.h2 = index2;
    this.h3 = index3;
  }

  push_back(item: T): void {
    this.items.push({ value: item, id: crypto.randomUUID() });
  }

  pop_back(): T | null {
    if (this.items.length > 0) {
      return this.items.pop()?.value as T;
    }
    return null;
  }

  get(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index].value as T;
    }
    return undefined;
  }

  set(index: number, item: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index].value = item;
    }
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return this.items.map((item) => item.value as T);
  }

  async getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }> {
    const { indexType, nodeType, posX, posY } = this.options;
    const elements = {
      nodes: [],
      edges: [],
    };

    await this.createVector({
      items: this.items,
      elements,
      posX,
      posY,
      nodeType,
      indexType,
    });
    return Promise.resolve({
      nodes: elements.nodes,
      edges: elements.edges,
    });
  }
}
