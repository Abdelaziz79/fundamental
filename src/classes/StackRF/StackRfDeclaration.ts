const StackRFDeclaration = `
declare class StackRF<T> {
  private elements: T[];
  private reactFlowElements: { nodes: any[]; edges: any[] };
  private options: { nodeType: string };
  private posX?: number;
  private posY?: number;

  constructor();

  clone<T>(instance: T): T;

  getOptions(): { nodeType: string };

  getPosition(): { posX: number | undefined; posY: number | undefined };

  setOptions(options: { nodeType: string }): void;

  setPosition(posX: number, posY: number): void;

  push(element: T): void;

  pop(): T | undefined;

  peek(): T | undefined;

  isEmpty(): boolean;

  getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }>;
  setPointer(index: number | null) : void;
  
  }
`;
export default StackRFDeclaration;
