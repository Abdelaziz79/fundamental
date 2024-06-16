export default interface IReactFlow {
  setOptions(options: {}): void;

  getOptions(): {};

  setPosition(posX: number, posY: number): void;

  getPosition(): {
    posX: number | undefined;
    posY: number | undefined;
  };

  getReactFlowElements({}): Promise<{
    nodes: any[];
    edges: any[];
  }>;
}
