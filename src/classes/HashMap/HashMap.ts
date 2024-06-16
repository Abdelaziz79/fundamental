import IReactFlow from "@/interfaces/IReactFlow";

export default class HashMap<K, V> implements IReactFlow {
  private map: Map<K, V>;
  private options: { posX?: number; posY?: number; nodeType?: string };
  private p: string | null;

  constructor(
    options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    } = {
      posX: 0,
      posY: 0,
      nodeType: "HashMapNode",
    }
  ) {
    this.options = options;
    this.map = new Map<K, V>();
    this.p = null;
  }

  static deepCopy<T>(instance: T): T {
    if (instance === null || typeof instance !== "object") {
      return instance;
    }

    if (Array.isArray(instance)) {
      return instance.map((item) => HashMap.deepCopy(item)) as unknown as T;
    }

    if (instance instanceof HashMap) {
      const copy = new HashMap<any, any>(
        Object.assign({}, instance.getOptions())
      );
      (instance.getMap() as Map<any, any>).forEach((value, key) => {
        copy.set(key, HashMap.deepCopy(value));
      });
      copy.setPointer(instance.getPointer());
      return copy as unknown as T;
    }

    if (instance instanceof Map) {
      const copy = new Map<any, any>();
      instance.forEach((value, key) => {
        copy.set(key, HashMap.deepCopy(value));
      });
      return copy as unknown as T;
    }

    const copy = Object.create(Object.getPrototypeOf(instance));
    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        (copy as any)[key] = HashMap.deepCopy((instance as any)[key]);
      }
    }

    return copy;
  }

  setPointer(p: string | null) {
    this.p = p;
  }

  getPointer() {
    return this.p;
  }

  private async createHashMap(
    map: Map<K, V>,
    elements: { nodes: any[]; edges: any[] },
    posX: number | undefined,
    posY: number | undefined,
    nodeType: string | undefined
  ) {
    if (map === null || map === undefined) return;
    const parentId = `parent-${crypto.randomUUID()}`;

    elements.nodes.push({
      id: parentId,
      type: "group",
      data: { label: null },
      position: { x: posX ?? 0, y: posY ?? 0 },
      style: {
        padding: "2rem",
        backgroundColor: "white",
        border: "1px solid rgb(22,163,74)",
        boxShadow: "2px 2px 5px #888888",
      },
    });

    elements.nodes.push({
      id: crypto.randomUUID(),
      data: {
        label: "key",
      },
      type: "HashMapNode",
      parentId: parentId,
      extent: "parent",
      expandParent: true,
      draggable: false,
      position: { x: 0, y: 0 },
    });

    elements.nodes.push({
      id: crypto.randomUUID(),
      data: {
        label: "value",
      },
      parentId: parentId,
      type: "HashMapNode",
      extent: "parent",
      expandParent: true,
      draggable: false,
      position: { x: 150, y: 0 },
    });

    const mapArray = Array.from(map);
    let i = 1;

    for (const [key, value] of mapArray) {
      const nodeId = crypto.randomUUID();

      const keyNode = {
        id: nodeId,
        data: { label: key?.toString() },
        type: this.p
          ? this.p === key?.toString()
            ? "RedHashMapNode"
            : nodeType ?? "HashMapNode"
          : nodeType ?? "HashMapNode",
        parentId: parentId,
        extent: "parent",
        expandParent: true,
        draggable: false,
        position: { x: 0, y: i * 100 },
        style: {},
      };
      elements.nodes.push(keyNode);

      if (typeof (value as any)?.getReactFlowElements === "function") {
        (value as any).setPosition(150, i * 100);
        await (value as any)?.getReactFlowElements().then((res: any) => {
          if (res.nodes.length > 0)
            res.nodes.forEach((node: any) => {
              if (node.id.startsWith("parent")) {
                node.parentId = parentId;
                node.expandParent = true;
                node.extent = "parent";
                node.draggable = false;
              }
            });
          if (res.nodes.length > 0) elements.nodes.push(...res.nodes);
          if (res.edges.length > 0) elements.edges.push(...res.edges);
        });
      } else {
        const valueNode = {
          id: crypto.randomUUID(),
          data: { label: value?.toString() },
          type: nodeType ?? "HashMapNode",
          parentId: parentId,
          extent: "parent",
          expandParent: true,
          draggable: false,
          position: { x: 150, y: i * 100 },
          style: {},
        };
        elements.nodes.push(valueNode);
      }
      i++;
    }
  }

  setOptions(options: {
    posX?: number;
    posY?: number;
    nodeType?: string;
  }): void {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  setPosition(posX: number, posY: number) {
    this.options.posX = posX;
    this.options.posY = posY;
  }

  getPosition() {
    return {
      posX: this.options.posX,
      posY: this.options.posY,
    };
  }

  set(key: K, value: V) {
    this.map.set(key, value);
  }

  get(key: K) {
    return this.map.get(key);
  }

  getMap() {
    return this.map;
  }

  delete(key: K) {
    this.map.delete(key);
  }

  size() {
    return this.map.size;
  }

  clear() {
    this.map.clear();
  }

  async getReactFlowElements(): Promise<{
    nodes: any[];
    edges: any[];
  }> {
    const elements: { nodes: any[]; edges: any[] } = {
      nodes: [],
      edges: [],
    };
    const { posX, posY, nodeType } = this.options;
    await this.createHashMap(this.map, elements, posX, posY, nodeType);
    return Promise.resolve(elements);
  }
}
