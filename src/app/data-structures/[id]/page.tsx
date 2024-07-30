import Playground from "@/app/playground/page";
import { getAlgorithmById } from "@/services/algorithmsApi";
import { getDataStructureById } from "@/services/dataStructuresApi";
import { TbFidgetSpinner } from "react-icons/tb";

type Props = {
  params: { id: string };
};
export default async function DataStructure({ params }: Props) {
  const data = await getDataStructureById(params.id);

  return data ? (
    <Playground codeString={data[0]?.code} autoFrameCheckbox={false} />
  ) : (
    <TbFidgetSpinner />
  );
}
