const BinarySearchTreeDeclaration = `
declare class BinarySearchTree<T> {
  private root: TreeNode<T> | null;
  private options: BSTOptions;
  private pointer: TreeNode<T> | null = null;

    private options: {
      nodeType: string;
      edgeType: string;
      elkOptions: ElkLayoutOptions;
      posX?: number;
      posY?: number;
      parentNode?: boolean;
    };

    constructor(options?: {
      nodeType: string;
      edgeType: string;
      elkOptions: ElkLayoutOptions;
      posX?: number;
      posY?: number;
      parentNode?: boolean;
    });
    
    setPointer(value: T): void;

    setPointerById(id: string): void

    getNodeById(id: string): TreeNode<T> | null;

    setOptions(options: {
      nodeType: string;
      edgeType: string;
      elkOptions: ElkLayoutOptions;
      posX?: number;
      posY?: number;
      parentNode?: boolean;
    }): void;

    getOptions(): {
      nodeType: string;
      edgeType: string;
      elkOptions: ElkLayoutOptions;
      posX?: number;
      posY?: number;
      parentNode?: boolean;
    };

    setPosition(posX: number, posY: number): void;

    getPosition(): { posX: number | undefined; posY: number | undefined };

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
      elements: { nodes: Node[]; edges: Edge[] },
      nodeType: string,
      edgeType: string,
      rootId?: string
    ): void;

    private getBSTPositionedElements({
      elements,
      elkOptions,
      posX,
      posY,
    }: {
      elements: { nodes: any[]; edges: any[] };
      elkOptions: ElkLayoutOptions;
      posX: number | undefined;
      posY: number | undefined;
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

    getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }>;\

    clone<T>(instance: T): T ;
}
  `;

export default BinarySearchTreeDeclaration;
