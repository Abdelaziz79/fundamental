const VectorRFDeclaration = `
declare class VectorRF<T> {
  private items: T[];

  constructor();

  // Add an item to the vector
  push_back(item: T): void;

  pop_back(): T | undefined;

  // Get an item at a specific index
  get(index: number): T | undefined;

  // Get the size of the vector
  size(): number;

  // Check if the vector is empty
  isEmpty(): boolean;

  // Clear all items in the vector
  clear(): void;

  // Convert vector to an array
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
  }: {
    posX?: number;
    posY?: number;
    nodeType?: string;
    indexType?: string;
  }): Promise<{ nodes: any[]; edges: any[] }>;
}
`;
export default VectorRFDeclaration;
