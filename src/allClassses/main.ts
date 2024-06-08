import { ReactFlowGraph } from "@/Types/ReactFlowGraph";
import { ElkLayoutOptions, defaultElkLayoutOptionsBST } from "@/Types/elkTypes";
import { getLayoutElements } from "@/utils/helpers";
import { Monaco } from "@monaco-editor/react";
import { Edge, Node } from "reactflow";

export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  id: string;
  constructor(value: T) {
    this.value = value;
    this.id = crypto.randomUUID();
  }
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  private insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>,
    callback?: (node: TreeNode<T>) => void
  ): void {
    callback?.(node);
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, callback);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, callback);
      }
    }
  }

  private preOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void {
    if (node !== null) {
      callback(node);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  private inOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  private postOrderTraverseNode(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T>) => void
  ): void {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node);
    }
  }

  private searchNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): boolean {
    if (node === null) return false;
    callback?.(node);
    if (node.value > value) {
      return this.searchNode(node.left, value, callback);
    } else if (node.value < value) {
      return this.searchNode(node.right, value, callback);
    } else return true;
  }

  private getDepthNode(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return (
      Math.max(this.getDepthNode(node.left), this.getDepthNode(node.right)) + 1
    );
  }

  private deleteNode(
    node: TreeNode<T> | null,
    value: T,
    callback?: (node: TreeNode<T>) => void
  ): TreeNode<T> | null {
    if (node === null) return null;
    callback?.(node);
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value, callback);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value, callback);
      return node;
    } else {
      // Node with only one child or no child
      if (node.left === null) {
        const temp = node.right;

        return temp;
      } else if (node.right === null) {
        const temp = node.left;

        return temp;
      }

      // Node with two children: Get the in order successor (smallest in the right subtree)
      const temp = this.findMinNode(node.right);
      node.value = temp.value;
      node.right = this.deleteNode(node.right, temp.value, callback);
      return node;
    }
  }

  private findMinNode(node: TreeNode<T> | null): TreeNode<T> {
    while (node!.left !== null) {
      node = node!.left;
    }
    return node!;
  }

  private createGraphElements = (
    node: TreeNode<T> | null,
    elements: { nodes: Node[]; edges: Edge[] },
    nodeType: string,
    edgeType: string,
    rootId: string
  ) => {
    if (node === null) return;

    const nodeId = node.id;
    elements.nodes.push({
      id: nodeId,
      data: { label: node.value },
      position: { x: 0, y: 0 },
      type: nodeType,
      parentId: rootId,
      extent: "parent",
      expandParent: true,
    });

    if (node.left) {
      const leftNodeId = node.left.id;
      elements.edges.push({
        id: `e-${nodeId}-${leftNodeId}`,
        source: nodeId,
        target: leftNodeId,
        type: edgeType,
      });
      this.createGraphElements(node.left, elements, nodeType, edgeType, rootId);
    }

    if (node.right) {
      const rightNodeId = node.right.id;
      elements.edges.push({
        id: `e-${nodeId}-${rightNodeId}`,
        source: nodeId,
        target: rightNodeId,
        type: edgeType,
      });
      this.createGraphElements(
        node.right,
        elements,
        nodeType,
        edgeType,
        rootId
      );
    }
  };

  private async getBSTPositionedElements({
    elements,
    elkOptions,
  }: {
    elements: { nodes: any[]; edges: any[] };
    elkOptions: ElkLayoutOptions;
  }): Promise<{ nodes: any[]; edges: any[] }> {
    const ns = elements.nodes;
    const es = elements.edges;

    const res = await getLayoutElements(ns, es, elkOptions);
    const nodes = (res as any).nodes.map((node: any) => {
      if (node.type === "group") {
        return {
          ...node,
          position: {
            x: 0,
            y: 0,
          },
        };
      } else {
        return node;
      }
    });
    return {
      nodes: nodes,
      edges: (res as any).edges,
    };
  }

  insert(value: T, callback?: (node: TreeNode<T>) => void) {
    const newNode = new TreeNode<T>(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode, callback);
    }
  }

  delete(value: T, callback?: (node: TreeNode<T>) => void): void {
    this.root = this.deleteNode(this.root, value, callback);
  }

  search(value: T, callback?: (node: TreeNode<T>) => void): boolean {
    return this.searchNode(this.root, value, callback);
  }

  inOrderTraverse(callback: (node: TreeNode<T>) => void): void {
    this.inOrderTraverseNode(this.root, callback);
  }

  preOrderTraverse(callback: (node: TreeNode<T>) => void): void {
    this.preOrderTraverseNode(this.root, callback);
  }

  postOrderTraverse(callback: (node: TreeNode<T>) => void): void {
    this.postOrderTraverseNode(this.root, callback);
  }

  getRoot(): TreeNode<T> | null {
    return this.root;
  }

  getDepth(): number {
    return this.getDepthNode(this.root);
  }

  getMaxItem(): T | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.value;
  }

  getMinItem(): T | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  getItems(): T[] {
    const items: T[] = [];
    this.inOrderTraverse((node) => items.push(node.value));
    return items;
  }

  async getReactFlowGraphElements({
    nodeType = "custom",
    edgeType = "step",
    elkOptions = defaultElkLayoutOptionsBST,
  }: {
    nodeType?: string;
    edgeType?: string;
    elkOptions?: ElkLayoutOptions;
  } = {}): Promise<{ nodes: any[]; edges: any[] }> {
    const elements: ReactFlowGraph = {
      nodes: [],
      edges: [],
    };
    const rootId = "parent-" + this.root?.id;
    elements.nodes.push({
      id: rootId,
      position: { x: 10, y: 10 },
      data: { label: null },
      type: "group",
      style: {
        backgroundColor: "rgba(0,0,0,0)",
        border: "0px",
        margin: "20px",
      },
    });
    this.createGraphElements(this.root, elements, nodeType, edgeType, rootId);
    return this.getBSTPositionedElements({ elements, elkOptions });
  }
}

export class VectorRF<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Add an item to the vector
  push_back(item: T): void {
    this.items.push(item);
  }

  pop_back(): T | undefined {
    if (this.items.length > 0) {
      return this.items.pop();
    }
    return undefined;
  }

  // Get an item at a specific index
  get(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }

  // Get the size of the vector
  size(): number {
    return this.items.length;
  }

  // Check if the vector is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Clear all items in the vector
  clear(): void {
    this.items = [];
  }

  // Convert vector to an array
  toArray(): T[] {
    return this.items.slice();
  }
}

export function addLibs(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    id: string;
    constructor(value: T);
  }
  `,
    "file:///node_modules/@types/TreeNode/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare class BinarySearchTree<T> {
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
      elkOptions?: any; 
    }): Promise<{ nodes: any[]; edges: any[] }>;
  }`,
    "file:///node_modules/@types/BinarySearchTree/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare class VectorRF<T> {
    private items: T[];
    constructor();
    push_back(item: T): void;
    pop_back(): T | undefined;
    get(index: number): T | undefined;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    toArray(): T[];
}  }`,
    "file:///node_modules/@types/VectorRF/index.d.ts"
  );
}
export default function compile(code: string) {
  return eval(code);
}
