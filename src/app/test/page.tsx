"use client";

// import { Button } from "@/components/ui/button";
// import ELK from "elkjs/lib/elk.bundled.js";
// import { useCallback, useLayoutEffect } from "react";
// import ReactFlow, {
//   Panel,
//   ReactFlowProvider,
//   addEdge,
//   useEdgesState,
//   useNodesState,
//   useReactFlow,
// } from "reactflow";
// import { initialEdges, initialNodes } from "./nodes-edges";

// import { getLayoutElements } from "@/utils/helpers";
// import "reactflow/dist/style.css";

// const elk = new ELK();

// // Elk has a *huge* amount of options to configure. To see everything you can
// // tweak check out:
// //
// // - https://www.eclipse.org/elk/reference/algorithms.html
// // - https://www.eclipse.org/elk/reference/options.html
// const elkOptions = {
//   "elk.algorithm": "layered",
//   "elk.layered.spacing.nodeNodeBetweenLayers": "100",
//   "elk.spacing.nodeNode": "80",
// };

// function LayoutFlow() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { fitView } = useReactFlow();

//   const onConnect = useCallback(
//     (params: any) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const onLayout = useCallback(
//     ({
//       direction,
//       useInitialNodes = false,
//     }: {
//       direction: string;
//       useInitialNodes?: boolean;
//     }) => {
//       const opts = { "elk.direction": direction, ...elkOptions };
//       const ns = useInitialNodes ? initialNodes : initialNodes;
//       const es = useInitialNodes ? initialEdges : initialEdges;

//       getLayoutElements(ns, es, opts).then((res) => {
//         setNodes((res as any).nodes);
//         setEdges((res as any).edges);

//         window.requestAnimationFrame(() => fitView());
//       });
//     },
//     [fitView, setNodes, setEdges]
//   );

//   // Calculate the initial layout on mount.
//   useLayoutEffect(() => {
//     onLayout({ direction: "DOWN", useInitialNodes: true });
//   }, [onLayout]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onConnect={onConnect}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       fitView
//     >
//       <Panel position="top-right" className="flex gap-2">
//         <Button onClick={() => onLayout({ direction: "DOWN" })}>
//           vertical layout
//         </Button>

//         <Button onClick={() => onLayout({ direction: "RIGHT" })}>
//           horizontal layout
//         </Button>
//       </Panel>
//     </ReactFlow>
//   );
// }

// export default function TestPage() {
//   return (
//     <ReactFlowProvider>
//       <LayoutFlow />
//     </ReactFlowProvider>
//   );
// }

import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
// Or any other UI library you're using

const Playground = () => {
  const [runCode, setRunCode] = useState("");
  const [code, setCode] = useState(`import React from "react";
import VectorRF from "./VectorRF"; // Adjust the import path as needed

const Playground = () => {
  // Write your code here
  const vector = new VectorRF<number>();
  vector.push_back(10);
  vector.push_back(20);
  console.log(vector.size()); // Should log 2

  return <div>Check the console for output</div>;
}

export default Playground;
  `);

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <LiveProvider code={runCode} noInline={true}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Editor
          width="100%"
          height="50%"
          language="typescript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={(newValue) => setCode(newValue || "")}
        />
        <Button onClick={() => setRunCode(code)}>Run</Button>
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderTop: "1px solid #ddd",
          }}
        >
          <LiveError />
          <LivePreview />
        </div>
      </div>
    </LiveProvider>
  );
};

export default Playground;
