import Link from "next/link";
import Container from "./Container";
import { Badge } from "./ui/badge";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="bg-gray-100 p-2 shadow-lg">
      <Container>
        <div className="flex justify-between">
          <Link href="/">
            <Badge className="">
              <h1 className="text-lg font-sans font-bold ">Fun & Mental</h1>
            </Badge>
          </Link>
          <div>
            <Link
              href="/binary-search-tree"
              className="mr-2 text-gray-800 font-mono font-semibold text-sm hover:text-gray-900"
            >
              <Badge className="bg-gray-200 hover:bg-gray-300 text-black">
                BST
              </Badge>
            </Link>
            <Link
              href="/vector"
              className="mr-2 text-gray-800 font-mono font-semibold text-sm hover:text-gray-900"
            >
              <Badge className="bg-gray-200 hover:bg-gray-300 text-black">
                Vector
              </Badge>
            </Link>
            <Link
              href="/playground"
              className="mr-2 text-gray-800 font-mono font-semibold text-sm hover:text-gray-900"
            >
              <Badge className="">Playground</Badge>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
