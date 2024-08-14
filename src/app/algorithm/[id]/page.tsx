import Playground from "@/app/playground/page";
import NotFoundComp from "@/components/NotFoundComp";
import { getAlgorithmById } from "@/services/algorithmsApi";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const algo = await getAlgorithmById(params.id);

  return algo && algo.length > 0 ? (
    <Playground codeString={algo[0]?.code} />
  ) : (
    <NotFoundComp name="Algorithm" />
  );
}
