import VectorRF from "@/classes/VectorRF";
import { Edge, Node } from "reactflow";

export function createVector({
  vec,
  elements,
}: {
  vec: VectorRF<number>;
  elements: { nodes: Node[]; edges: Edge[] };
}) {
  if (vec === null || vec === undefined || vec.size() === 0) return;
  for (let i = 0; i < vec.size(); i++) {
    elements.nodes.push({
      id: `node-${i}`,
      data: { label: vec.get(i)?.toString() },
      position: { x: i * 79, y: 0 },
      type: "VectorNode",
    });
  }
}
