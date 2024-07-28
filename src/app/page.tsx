import Navbar from "@/components/Navbar";
import { getAllAlgorithms } from "@/services/algorithmsApi";
import { getAllProblems } from "@/services/problemsApi";
import MainRF from "./MainRF";

type Props = {};
type item = { title: string; id: string; topics?: string };
function createNodesAndEdges({
  problems,
  algorithms,
  dataStructures,
}: {
  problems: item[];
  algorithms: item[];
  dataStructures: item[];
}) {
  const nodes = [
    {
      id: "root",
      data: {
        label: "Fun & Mental Challenges",
        description: "Explore mind-bending puzzles and problems",
        headerColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
        stats: {
          "Total Challenges": "100+",
          Categories: 3,
          "Difficulty Range": "Easy to Expert",
        },
      },
      type: "customNode",
      position: { x: 0, y: 0 },
    },
    {
      id: "algorithms",
      data: {
        label: "Algorithms",
        description: "Master the art of efficient problem-solving",
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
      position: { x: -500, y: 500 },
    },
    {
      id: "problems",
      data: {
        items: problems,
        label: "Coding Problems",
        description: "Sharpen your skills with real-world challenges",
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
      position: { x: 0, y: 500 },
    },
    {
      id: "data-structures",
      data: {
        items: dataStructures,
        label: "Data Structures",
        description: "Build the foundation of efficient algorithms",
        headerColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
        difficulty: "Fundamental",
        difficultyColor: "bg-green-200 text-green-800",
        href: "/data-structures",
        stats: {
          "Structure Types": dataStructures.length,
          "Implementation Lang.": 3,
          "Practice Exercises": 100,
        },
      },
      type: "customNode",
      position: { x: 500, y: 500 },
    },
  ];

  const edges = [
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
  ];

  return { nodes, edges };
}

export default async function App({}: Props) {
  const problems = await getAllProblems();
  const algorithms = await getAllAlgorithms();
  let nodes: any[] = [];
  let edges: any[] = [];
  if (problems && algorithms) {
    const ele = await createNodesAndEdges({
      problems,
      algorithms,
      dataStructures: [],
    });
    nodes = ele?.nodes ?? [];
    edges = ele?.edges ?? [];
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {problems && algorithms && (
        <MainRF mainNodes={nodes} mainEdges={edges} className="flex-grow" />
      )}
    </div>
  );
}
