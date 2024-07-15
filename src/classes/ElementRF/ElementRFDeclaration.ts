const ElementRFDeclaration = `
declare class ElementRF<T> {
  private element: T;
  private options: {
    name?: string;
    type?: string;
    posX?: number;
    posY?: number;
  };

  private posX?: number;
  private posY?: number;

  constructor(element: T, options: {});
  
  setOptions(options: {}): void;

  getOptions(): {
    name?: string;
    type?: string;
    posX?: number;
    posY?: number;
  };

  setPosition(posX: number, posY: number): void;

  getPosition(): {
    posX: number | undefined;
    posY: number | undefined;
  };

  getReactFlowElements(): Promise<{
    nodes: {
      id: string;
      data: {
        label: string | T;
      };
      position: {
        x: number;
        y: number;
      };
      className?: string;
    }[];
    edges: any[];
  }>;

  clone<U>(instance: U): U;
}
`;

export default ElementRFDeclaration;
