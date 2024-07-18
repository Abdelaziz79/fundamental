import Playground from "@/app/playground/page";
import { getProblemById } from "@/services/problemsApi";
import { TbFidgetSpinner } from "react-icons/tb";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const problem = await getProblemById(params.id);

  return problem ? (
    <Playground codeString={problem[0]?.code} autoFrameCheckbox={false} />
  ) : (
    <TbFidgetSpinner />
  );
}
