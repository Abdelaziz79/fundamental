import BinarySearchTree from "@/classes/BinarySearchTree/BinarySearchTree";
import { toast } from "@/components/ui/use-toast";
import { wait } from "@/utils/helpers";
import { Node } from "reactflow";
import { Item } from "../../types/Item";

export async function animate({
  NodesId,
  newNodes,
  setShowingItems,
  watingTime,
  setNodes,
  newNodeType,
}: {
  NodesId: string[];
  newNodes: Node[];
  setShowingItems?: React.Dispatch<React.SetStateAction<Item[]>>;
  watingTime: number;
  setNodes: (nodes: Node[]) => void;
  newNodeType: string;
}) {
  for (let i = 0; i < NodesId.length; i++) {
    newNodes = newNodes.map((node) => {
      if (node.id === NodesId[i]) {
        setShowingItems?.((items) => [
          ...items,
          { label: node.data["label"], id: node.id },
        ]);
        return { ...node, type: newNodeType };
      }
      return node;
    });
    setNodes(newNodes);
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
  setNodes,
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
  setNodes: (nodes: Node[]) => void;
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
        NodesId: newNodesId,
        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
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
        NodesId: newNodesId,

        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
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
        NodesId: newNodesId,

        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
      });
      if (res) {
        toast({
          title: "found",
          description: "Item found",
          variant: "default",
          className: "bg-green-200 border-green-500 border-2",
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
        NodesId: newNodesId,

        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
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
        NodesId: newNodesId,

        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
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
        NodesId: newNodesId,

        newNodes,
        setShowingItems,
        watingTime,
        setNodes,
        newNodeType: "red",
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
