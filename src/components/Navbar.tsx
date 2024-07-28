import Link from "next/link";
import Container from "./Container";
import { Badge } from "./ui/badge";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 shadow-lg">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h1 className="text-xl font-bold text-white">Fun & Mental</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <NavLink href="/binary-search-tree">BST</NavLink>
            <NavLink href="/vector">Vector</NavLink>
            <NavLink href="/playground" special>
              Playground
            </NavLink>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function NavLink({
  href,
  children,
  special = false,
}: {
  href: string;
  children: React.ReactNode;
  special?: boolean;
}) {
  return (
    <Link href={href}>
      <Badge
        className={`
        px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out
        ${
          special
            ? "bg-white text-indigo-600 hover:bg-indigo-100"
            : "bg-indigo-500 text-white hover:bg-indigo-400"
        }
      `}
      >
        {children}
      </Badge>
    </Link>
  );
}
