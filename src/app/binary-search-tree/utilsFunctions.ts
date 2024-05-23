import { TreeNode } from "@/classes/BinarySearchTree";
import { Edge, Node } from "reactflow";

const calculateGap = (depth: number, TreeDepth: number) => {
  const numberOfNodesInCurrentLevel = 2 ** depth;
  const basGap = (TreeDepth - depth + 1) * 150;
  return basGap / numberOfNodesInCurrentLevel;
};

export const createGraphElements = (
  node: TreeNode<number> | null,
  x: number,
  y: number,
  depth: number,
  elements: { nodes: Node[]; edges: Edge[] },
  TreeDepth: number
) => {
  if (node === null) return;

  const nodeId = node.id;
  elements.nodes.push({
    id: nodeId,
    data: { label: node.value.toString() },
    position: { x, y },
    type: depth > 7 ? (depth >= 10 ? "small" : "mid") : "custom",
  });

  const gap = calculateGap(depth, TreeDepth);

  if (node.left) {
    const leftX = x - gap;
    const leftY = y + Math.max(230 - depth * 8, 70); // Adjust vertical gap if needed
    const leftNodeId = node.left.id;
    elements.edges.push({
      id: `e-${nodeId}-${leftNodeId}`,
      source: nodeId,
      target: leftNodeId,
      type: "default",
    });
    createGraphElements(
      node.left,
      leftX,
      leftY,
      depth + 1,
      elements,
      TreeDepth
    );
  }

  if (node.right) {
    const rightX = x + gap;
    const rightY = y + Math.max(230 - depth * 8, 70); // Adjust vertical gap if needed
    const rightNodeId = node.right.id;
    elements.edges.push({
      id: `e-${nodeId}-${rightNodeId}`,
      source: nodeId,
      target: rightNodeId,
      type: "default",
    });
    createGraphElements(
      node.right,
      rightX,
      rightY,
      depth + 1,
      elements,
      TreeDepth
    );
  }
};
