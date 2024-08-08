const VectorRFDeclaration = `
declare class VectorRF<T> {
  private items: VectorNodeType<T>[];
    private options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
      indexType?: string;
    };

    private h1: number | null;
    private h2: number | null;
    private h3: number | null;
    private setSlidingWindow: boolean;

    constructor({
      items,
      h1,
      h2,
      h3,
      setSlidingWindow,
      options,
    }?: {
      items?: T[];
      h1?: number | null;
      h2?: number | null;
      h3?: number | null;
      setSlidingWindow?: boolean;
      options?: {
        posX?: number;
        posY?: number;
        nodeType?: string;
        indexType?: string;
      };
    });

    setOptions(options: {
      posX?: number;
      posY?: number;
      nodeType?: string;
      indexType?: string;
    }): void;

    getOptions(): {
      posX?: number;
      posY?: number;
      nodeType?: string;
      indexType?: string;
    };

    setPosition(posX: number, posY: number): void;

    getPosition(): { posX: number | undefined; posY: number | undefined };

    oneHighlight(index: number): void;

    twoHighlight(index1: number, index2: number, setSlidingWindow?: boolean): void;

    threeHighlight(index1: number, index2: number, index3: number): void;

    push_back(item: T): void;

    pop_back(): T | null;

    get(index: number): T | undefined;

    set(index: number, item: T): void;

    size(): number;

    isEmpty(): boolean;

    clear(): void;

    sort(compareFunction?: (a: T, b: T) => number): void;
    
    toArray(): T[];

    private createVector({
      items,
      elements,
      posX,
      posY,
      nodeType,
      indexType,
    }: {
      items: VectorNodeType<T>[];
      elements: { nodes: Node[]; edges: Edge[] };
      posX: number | undefined;
      posY: number | undefined;
      nodeType: string | undefined;
      indexType: string | undefined;
    }): void;

    getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }>;

    clone<T>(instance: T): T ;

    getItems(): T[];
    
    setItems(items: T[]): void;

    pop_front(): T | undefined;

    push_front(item: T): void;

    }
`;
export default VectorRFDeclaration;
