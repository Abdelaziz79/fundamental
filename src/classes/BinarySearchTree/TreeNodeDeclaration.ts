const TreeNodeDeclaration = ` declare class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  id: string;
  highlighted: boolean;
  constructor(value: T);
}
`;
export default TreeNodeDeclaration;
