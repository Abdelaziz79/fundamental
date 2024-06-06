import { ElkLayoutOptions } from "@/Types/elkTypes";
import { getLayoutElements } from "@/utils/helpers";
import BinarySearchTree from "./BinarySearchTree";

export async function getBSTElements({
  BinarySearchTree,
  nodeType,
  edgeType,
  elkOptions,
}: {
  BinarySearchTree: BinarySearchTree<any>;
  nodeType:
    | "custom"
    | "red"
    | "mid"
    | "small"
    | "input"
    | "default"
    | "output"
    | "group";
  edgeType: "default" | "straight" | "step" | "smoothstep" | "bezier";
  elkOptions: ElkLayoutOptions;
}): Promise<{ nodes: any[]; edges: any[] }> {
  const ele = BinarySearchTree.getReactFlowGraphElements({
    nodeType: nodeType,
    edgeType: edgeType,
  });

  const ns = ele.nodes;
  const es = ele.edges;

  const res = await getLayoutElements(ns, es, elkOptions);
  return {
    nodes: (res as any).nodes,
    edges: (res as any).edges,
  };
}
