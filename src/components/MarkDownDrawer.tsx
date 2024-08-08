import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LuBookOpen, LuX } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

// Utility function to convert image links in the description
function convertImageLinks(markdown: string): string {
  return markdown.replace(/!([\w:\/.\-]+)/g, "![]($1)");
}

type ProblemDrawerProps = {
  problemDescription: string;
  level?: string;
  title?: string;
  topics?: string;
};

export default function MarkDownDrawer({
  problemDescription,
  level,
  title,
  topics,
}: ProblemDrawerProps) {
  // Convert image links in the problem description
  const formattedDescription = convertImageLinks(problemDescription);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="absolute top-4 right-16">
          <span className="flex items-center gap-1">
            Description
            <LuBookOpen size={24} />
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 max-h-[70vh]">
        <DrawerHeader>
          {title && (
            <DrawerTitle className="text-2xl font-bold text-center mb-2 text-gray-800">
              {title}
            </DrawerTitle>
          )}
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <LuX size={24} />
            </Button>
          </DrawerClose>
          {level && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              Difficulty:{" "}
              <span
                className={`font-semibold text-${
                  level === "easy"
                    ? "green"
                    : level === "medium"
                    ? "yellow"
                    : "red"
                }-600`}
              >
                {level}
              </span>
            </p>
          )}
          {topics && (
            <p className="text-center text-sm text-muted-foreground mt-1">
              Topics:{" "}
              <span className="font-semibold text-gray-600">
                {topics.split(" - ").join(" • ")}
              </span>
            </p>
          )}
        </DrawerHeader>
        <DrawerDescription className="mt-4 text-gray-700">
          <ReactMarkdown className="mx-auto max-h-[50vh] w-full max-w-5xl p-4 overflow-y-auto  ">
            {formattedDescription}
          </ReactMarkdown>
        </DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
}
