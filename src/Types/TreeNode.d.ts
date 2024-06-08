declare class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  id: string;
  constructor(value: T);
}

export default TreeNode;
