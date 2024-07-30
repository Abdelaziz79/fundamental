import HashMap from "../HashMap/HashMap";

export default class Table<K, V> extends HashMap<K, V> {
  constructor() {
    super();
  }

  // Clone function to create a deep copy of the Table instance
  clone(instance: any): any {
    const clonedTable = new Table<K, V>();

    // Copy all key-value pairs from the original table to the cloned table
    for (const [key, value] of Array.from(this.getMap())) {
      // Deep copy of values if they are objects or arrays
      const copiedValue = Array.isArray(value)
        ? [...value]
        : value instanceof Object
        ? { ...value }
        : value;
      clonedTable.set(key, copiedValue as V);
    }

    // Copy options
    const options = this.getOptions();
    clonedTable.setOptions({ ...options });

    // Copy position and pointer
    const position = this.getPosition();
    clonedTable.setPosition(position.posX ?? 0, position.posY ?? 0);
    clonedTable.setPointer(this.getPointer());

    return clonedTable;
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
        padding: "2.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backgroundImage: "linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)",
        border: "2px solid #10b981",
        borderRadius: "12px",
        boxShadow:
          "0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)",
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
        position: { x: 120 * i, y: 0 },
        style: {
          fontSize: "1.5rem",
        },
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
            position: { x: 120 * i, y: (j + 1) * 80 },
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
          position: { x: 120 * i, y: 80 },
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
