import ELK from "elkjs/lib/elk.bundled.js";
import pako from "pako";
import { Edge, Node } from "reactflow";

export function compressAndEncode(data: any): string {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(jsonString);
  return btoa(
    Array.from(compressed, (byte) => String.fromCharCode(byte)).join("")
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeAndDecompress(encoded: string): any {
  try {
    // Restore base64 padding
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = encoded.length % 4;
    if (pad) {
      encoded += "=".repeat(4 - pad);
    }

    const binary = atob(encoded);
    const compressed = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      compressed[i] = binary.charCodeAt(i);
    }
    const decompressed = pako.inflate(compressed, { to: "string" });
    return JSON.parse(decompressed);
  } catch (error) {
    console.error("Decompression error:", error);
    throw new Error("Failed to decode or decompress shared data");
  }
}

// Helper function to stringify any value
export function stringifyValue(value: any): string {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value);
    }
  }
  return String(value);
}

// Function to capture and format log messages
export function captureLog(
  type: string,
  originalConsole: any,
  capturedLogs: { type: string; message: string }[],
  args: any[]
): void {
  const formattedArgs = args.map(stringifyValue);
  const logMessage = formattedArgs.join(" ");
  capturedLogs.push({ type, message: logMessage });
  originalConsole[type](...args);
}

export const wait = async (seconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getLayoutElements = async (
  nodes: any,
  edges: any,
  options: any,
  isHorizontal: boolean = false
) => {
  const elk = new ELK();
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
  } catch (err: any) {
    throw new Error(err);
  }
};
type item = { title: string; id: string; topics?: string };

export function createNodesAndEdgesForMainPage({
  problems,
  algorithms,
  dataStructures,
  applications,
}: {
  problems: item[];
  algorithms: item[];
  dataStructures: item[];
  applications: item[];
}) {
  const nodes: Node[] = [
    {
      id: "root",
      connectable: false,
      data: {
        label: "Fun & Mental Challenges",
        description:
          "Explore mind-bending algorithms, innovative data structures, and challenging problems.",
        headerColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
        stats: {
          "Total Examples":
            algorithms.length + dataStructures.length + problems.length,
          Categories: 4,
          "Difficulty Range": "Easy to Expert",
        },
      },
      type: "customNode",
      position: { x: 0, y: 0 },
    },
    {
      id: "algorithms",
      connectable: false,
      data: {
        label: "Algorithms",
        description:
          "Visualize complex algorithms interactively. Discover and understand challenging problems through dynamic visualizations.",
        headerColor: "bg-gradient-to-r from-green-500 to-teal-500",
        difficulty: "Intermediate",
        difficultyColor: "bg-yellow-200 text-yellow-800",
        items: algorithms,
        href: "/algorithm",
        stats: {
          "Total Algorithms": algorithms.length,
          "Complexity Range": "O(1) to O(n!)",
          "Popular Types": 5,
        },
      },
      type: "customNode",
      position: { x: -600, y: 500 },
    },
    {
      id: "problems",
      connectable: false,
      data: {
        items: problems,
        label: "Coding Problems",
        description:
          "Visualize challenging problems interactively. Delve into complex scenarios with dynamic, illustrative representations.",
        headerColor: "bg-gradient-to-r from-red-500 to-pink-500",
        difficulty: "Various",
        difficultyColor: "bg-blue-200 text-blue-800",
        href: "/problems",
        stats: {
          "Total Problems": problems.length,
          Categories: 8,
          "New Problems": "+5 weekly",
        },
      },
      type: "customNode",
      position: { x: -200, y: 500 },
    },
    {
      id: "data-structures",
      connectable: false,
      data: {
        items: dataStructures,
        label: "Data Structures",
        description:
          "Visualize intricate data structures interactively. Explore and comprehend complex concepts through dynamic visual representations.",
        headerColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
        difficulty: "Fundamental",
        difficultyColor: "bg-green-200 text-green-800",
        href: "/data-structures",
        stats: {
          "Structure Types": dataStructures.length,
          "Implementation Lang.": "Typescript",
          "Practice Exercises": 0,
        },
      },
      type: "customNode",
      position: { x: 200, y: 500 },
    },
    {
      id: "web-applications",
      connectable: false,
      data: {
        items: applications,
        label: "Web Applications",
        description:
          "Explore and build interactive web applications. Learn about frontend frameworks, backend technologies, and full-stack development.",
        headerColor: "bg-gradient-to-r from-blue-500 to-purple-500",
        difficulty: "Intermediate",
        difficultyColor: "bg-blue-200 text-blue-800",
        href: "/web-applications",
        stats: {
          "Total Projects": applications.length,
          Technologies: "React",
          "Skill Level": "Beginner to Advanced",
        },
      },
      type: "customNode",
      position: { x: 600, y: 500 },
    },
  ];

  const edges: Edge[] = [
    {
      id: "root-algorithms",
      source: "root",
      target: "algorithms",
      type: "customEdge",
    },
    {
      id: "root-problems",
      source: "root",
      target: "problems",
      type: "customEdge",
    },
    {
      id: "root-data-structures",
      source: "root",
      target: "data-structures",
      type: "customEdge",
    },
    {
      id: "root-web-applications",
      source: "root",
      target: "web-applications",
      type: "customEdge",
    },
  ];

  return { nodes, edges };
}
