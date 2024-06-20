import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import algorithms from "@/db/algorithms";
import Link from "next/link";

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
              <div className="flex gap">
                <Link href={"/vector"}>
                  <Badge className="bg-gray-200 text-gray-800 m-2 text-md p-2 hover:bg-gray-300 font-semibold">
                    Vector
                  </Badge>
                </Link>
                <Link href={"/binary-search-tree"}>
                  <Badge className="bg-gray-200 text-gray-800 m-2 text-md p-2 hover:bg-gray-300 font-semibold">
                    Binary Search Tree
                  </Badge>
                </Link>
              </div>
            </Container>
          </div>
          <div className="p-2 w-1/2 rounded-sm shadow-md bg-gray-100">
            <Container>
              <h3 className="text-xl text-center font-bold my-2 ">
                Algorithms
              </h3>
              <div className="flex gap">
                {algorithms.map((algo) => {
                  return (
                    <Link href={`/algorithm/${algo.id}`} key={algo.id}>
                      <Badge className="bg-gray-200 text-gray-800 m-2 text-md p-2 hover:bg-gray-300 font-semibold">
                        {algo.title}
                      </Badge>
                    </Link>
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
