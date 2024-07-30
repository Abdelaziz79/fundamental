import IController from "@/interfaces/IController";
import IReactFlow from "@/interfaces/IReactFlow";
import { type Edge, type Node } from "reactflow";
export default class ElementRF<T> implements IReactFlow, IController {
  private element: T;

  private options: {
    name?: string;
    type?: string;
  };

  private posX?: number;
  private posY?: number;

  constructor(element: T, options: {}) {
    this.element = element;
    this.options = options;
  }

  setOptions(options: {}) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  setPosition(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  getPosition(): {
    posX: number | undefined;
    posY: number | undefined;
  } {
    return { posX: this.posX, posY: this.posY };
  }

  getReactFlowElements(): Promise<{
    nodes: any[];
    edges: any[];
  }> {
    const { name, type } = this.options;

    const elements: { nodes: Node[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    elements.nodes.push({
      id: crypto.randomUUID(),
      data: {
        label: name ? `${name} : ` + this.element : this.element,
      },
      type: type ?? "customElementNode",
      position: {
        x: this.posX ?? 0,
        y: this.posY ?? 0,
      },
    });
    return Promise.resolve({ nodes: elements.nodes, edges: elements.edges });
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
}
