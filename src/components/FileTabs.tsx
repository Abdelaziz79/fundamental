import { Button } from "./ui/button";

export default function FileTabs({
  files,
  currentFile,
  setCurrentFile,
  addNewFile,
}: {
  files: { name: string; content: string }[];
  currentFile: string;
  setCurrentFile: (file: string) => void;
  addNewFile: () => void;
}) {
  return (
    <div className="w-full flex items-center h-5 bg-zinc-800">
      {files.map((file) => (
        <Button
          key={file.name}
          className={` hover:bg-zinc-600 h-5 rounded-none ${
            currentFile === file.name ? "bg-blue-500 text-white" : "bg-zinc-700"
          }`}
          onClick={() => setCurrentFile(file.name)}
        >
          {file.name}
        </Button>
      ))}
      <Button
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
        onClick={addNewFile}
      >
        + New File
      </Button>
    </div>
  );
}
