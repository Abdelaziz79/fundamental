import ELK from "elkjs/lib/elk.bundled.js";

export const wait = async (seconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const elk = new ELK();

export const getLayoutElements = async (
  nodes: any,
  edges: any,
  options: any
) => {
  // const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const isHorizontal = false;
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node: any) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };
  try {
    const layoutGraph = await elk.layout(graph);
    return {
      nodes: layoutGraph.children?.map((node_1) => ({
        ...node_1,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node_1.x, y: node_1.y },
      })),

      edges: layoutGraph.edges,
    };
  } catch (message) {
    return console.error(message);
  }
};
