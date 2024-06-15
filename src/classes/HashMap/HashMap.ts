import IReactFlow from "@/interfaces/IReactFlow";

export default class HashMap<K, V> implements IReactFlow {
  private map;
  constructor() {
    this.map = new Map<K, V>();
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

  async getReactFlowElements({
    posX = 0,
    posY = 0,
    nodeType = "default",
  }: { posX?: number; posY?: number; nodeType?: string } = {}): Promise<{
    nodes: any[];
    edges: any[];
  }> {
    const elements: { nodes: any[]; edges: any[] } = {
      nodes: [],
      edges: [],
    };

    await this.createHashMap(this.map, elements, posX, posY, nodeType);
    return Promise.resolve(elements);
  }

  private async createHashMap(
    map: Map<K, V>,
    elements: { nodes: any[]; edges: any[] },
    posX: number,
    posY: number,
    nodeType: string
  ) {
    if (map === null || map === undefined) return;
    const parentId = `parent-${crypto.randomUUID()}`;

    elements.nodes.push({
      id: parentId,
      type: "group",
      data: { label: null },
      position: { x: posX, y: posY },
      style: {
        padding: "2rem",
        boxShadow: "2px 2px 5px #888888",
        backgroundColor: "white",
      },
    });

    elements.nodes.push({
      id: crypto.randomUUID(),
      data: {
        label: "key",
      },
      type: "default",
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
      type: "default",
      extent: "parent",
      expandParent: true,
      draggable: false,
      position: { x: 170, y: 0 },
    });
    const mapArray = Array.from(map);
    let i = 1;

    for (const [key, value] of mapArray) {
      const nodeId = crypto.randomUUID();

      const keyNode = {
        id: nodeId,
        data: { label: key?.toString() },
        type: nodeType,
        parentId: parentId,
        extent: "parent",
        expandParent: true,
        draggable: false,
        position: { x: 0, y: i * 100 },
      };
      elements.nodes.push(keyNode);

      if (typeof (value as any)?.getReactFlowElements === "function") {
        await (value as any)
          ?.getReactFlowElements({ posX: 170, posY: i * 100 })
          .then((res: any) => {
            if (res.nodes.length > 0)
              res.nodes.forEach((node: any) => {
                if (node.id.startsWith("parent")) {
                  node.parentId = parentId;
                  node.expandParent = true;
                  node.extent = "parent";
                }
              });
            if (res.nodes.length > 0) elements.nodes.push(...res.nodes);
            if (res.edges.length > 0) elements.edges.push(...res.edges);
          });
      } else {
        const valueNode = {
          id: crypto.randomUUID(),
          data: { label: value?.toString() },
          type: nodeType,
          parentId: parentId,
          extent: "parent",
          expandParent: true,
          draggable: false,
          position: { x: 170, y: i * 100 },
        };
        elements.nodes.push(valueNode);
      }
      i++;
    }
  }
  static deepCopy<T>(instance: T): T {
    if (instance === null || typeof instance !== "object") {
      return instance;
    }

    if (Array.isArray(instance)) {
      return instance.map((item) => HashMap.deepCopy(item)) as unknown as T;
    }

    if (instance instanceof HashMap) {
      const copy = new HashMap<any, any>();
      (instance.getMap() as Map<any, any>).forEach((value, key) => {
        copy.set(key, HashMap.deepCopy(value));
      });
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
}
