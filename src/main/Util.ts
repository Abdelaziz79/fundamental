import { BSTNodeType } from "@/classes/BinarySearchTree/BSTNodeType";
import { HashMapNodeType } from "@/classes/HashMap/HashMapNodeType";
import { VectorNodeType } from "@/classes/VectorRF/VecNodeType";

import { toast } from "@/components/ui/use-toast";

export default class Util {
  private static nodeTypes = {};
  private static edgeTypes = {};
  constructor() {}

  static addNodeType(name: string, func: any) {
    this.nodeTypes = {
      ...this.nodeTypes,
      [name]: func,
    };
  }

  static getAllNodeTypes() {
    return {
      ...BSTNodeType,
      ...HashMapNodeType,
      ...VectorNodeType,
      ...this.nodeTypes,
    };
  }

  static addEdgeType(name: string, func: any) {
    this.edgeTypes = {
      ...this.edgeTypes,
      [name]: func,
    };
  }

  static getAllEdgeTypes() {
    return {
      ...this.edgeTypes,
    };
  }

  static createToast({
    title,
    description = null,
    variant = "default",
    className = "",
  }: {
    title: string;
    description?: string | null;
    variant?: "default" | "destructive";
    className?: string;
  }) {
    return class Toast {
      static call() {
        return toast({
          title,
          description,
          variant,
          className,
        });
      }
    };
  }

  static deepCopy(obj: any) {
    return obj.clone(obj);
  }

  static autoCopy(code: string, types: string[]) {
    const objectNames: string[] = [];
    const copiesNames: string[] = [];
    const utilNames: string[] = [];
    const typePattern = types.join("|");

    // RegExp for matching 'new Type<...>(...)'
    const objectRegex = new RegExp(`new (${typePattern})<.*?>\\([^)]*\\)`, "g");
    // RegExp for matching 'const name = Util.createToast(...)'
    const toastRegex = new RegExp(
      `const (\\w+) = Util\\.createToast\\([^)]*\\)`,
      "g"
    );

    let match;

    // Find all object instantiations and track their names
    while ((match = objectRegex.exec(code)) !== null) {
      const fullMatch = match[0];
      const nameRegex = new RegExp(
        `const (\\w+) =\\s*${fullMatch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
      );
      const nameMatch = code.match(nameRegex);
      if (nameMatch) {
        const name = nameMatch[1];
        objectNames.push(name);
      }
    }

    // Find all Util.createToast instances and track their names
    while ((match = toastRegex.exec(code)) !== null) {
      const name = match[1];
      objectNames.push(name);
      utilNames.push(name);
    }

    // Function to generate clone and frame push code
    const generateCloneAndPushCode = (
      name: string,
      firstTime: boolean,
      copiesNames: string[]
    ) => {
      const cloneCode = `${firstTime ? "" : "let"} new${capitalize(
        name
      )} = Util.deepCopy(${name});`;
      copiesNames = copiesNames.filter((copy) => copy !== name);
      const filteredNames: string[] = copiesNames.filter(
        (name) => !utilNames.includes(name)
      );
      if (utilNames.includes(name)) {
        const cloneCopies = filteredNames.map((copy) => {
          return `new${capitalize(copy)} = Util.deepCopy(${copy});\n`;
        });
        let pushCode = `frame.push([${filteredNames.map(
          (copy) => `new${capitalize(copy)}`
        )}`;

        pushCode += `${copiesNames.length > 0 ? "," : ""} ${name}]);\n`;
        return `${cloneCopies.join("")} ${pushCode}`;
      }

      const cloneCopies = filteredNames.map((copy) => {
        return `new${capitalize(copy)} = Util.deepCopy(${copy});\n`;
      });

      let pushCode = `frame.push([${filteredNames.map(
        (copy) => `new${capitalize(copy)}`
      )}`;

      pushCode += `${filteredNames.length > 0 ? "," : ""}new${capitalize(
        name
      )}]);\n`;

      return `${cloneCode}\n ${cloneCopies.join("")} ${pushCode}`;
    };

    // Helper function to capitalize first letter of a string
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    // Split the code into lines
    let codeLines = code.split("\n");
    let modifiedCode: string = "";
    codeLines.forEach((line) => {
      modifiedCode += line + "\n";
      objectNames.forEach((name) => {
        if (line.includes(name)) {
          let cloneObject;
          if (copiesNames.includes(name)) {
            cloneObject = generateCloneAndPushCode(name, true, copiesNames);
          } else {
            cloneObject = generateCloneAndPushCode(name, false, copiesNames);
            copiesNames.push(name);
          }

          modifiedCode += cloneObject + "\n";
        }
      });
    });

    return modifiedCode;
  }
}
