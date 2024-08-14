import Playground from "@/app/playground/page";
import NotFoundComp from "@/components/NotFoundComp";
import { getDataStructureById } from "@/services/dataStructuresApi";

type Props = {
  params: { id: string };
};
export default async function DataStructure({ params }: Props) {
  const data = await getDataStructureById(params.id);

  return data && data.length > 0 ? (
    <Playground codeString={data[0]?.code} />
  ) : (
    <NotFoundComp name="Data Structure" />
  );
}
