const HashMapDeclaration = `
declare class HashMap<K, V> {
  private map: Map<K, V>;

  constructor();
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  getMap(): Map<K, V>;
  delete(key: K): boolean;
  size(): number;
  clear(): void;

  getReactFlowElements(params?: {
    posX?: number;
    posY?: number;
    nodeType?: string;
  }): Promise<{
    nodes: any[];
    edges: any[];
  }>;

  private createHashMap(
    map: Map<K, V>,
    elements: { nodes: any[]; edges: any[] },
    posX: number,
    posY: number,
    nodeType: string
  ): Promise<void>;

  static deepCopy<T>(instance: T): T ;
}
  `;

export default HashMapDeclaration;
