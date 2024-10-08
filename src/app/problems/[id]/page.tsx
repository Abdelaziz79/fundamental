import Playground from "@/app/playground/page";
import MarkDownDrawer from "@/components/MarkDownDrawer";
import NotFoundComp from "@/components/NotFoundComp";
import { getProblemById } from "@/services/problemsApi";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const problem = await getProblemById(params.id);
  return problem && problem.length > 0 ? (
    <>
      <Playground codeString={problem[0]?.code} />
      <MarkDownDrawer
        problemDescription={problem[0]?.description}
        level={problem[0]?.level}
        title={problem[0]?.title}
        topics={problem[0]?.topics}
      />
    </>
  ) : (
    <NotFoundComp name="Problem" />
  );
}
