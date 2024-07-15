import Playground from "@/app/playground/page";
import { getAlgorithmById } from "@/services/algorithmsApi";
import { TbFidgetSpinner } from "react-icons/tb";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const algo = await getAlgorithmById(params.id);

  return algo ? (
    <Playground
      codeString={algo[0]?.code}
      autoFrameCheckbox={algo[0]?.autoFrame}
    />
  ) : (
    <TbFidgetSpinner />
  );
}
