import Playground from "@/app/playground/page";
import MarkDownDrawer from "@/components/MarkDownDrawer";
import { getProblemById } from "@/services/problemsApi";
import { TbFidgetSpinner } from "react-icons/tb";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const problem = await getProblemById(params.id);
  return problem ? (
    <>
      <Playground codeString={problem[0]?.code} autoFrameCheckbox={false} />
      <MarkDownDrawer
        problemDescription={problem[0]?.description}
        level={problem[0]?.level}
        title={problem[0]?.title}
        topics={problem[0]?.topics}
      />
    </>
  ) : (
    <TbFidgetSpinner />
  );
}
