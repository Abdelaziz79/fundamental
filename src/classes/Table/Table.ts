import HashMap from "../HashMap/HashMap";

export default class Table<K, V> extends HashMap<K, V> {
  constructor() {
    super();
  }

  private async getTableElements(
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

    const mapArray = Array.from(map);
    let i = 0;
    for (const [key, value] of mapArray) {
      const nodeId = crypto.randomUUID();

      const keyNode = {
        id: nodeId,
        data: { label: key?.toString() },
        type: this.getPointer()
          ? this.getPointer() === key?.toString()
            ? "RedHashMapNode"
            : nodeType ?? "HashMapNode"
          : nodeType ?? "HashMapNode",
        parentId: parentId,
        extent: "parent",
        expandParent: true,
        draggable: false,
        position: { x: 100 * i, y: 0 },
        style: {},
      };

      elements.nodes.push(keyNode);

      if (Array.isArray(value)) {
        let j = 0;
        for (const item of value) {
          elements.nodes.push({
            id: crypto.randomUUID(),
            data: { label: item?.toString() },
            type: nodeType ?? "HashMapNode",
            parentId: parentId,
            extent: "parent",
            expandParent: true,
            draggable: false,
            position: { x: 100 * i, y: (j + 1) * 80 },
            style: {},
          });
          j++;
        }
      } else {
        const valueNode = {
          id: crypto.randomUUID(),
          data: { label: value?.toString() },
          type: nodeType ?? "HashMapNode",
          parentId: parentId,
          extent: "parent",
          expandParent: true,
          draggable: false,
          position: { x: 100 * i, y: 80 },
          style: {},
        };

        elements.nodes.push(valueNode);
      }

      i++;
    }
  }

  async getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }> {
    const elements = {
      nodes: [],
      edges: [],
    };
    const { nodeType, posX, posY } = this.getOptions();
    await this.getTableElements(this.getMap(), elements, posX, posY, nodeType);

    return Promise.resolve(elements);
  }

  setOptions(options: {
    posX?: number | undefined;
    posY?: number | undefined;
    nodeType?: string | undefined;
  }): void {
    super.setOptions(options);
  }

  getOptions(): {
    posX?: number | undefined;
    posY?: number | undefined;
    nodeType?: string | undefined;
  } {
    return super.getOptions();
  }

  setPosition(posX: number, posY: number): void {
    super.setPosition(posX, posY);
  }

  getPosition(): { posX: number | undefined; posY: number | undefined } {
    return super.getPosition();
  }

  setPointer(p: string | null): void {
    super.setPointer(p);
  }

  getPointer(): string | null {
    return super.getPointer();
  }

  getMap(): Map<K, V> {
    return super.getMap();
  }

  set(key: K, value: V) {
    super.set(key, value);
  }

  clear(): void {
    super.clear();
  }

  delete(key: K) {
    super.delete(key);
  }

  get(key: K) {
    return super.get(key);
  }

  size(): number {
    return super.size();
  }
}
