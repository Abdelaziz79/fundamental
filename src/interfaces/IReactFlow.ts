export default interface IReactFlow {
  getReactFlowElements({}): Promise<{
    nodes: any[];
    edges: any[];
  }>;
}
