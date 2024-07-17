import { VscDebugStart, VscListFlat } from "react-icons/vsc";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function EditorButtons({
  handleRun,
  handleFormat,
  running,
  autoFrame,
  setAutoFrame,
  theme,
  setTheme,
}: {
  handleRun: () => void;
  handleFormat: () => void;
  running: boolean;
  autoFrame: boolean;
  setAutoFrame: (value: boolean) => void;
  theme: string;
  setTheme: (value: string) => void;
}) {
  return (
    <div className="w-full flex items-center h-5 bg-zinc-800">
      <Button
        onClick={handleRun}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
        disabled={running}
      >
        <span className="flex items-center gap-1">
          <VscDebugStart size={18} />
          Run
        </span>
      </Button>
      <Button
        onClick={handleFormat}
        className="bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none"
      >
        <span className="flex items-center gap-1">
          <VscListFlat size={18} />
          format
        </span>
      </Button>
      <div>
        <div className="flex  bg-zinc-700 hover:bg-zinc-600 h-5 rounded-none text-white gap-1 items-center ">
          <Checkbox
            id="autoFrame"
            checked={autoFrame}
            onCheckedChange={() => setAutoFrame(!autoFrame)}
          />
          <Label htmlFor="autoFrame">Auto Frame</Label>
        </div>
      </div>
      <div className="flex ">
        <div className="bg-zinc-700 hover:bg-zinc-600 rounded-none text-white">
          <Select onValueChange={setTheme} value={theme}>
            <SelectTrigger className="w-[150px]  border-none">
              <SelectValue placeholder="theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Theme</SelectLabel>
                {themes.map((themeName) => (
                  <SelectItem key={themeName} value={themeName}>
                    {themeName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
const themes = [
  "andromeeda",
  "catppuccin-frappe",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dark-plus",
  "dracula",
  "github-dark",
  "one-dark-pro",
  "poimandres",
  "tokyo-night",
  "rose-pine",
  "rose-pine-dawn",
  "rose-pine-moon",
];
