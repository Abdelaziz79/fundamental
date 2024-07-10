import Container from "@/components/Container";
import IconLinkButton from "@/components/IconButton";
import Navbar from "@/components/Navbar";
import algorithms from "@/db/algorithms";
import { SiDatabricks } from "react-icons/si";
import { TbAtom2 } from "react-icons/tb";

type Props = {};

export default function App({}: Props) {
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 text-center pt-2">
          Learn the fundamental
        </h1>
        <div className="flex mt-10 gap-2">
          <div className="p-2 w-1/2 rounded-sm shadow-md bg-gray-100">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">
                Data Structures
              </h3>
              <div className="flex gap-2 flex-wrap">
                <IconLinkButton href={"/vector"}>
                  <SiDatabricks className="mr-2 h-5 w-5" /> Vector
                </IconLinkButton>
                <IconLinkButton href={"/binary-search-tree"}>
                  <SiDatabricks className="mr-2 h-5 w-5" /> Binary Search Tree
                </IconLinkButton>
              </div>
            </Container>
          </div>
          <div className="p-2 w-1/2 rounded-sm shadow-md bg-gray-100">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">
                Algorithms
              </h3>
              <div className="flex gap-2 flex-wrap">
                {algorithms.map((algo) => {
                  return (
                    <IconLinkButton
                      href={`/algorithm/${algo.id}`}
                      key={algo.id}
                    >
                      <TbAtom2 className="mr-2 h-5 w-5" /> {algo.title}
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
