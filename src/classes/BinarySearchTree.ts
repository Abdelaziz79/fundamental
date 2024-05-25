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

  insert(value: T, callback?: (node: TreeNode<T>) => void) {
    const newNode = new TreeNode<T>(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode, callback);
    }
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
}
