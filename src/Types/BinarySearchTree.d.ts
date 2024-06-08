import TreeNode from "./TreeNode";
declare class BinarySearchTree<T> {
  private root: TreeNode<T> | null;

  constructor();

  private insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>,
    callback?: (node: TreeNode<T>) => void
  ): void;

  private preOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void;

  private inOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void;

  private postOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void;

  private searchNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): boolean;

  private getDepthNode(node: TreeNode<T> | null): number;

  private deleteNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): TreeNode<T> | null;

  private findMinNode(node: TreeNode<T> | null): TreeNode<T>;

  private createGraphElements(
    node: TreeNode<T> | null,
    elements: { nodes: any[]; edges: any[] },
    nodeType: string,
    edgeType: string,
    rootId: string
  ): void;

  private getBSTPositionedElements({
    elements,
    elkOptions,
  }: {
    elements: { nodes: any[]; edges: any[] };
    elkOptions: any; // you might want to replace 'any' with correct types
  }): Promise<{ nodes: any[]; edges: any[] }>;

  insert(value: T, callback?: (node: TreeNode<T>) => void): void;

  delete(value: T, callback?: (node: TreeNode<T>) => void): void;

  search(value: T, callback?: (node: TreeNode<T>) => void): boolean;

  inOrderTraverse(callback: (node: TreeNode<T>) => void): void;

  preOrderTraverse(callback: (node: TreeNode<T>) => void): void;

  postOrderTraverse(callback: (node: TreeNode<T>) => void): void;

  getRoot(): TreeNode<T> | null;

  getDepth(): number;

  getMaxItem(): T | null;

  getMinItem(): T | null;

  getItems(): T[];

  getReactFlowGraphElements({
    nodeType,
    edgeType,
    elkOptions,
  }: {
    nodeType?: string;
    edgeType?: string;
    elkOptions?: any; // you might want to replace 'any' with correct types
  }): Promise<{ nodes: any[]; edges: any[] }>;
}

export default BinarySearchTree;
