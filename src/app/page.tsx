import Container from "@/components/Container";
import IconLinkButton from "@/components/IconButton";
import Navbar from "@/components/Navbar";
import { getAllAlgorithms } from "@/services/algorithmsApi";
import { getAllProblems } from "@/services/problemsApi";
import { SiDatabricks } from "react-icons/si";
import { TbAtom2, TbBrain } from "react-icons/tb";

type Props = {};

export default async function App({}: Props) {
  const problems = await getAllProblems();
  const algorithms = await getAllAlgorithms();
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 text-center pt-2">
          Learn the fundamental
        </h1>
        <div className="flex flex-wrap mt-10  ">
          <div className=" w-[48%] p-2 m-2 rounded-sm shadow-md bg-gray-100 ">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">
                Data Structures
              </h3>
              <div className="flex gap-2 flex-wrap">
                <IconLinkButton href={"/vector"} variant={"link"}>
                  <SiDatabricks className="mr-2 h-5 w-5" /> Vector
                </IconLinkButton>
                <IconLinkButton href={"/binary-search-tree"} variant={"link"}>
                  <SiDatabricks className="mr-2 h-5 w-5" /> Binary Search Tree
                </IconLinkButton>
              </div>
            </Container>
          </div>
          <div className=" w-[48%] p-2 m-2 rounded-sm shadow-md bg-gray-100">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">
                Algorithms
              </h3>
              <div className="flex gap-2 flex-wrap">
                {algorithms &&
                  algorithms?.map((algo) => {
                    return (
                      <IconLinkButton
                        href={`/algorithm/${algo.id}`}
                        key={algo.id}
                        variant={"link"}
                      >
                        <TbAtom2 className="mr-2 h-5 w-5" /> {algo.title}
                      </IconLinkButton>
                    );
                  })}
              </div>
            </Container>
          </div>
          <div className=" w-[48%] p-2 m-2 rounded-sm shadow-md bg-gray-100">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">Problems</h3>
              <div className="flex gap-2 flex-wrap">
                {problems &&
                  problems?.map((problem) => {
                    return (
                      <IconLinkButton
                        href={`/problems/${problem.id}`}
                        key={problem.id}
                        variant={"link"}
                      >
                        <TbBrain className="mr-2 h-5 w-5" /> {problem.title}
                      </IconLinkButton>
                    );
                  })}
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}
