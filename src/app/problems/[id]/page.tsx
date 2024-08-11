import Playground from "@/app/playground/page";
import MarkDownDrawer from "@/components/MarkDownDrawer";
import { getProblemById } from "@/services/problemsApi";
import Link from "next/link";

type Props = {
  params: { id: string };
};
export default async function Algorithm({ params }: Props) {
  const problem = await getProblemById(params.id);
  return problem && problem.length > 0 ? (
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
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Problem Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          We could not find the algorithm problem you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
