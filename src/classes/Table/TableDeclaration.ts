const TableDeclaration = `
declare class Table<K, V> extends HashMap<K, V> {
  constructor();

  private getTableElements(
    map: Map<K, V>,
    elements: Elements,
    posX: number | undefined,
    posY: number | undefined,
    nodeType: string | undefined
  ): Promise<void>;
  getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }>;
  setOptions(options: {
    posX?: number | undefined;
    posY?: number | undefined;
    nodeType?: string | undefined;
  }): void;
  getOptions(): {
    posX?: number | undefined;
    posY?: number | undefined;
    nodeType?: string | undefined;
  };
  setPosition(posX: number, posY: number): void;
  getPosition(): { posX: number | undefined; posY: number | undefined };
  setPointer(p: string | null): void;
  getPointer(): string | null;
  getMap(): Map<K, V>;
  set(key: K, value: V): this;
  clear(): void;
  delete(key: K): boolean;
  get(key: K): V | undefined;
  size(): number;
  clone(instance: any): any;
}

`;

export default TableDeclaration;
