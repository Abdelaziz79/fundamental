import Navbar from "@/components/Navbar";
import { getAllAlgorithms } from "@/services/algorithmsApi";
import { getAllApplications } from "@/services/applicationsApi";
import { getAllDataStructures } from "@/services/dataStructuresApi";
import { getAllProblems } from "@/services/problemsApi";
import { createNodesAndEdgesForMainPage } from "@/utils/helpers";
import MainRF from "./MainRF";

type Props = {};

export default async function App({}: Props) {
  const problems = await getAllProblems();
  const algorithms = await getAllAlgorithms();
  const dataStructures = await getAllDataStructures();
  const applications = await getAllApplications();
  let nodes: any[] = [];
  let edges: any[] = [];
  if (problems && algorithms && dataStructures) {
    const ele = createNodesAndEdgesForMainPage({
      problems,
      algorithms,
      dataStructures,
      applications,
    });
    nodes = ele?.nodes ?? [];
    edges = ele?.edges ?? [];
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {problems && algorithms && dataStructures && (
        <MainRF mainNodes={nodes} mainEdges={edges} className="flex-grow" />
      )}
    </div>
  );
}
