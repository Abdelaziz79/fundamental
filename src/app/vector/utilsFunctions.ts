import VectorRF from "@/classes/VectorRF";
import { Edge, Node } from "reactflow";

export function createVector({
  vec,
  elements,
  posX,
  posY,
}: {
  vec: VectorRF<string>;
  elements: { nodes: Node[]; edges: Edge[] };
  posX: number;
  posY: number;
}) {
  if (vec === null || vec === undefined || vec.size() === 0) return;
  elements.nodes.push({
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: posX, y: posY },
    style: {
      border: "1px solid rgb(22,163,74)",
      padding: "2rem",
      width: vec.size() * 80,
      backgroundColor: "white",
      boxShadow: "2px 2px 5px #888888",
    },
  });
  for (let i = 0; i < vec.size(); i++) {
    elements.nodes.push({
      id: `node-${i}`,
      data: { label: vec.get(i)?.toString() },
      position: { x: i * 80, y: 0 },
      type: "VectorNode",
      parentId: "A",
      expandParent: true,
      extent: "parent",
      draggable: false,
    });
    elements.nodes.push({
      id: `index-${i}`,
      data: { label: i.toString() },
      position: { x: i * 80 + 20, y: 30 },
      type: "IndexNode",
      parentId: "A",
      extent: "parent",
      draggable: false,
      connectable: false,
    });
  }
}
