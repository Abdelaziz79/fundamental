import BinarySearchTree from "@/classes/BinarySearchTree/BinarySearchTree";
import BinarySearchTreeDeclaration from "@/classes/BinarySearchTree/BinarySearchTreeDeclaration";
import TreeNode from "@/classes/BinarySearchTree/TreeNode";
import TreeNodeDeclaration from "@/classes/BinarySearchTree/TreeNodeDeclaration";
import HashMap from "@/classes/HashMap/HashMap";
import HashMapDeclaration from "@/classes/HashMap/HashMapDeclaration";
import Table from "@/classes/Table/Table";
import TableDeclaration from "@/classes/Table/TableDeclaration";
import VectorNodeType from "@/classes/VectorRF/VectorNodeType";
import VectorNodeTypeDeclaration from "@/classes/VectorRF/VectorNodeTypeDeclarations";
import VectorRF from "@/classes/VectorRF/VectorRF";
import VectorRFDeclaration from "@/classes/VectorRF/VectorRFDeclaration";
import { toast } from "@/components/ui/use-toast";
import { Monaco } from "@monaco-editor/react";

class Util {
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
    TableDeclaration,
    "file:///node_modules/@types/Table/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    ` declare class Util {
      
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
    }; 
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
    "Table",
    "Util",
    code + "\nreturn main();"
  );

  return executeCode(
    TreeNode,
    BinarySearchTree,
    VectorNodeType,
    VectorRF,
    HashMap,
    Table,
    Util
  );
}
