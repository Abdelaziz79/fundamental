import BinarySearchTree, { TreeNode } from "@/classes/BinarySearchTree";
import { toast } from "@/components/ui/use-toast";
import { Edge, Node } from "reactflow";
import { Item } from "./Types";

const calculateGap = (depth: number, TreeDepth: number) => {
  const numberOfNodesInCurrentLevel = 2 ** depth;
  const basGap = (TreeDepth - depth + 1) * 100 + depth * 50;
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
    type: depth > 7 ? "mid" : "custom",
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

async function animate({
  newNodesId,
  newNodes,
  setShowingItems,
  watingTime,
  handleSetNodes,
  wait,
}: {
  setShowingItems: React.Dispatch<React.SetStateAction<Item[]>>;
  newNodesId: string[];
  newNodes: Node[];
  watingTime: number;
  handleSetNodes: (nodes: Node[]) => void;
  wait: (time: number) => Promise<void>;
}) {
  for (let i = 0; i < newNodesId.length; i++) {
    newNodes = newNodes.map((node) => {
      if (node.id === newNodesId[i]) {
        setShowingItems((items) => [
          ...items,
          { label: node.data["label"], id: node.id },
        ]);
        return { ...node, type: "red" };
      }
      return node;
    });
    handleSetNodes(newNodes);
    await wait(watingTime);
  }
}

export async function processNode({
  actionType,
  value,
  setRunning,
  setShowingItems,
  binarySearchTree,
  getNodes,
  updateGraphElements,
  setValue,
  watingTime,
  handleSetNodes,
  wait,
}: {
  actionType:
    | "insert"
    | "delete"
    | "search"
    | "inOrder"
    | "preOrder"
    | "postOrder";
  binarySearchTree: BinarySearchTree<number>;
  value?: number | null;
  setValue?: React.Dispatch<React.SetStateAction<number | null>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setShowingItems: React.Dispatch<React.SetStateAction<Item[]>>;
  watingTime: number;
  getNodes: () => Node[];
  updateGraphElements: () => void;
  handleSetNodes: (nodes: Node[]) => void;
  wait: (time: number) => Promise<void>;
}) {
  setRunning(true);
  setShowingItems([]);
  let newNodes: Node[] = getNodes();
  let newNodesId: string[] = [];

  switch (actionType) {
    case "insert": {
      if (value === null) return;
      binarySearchTree.insert(value || 0, (node) => {
        newNodesId.push(node.id);
      });

      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });

      toast({
        title: "inserted",
        description: "Item inserted",
        variant: "default",
        className: "bg-green-200 border-green-500 border-2 ",
      });

      break;
    }
    case "delete": {
      if (value === null) return;
      const res = binarySearchTree.search(value || 0);
      if (!res) {
        toast({
          title: "not found",
          description: "Item not found",
          variant: "destructive",
        });
        break;
      }

      binarySearchTree.delete(value || 0, (node) => {
        newNodesId.push(node.id);
      });

      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });

      toast({
        title: "deleted",
        description: "Item deleted",
        variant: "destructive",
      });

      break;
    }
    case "search": {
      if (value === null) return;
      const res = binarySearchTree.search(value || 0, (node) => {
        newNodesId.push(node.id);
      });
      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });
      if (res) {
        toast({
          title: "found",
          description: "Item found",
          variant: "default",
          className: "bg-green-200 border-green-500 border-2 ",
        });
      } else {
        toast({
          title: "not found",
          description: "Item not found",
          variant: "destructive",
        });
      }
      break;
    }
    case "inOrder": {
      binarySearchTree.inOrderTraverse((node) => {
        newNodesId.push(node.id);
      });

      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });
      toast({
        title: "done",
        description: "All items processed",
        variant: "default",
        className: "bg-green-200 border-green-500 border-2 ",
      });
      break;
    }
    case "preOrder": {
      binarySearchTree.preOrderTraverse((node) => {
        newNodesId.push(node.id);
      });

      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });
      toast({
        title: "done",
        description: "All items processed",
        variant: "default",
        className: "bg-green-200 border-green-500 border-2 ",
      });
      break;
    }
    case "postOrder": {
      binarySearchTree.postOrderTraverse((node) => {
        newNodesId.push(node.id);
      });
      await animate({
        newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        handleSetNodes,
        wait,
      });

      toast({
        title: "done",
        description: "All items processed",
        variant: "default",
        className: "bg-green-200 border-green-500 border-2 ",
      });

      break;
    }
    default:
      break;
  }
  updateGraphElements();
  setRunning(false);
  setValue?.(null);
}
