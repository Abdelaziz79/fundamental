const BinarySearchTreeDeclaration = `
declare class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  private insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>,
    callback?: (node: TreeNode<T>) => void
  ): void { /* Implementation omitted for brevity */ }

  private preOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void { /* Implementation omitted for brevity */ }

  private inOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void { /* Implementation omitted for brevity */ }

  private postOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void { /* Implementation omitted for brevity */ }

  private searchNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): boolean { /* Implementation omitted for brevity */ }

  private getDepthNode(node: TreeNode<T> | null): number { /* Implementation omitted for brevity */ }

  private deleteNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): TreeNode<T> | null { /* Implementation omitted for brevity */ }

  private findMinNode(node: TreeNode<T> | null): TreeNode<T> { /* Implementation omitted for brevity */ }

  private createGraphElements = (
    node: TreeNode<T> | null,
    elements: { nodes: Node[]; edges: Edge[] },
    nodeType: string,
    edgeType: string,
    rootId: string
  ) => { /* Implementation omitted for brevity */ };

  private async getBSTPositionedElements({
    elements,
    elkOptions,
    posX,
    posY,
  }: {
    elements: { nodes: any[]; edges: any[] };
    elkOptions: ElkLayoutOptions;
    posX: number;
    posY: number;
  }): Promise<{ nodes: any[]; edges: any[] }> { /* Implementation omitted for brevity */ }

  insert(value: T, callback?: (node: TreeNode<T>) => void) { /* Implementation omitted for brevity */ }

  delete(value: T, callback?: (node: TreeNode<T>) => void): void { /* Implementation omitted for brevity */ }

  search(value: T, callback?: (node: TreeNode<T>) => void): boolean { /* Implementation omitted for brevity */ }

  inOrderTraverse(callback: (node: TreeNode<T>) => void): void { /* Implementation omitted for brevity */ }

  preOrderTraverse(callback: (node: TreeNode<T>) => void): void { /* Implementation omitted for brevity */ }

  postOrderTraverse(callback: (node: TreeNode<T>) => void): void { /* Implementation omitted for brevity */ }

  getRoot(): TreeNode<T> | null { /* Implementation omitted for brevity */ }

  getDepth(): number { /* Implementation omitted for brevity */ }

  getMaxItem(): T | null { /* Implementation omitted for brevity */ }

  getMinItem(): T | null { /* Implementation omitted for brevity */ }

  getItems(): T[] { /* Implementation omitted for brevity */ }

  getReactFlowElements({
    nodeType = 'custom',
    edgeType = 'step',
    elkOptions = defaultElkLayoutOptionsBST,
    posX = 0,
    posY = 0,
    parentNode = true,
  }: {
    nodeType?: string;
    edgeType?: string;
    elkOptions?: ElkLayoutOptions;
    posX?: number;
    posY?: number;
    parentNode?: boolean;
  } = {}): Promise<{ nodes: any[]; edges: any[] }> { /* Implementation omitted for brevity */ }
}
  `;

export default BinarySearchTreeDeclaration;
