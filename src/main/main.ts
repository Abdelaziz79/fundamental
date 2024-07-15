import BinarySearchTree from "@/classes/BinarySearchTree/BinarySearchTree";
import BinarySearchTreeDeclaration from "@/classes/BinarySearchTree/BinarySearchTreeDeclaration";
import TreeNode from "@/classes/BinarySearchTree/TreeNode";
import TreeNodeDeclaration from "@/classes/BinarySearchTree/TreeNodeDeclaration";
import ElementRF from "@/classes/ElementRF/ElementRF";
import ElementRFDeclaration from "@/classes/ElementRF/ElementRFDeclaration";
import HashMap from "@/classes/HashMap/HashMap";
import HashMapDeclaration from "@/classes/HashMap/HashMapDeclaration";
import Table from "@/classes/Table/Table";
import TableDeclaration from "@/classes/Table/TableDeclaration";
import VectorNodeType from "@/classes/VectorRF/VectorNodeType";
import VectorNodeTypeDeclaration from "@/classes/VectorRF/VectorNodeTypeDeclarations";
import VectorRF from "@/classes/VectorRF/VectorRF";
import VectorRFDeclaration from "@/classes/VectorRF/VectorRFDeclaration";
import IReactFlowDeclaration from "@/interfaces/IReactFlowDeclaration";
import { Monaco } from "@monaco-editor/react";
import Util from "./Util";

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
    ElementRFDeclaration,
    "file:///node_modules/@types/ElementRF/index.d.ts"
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

    static deepCopy(obj: any): any

  }`,
    "file:///node_modules/@types/Util/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    IReactFlowDeclaration,
    "file:///node_modules/@types/IReactFlow/index.d.ts"
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
    "ElementRF",
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
    ElementRF,
    Util
  );
}
