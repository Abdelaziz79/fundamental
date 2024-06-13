import BinarySearchTree from "@/types/BinarySearchTree";
import BinarySearchTreeDeclaration from "@/types/BinarySearchTreeDeclaration";
import TreeNode from "@/types/TreeNode";
import TreeNodeDeclaration from "@/types/TreeNodeDeclaration";
import VectorRF from "@/types/VectorRF";
import VectorRFDeclaration from "@/types/VectorRFDeclaration";
import { Monaco } from "@monaco-editor/react";

class Util {
  static deepCopy<T>(instance: T): T {
    if (instance === null || typeof instance !== "object") {
      return instance;
    }

    if (Array.isArray(instance)) {
      return instance.map((item) => this.deepCopy(item)) as unknown as T;
    }

    const copy = Object.create(Object.getPrototypeOf(instance));
    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        (copy as any)[key] = this.deepCopy((instance as any)[key]);
      }
    }

    return copy;
  }
}
export function addLibs(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    TreeNodeDeclaration,
    "file:///node_modules/@types/TreeNode/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    BinarySearchTreeDeclaration,
    "file:///node_modules/@types/BinarySearchTree/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    VectorRFDeclaration,
    "file:///node_modules/@types/VectorRF/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare class Util {
      static deepCopy<T>(instance: T): T
    }`,
    "file:///node_modules/@types/Util/index.d.ts"
  );
}
export default function compile(code: string) {
  const executeCode = new Function(
    "TreeNode",
    "BinarySearchTree",
    "VectorRF",
    "Util",
    code + "\nreturn main();"
  );

  return executeCode(TreeNode, BinarySearchTree, VectorRF, Util);
}
