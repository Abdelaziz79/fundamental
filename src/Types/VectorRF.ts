import IReactFlow from "@/interfaces/IReactFlow";
import { Edge, Node } from "reactflow";

export default class VectorRF<T> implements IReactFlow {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Add an item to the vector
  push_back(item: T): void {
    this.items.push(item);
  }

  pop_back(): T | undefined {
    if (this.items.length > 0) {
      return this.items.pop();
    }
    return undefined;
  }

  // Get an item at a specific index
  get(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }

  // Get the size of the vector
  size(): number {
    return this.items.length;
  }

  // Check if the vector is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Clear all items in the vector
  clear(): void {
    this.items = [];
  }

  // Convert vector to an array
  toArray(): T[] {
    return this.items.slice();
  }

  private createVector({
    items,
    elements,
    posX,
    posY,
    nodeType,
    indexType,
  }: {
    items: T[];
    elements: { nodes: Node[]; edges: Edge[] };
    posX: number;
    posY: number;
    nodeType: string;
    indexType: string;
  }) {
    if (items === null || items === undefined || items.length === 0) return;
    const parentId = `parent-${crypto.randomUUID()}`;
    elements.nodes.push({
      id: parentId,
      type: "group",
      data: { label: null },
      position: { x: posX, y: posY },
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
        id: `node-${i}`,
        data: { label: items[i]?.toString() },
        position: { x: i * 80, y: 0 },
        type: nodeType,
        parentId: parentId,
        expandParent: true,
        extent: "parent",
        draggable: false,
      });
      elements.nodes.push({
        id: `index-${i}`,
        data: { label: i.toString() },
        position: { x: i * 80 + 20, y: 30 },
        type: indexType,
        parentId: parentId,
        extent: "parent",
        draggable: false,
        connectable: false,
      });
    }
  }

  getReactFlowElements({
    posX = 0,
    posY = 0,
    nodeType = "VectorNode",
    indexType = "IndexNode",
  }: {
    posX?: number;
    posY?: number;
    nodeType?: string;
    indexType?: string;
  }): Promise<{ nodes: any[]; edges: any[] }> {
    const elements = {
      nodes: [],
      edges: [],
    };

    this.createVector({
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
