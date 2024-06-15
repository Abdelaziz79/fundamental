import BinarySearchTree from "@/classes/BinarySearchTree/BinarySearchTree";
import BinarySearchTreeDeclaration from "@/classes/BinarySearchTree/BinarySearchTreeDeclaration";
import TreeNode from "@/classes/BinarySearchTree/TreeNode";
import TreeNodeDeclaration from "@/classes/BinarySearchTree/TreeNodeDeclaration";
import HashMap from "@/classes/HashMap/HashMap";
import HashMapDeclaration from "@/classes/HashMap/HashMapDeclaration";
import VectorNodeType from "@/classes/VectorRF/VectorNodeType";
import VectorNodeTypeDeclaration from "@/classes/VectorRF/VectorNodeTypeDeclarations";
import VectorRF from "@/classes/VectorRF/VectorRF";
import VectorRFDeclaration from "@/classes/VectorRF/VectorRFDeclaration";
import { toast } from "@/components/ui/use-toast";
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
    VectorNodeTypeDeclaration,
    "file:///node_modules/@types/VectorNodeType/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    VectorRFDeclaration,
    "file:///node_modules/@types/VectorRF/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    HashMapDeclaration,
    "file:///node_modules/@types/HashMap/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare class Util {
      static deepCopy<T>(instance: T): T

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
  }): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
} 
    }`,
    "file:///node_modules/@types/Util/index.d.ts"
  );
}

export default function compile(code: string) {
  const executeCode = new Function(
    "TreeNode",
    "BinarySearchTree",
    "VectorNodeType",
    "VectorRF",
    "HashMap",
    "Util",
    code + "\nreturn main();"
  );

  return executeCode(
    TreeNode,
    BinarySearchTree,
    VectorNodeType,
    VectorRF,
    HashMap,
    Util
  );
}
