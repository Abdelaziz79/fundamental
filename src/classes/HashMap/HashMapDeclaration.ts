const HashMapDeclaration = `
declare class HashMap<K, V> {
  private map: Map<K, V>;
    private options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    };
   private p: string | null;
    constructor(options?: {
      posX?: number;
      posY?: number;
      nodeType?: string;
    });
   setPointer(p: string | null):void;
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

    entries(): IterableIterator<[K, V]>;
    has(key: K): boolean;
    private createHashMap(
      map: Map<K, V>,
      elements: { nodes: any[]; edges: any[] },
      posX: number | undefined,
      posY: number | undefined,
      nodeType: string | undefined
    ): Promise<void>;

    clone<T>(instance: T): T;
}
  `;

export default HashMapDeclaration;
