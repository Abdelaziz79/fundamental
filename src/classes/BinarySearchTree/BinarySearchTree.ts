import IReactFlow from "@/interfaces/IReactFlow";
import { getLayoutElements } from "@/utils/helpers";
import { Edge, Node } from "reactflow";
import { ReactFlowGraph } from "../../types/ReactFlowGraph";
import {
  ElkLayoutOptions,
  defaultElkLayoutOptionsBST,
} from "../../types/elkTypes";
import TreeNode from "./TreeNode";

type BSTOptions = {
  nodeType: string;
  edgeType: string;
  elkOptions: ElkLayoutOptions;
  posX?: number;
  posY?: number;
  parentNode?: boolean;
};

export default class BinarySearchTree<T> implements IReactFlow {
  private root: TreeNode<T> | null = null;

  private options: BSTOptions;

  constructor(
    options: BSTOptions = {
      nodeType: "custom",
      edgeType: "default",
      elkOptions: defaultElkLayoutOptionsBST,
      posX: 0,
      posY: 0,
      parentNode: true,
    }
  ) {
    this.options = options;
  }

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
    rootId?: string
  ) => {
    if (node === null) return;

    const nodeId = node.id;
    elements.nodes.push({
      id: nodeId,
      data: { label: node.value },
      position: { x: 0, y: 0 },
      type: nodeType,
      parentId: rootId ? rootId : undefined,
      extent: rootId ? "parent" : undefined,
      expandParent: rootId ? true : undefined,
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
    posX,
    posY,
  }: {
    elements: { nodes: any[]; edges: any[] };
    elkOptions: ElkLayoutOptions;
    posX: number | undefined;
    posY: number | undefined;
  }): Promise<{ nodes: any[]; edges: any[] }> {
    const ns = elements.nodes;
    const es = elements.edges;

    const res = await getLayoutElements(ns, es, elkOptions);
    const nodes = (res as any).nodes.map((node: any) => {
      if (node.type === "group") {
        return {
          ...node,
          position: {
            x: posX ?? 0,
            y: posY ?? 0,
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

  setOptions(options: BSTOptions): void {
    this.options = options;
  }

  getOptions(): {} {
    return this.options;
  }

  setPosition(posX: number, posY: number) {
    this.options.posX = posX;
    this.options.posY = posY;
  }

  getPosition() {
    return {
      posX: this.options.posX,
      posY: this.options.posY,
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

  async getReactFlowElements(): Promise<{ nodes: any[]; edges: any[] }> {
    const { edgeType, nodeType, elkOptions, posX, posY, parentNode } =
      this.options;
    const elements: ReactFlowGraph = {
      nodes: [],
      edges: [],
    };
    if (parentNode) {
      const rootId = "parent-" + this.root?.id;
      elements.nodes.push({
        id: rootId,
        position: { x: posX ?? 0, y: posY ?? 0 },
        data: { label: null },
        type: "group",
        style: {
          backgroundColor: "rgba(0,0,0,0)",
          border: "0px",
          margin: "20px",
        },
      });
      this.createGraphElements(this.root, elements, nodeType, edgeType, rootId);
    } else this.createGraphElements(this.root, elements, nodeType, edgeType);
    return await this.getBSTPositionedElements({
      elements,
      elkOptions,
      posX,
      posY,
    });
  }
}
