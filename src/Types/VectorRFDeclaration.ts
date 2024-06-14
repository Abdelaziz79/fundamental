const VectorRFDeclaration = `
declare class VectorRF<T> {
   private items: T[];
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
  }?: {
    items?: T[];
    h1?: number | null;
    h2?: number | null;
    h3?: number | null;
    setSlidingWindow?: boolean;
  });

  oneHighlight(index: number): void;
  twoHighlight(index1: number, index2: number, setSlidingWindow?: boolean): void;
  threeHighlight(index1: number, index2: number, index3: number): void;
  
  push_back(item: T): void;
  pop_back(): T | undefined;
  
  get(index: number): T | undefined;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  toArray(): T[];

  private createVector({
    items,
    elements,
    posX,
    posY,
    nodeType,
    indexType,
  }: {
    items: T[];
    elements: { nodes: any[]; edges: any[] };
    posX: number;
    posY: number;
    nodeType: string;
    indexType: string;
  }): void;

  getReactFlowElements({
    posX,
    posY,
    nodeType,
    indexType,
  }?: {
    posX?: number;
    posY?: number;
    nodeType?: string;
    indexType?: string;
  }): Promise<{ nodes: any[]; edges: any[] }>;
}
`;
export default VectorRFDeclaration;
