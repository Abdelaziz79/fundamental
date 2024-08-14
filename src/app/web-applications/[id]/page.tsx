import Playground from "@/app/playground/page";
import NotFoundComp from "@/components/NotFoundComp";
import { getApplicationById } from "@/services/applicationsApi";

type Props = {
  params: { id: string };
};

export default async function Application({ params }: Props) {
  const app = await getApplicationById(params.id);
  return app && app.length > 0 ? (
    <Playground codeFiles={app[0]?.code} />
  ) : (
    <NotFoundComp name="Application" />
  );
}
