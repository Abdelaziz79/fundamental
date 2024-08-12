import ELK from "elkjs/lib/elk.bundled.js";
import pako from "pako";

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
