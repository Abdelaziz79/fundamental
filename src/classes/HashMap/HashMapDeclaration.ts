const HashMapDeclaration = `
declare class HashMap<K, V> {
  private map: Map<K, V>;
    private options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    };

    constructor(options?: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    });

    setPosition(posX: number, posY: number): void;

    getPosition(): {
      posX: number | undefined;
      posY: number | undefined;
    };

    setOptions(options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    }): void;

    getOptions(): {
      posX?: number;
      posY?: number;
      nodeType?: string;
    };

    set(key: K, value: V): void;

    get(key: K): V | undefined;

    getMap(): Map<K, V>;

    delete(key: K): void;

    size(): number;

    clear(): void;

    getReactFlowElements(): Promise<{
      nodes: any[];
      edges: any[];
    }>;

    private createHashMap(
      map: Map<K, V>,
      elements: { nodes: any[]; edges: any[] },
      posX: number | undefined,
      posY: number | undefined,
      nodeType: string | undefined
    ): Promise<void>;

    static deepCopy<T>(instance: T): T;
}
  `;

export default HashMapDeclaration;
