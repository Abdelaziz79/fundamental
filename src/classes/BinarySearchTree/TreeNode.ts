export default class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  id: string;
  constructor(value: T) {
    this.value = value;
    this.id = crypto.randomUUID();
  }
}
