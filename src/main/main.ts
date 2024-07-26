import BinarySearchTree from "@/classes/BinarySearchTree/BinarySearchTree";
import BinarySearchTreeDeclaration from "@/classes/BinarySearchTree/BinarySearchTreeDeclaration";
import TreeNode from "@/classes/BinarySearchTree/TreeNode";
import TreeNodeDeclaration from "@/classes/BinarySearchTree/TreeNodeDeclaration";
import ElementRF from "@/classes/ElementRF/ElementRF";
import ElementRFDeclaration from "@/classes/ElementRF/ElementRFDeclaration";
import HashMap from "@/classes/HashMap/HashMap";
import HashMapDeclaration from "@/classes/HashMap/HashMapDeclaration";
import StackRF from "@/classes/StackRF/StackRF";
import StackRFDeclaration from "@/classes/StackRF/StackRfDeclaration";
import Table from "@/classes/Table/Table";
import TableDeclaration from "@/classes/Table/TableDeclaration";
import VectorNodeType from "@/classes/VectorRF/VectorNodeType";
import VectorNodeTypeDeclaration from "@/classes/VectorRF/VectorNodeTypeDeclarations";
import VectorRF from "@/classes/VectorRF/VectorRF";
import VectorRFDeclaration from "@/classes/VectorRF/VectorRFDeclaration";
import { toast } from "@/components/ui/use-toast";
import IControllerDeclaration from "@/interfaces/IControllerDeclaration";
import IReactFlowDeclaration from "@/interfaces/IReactFlowDeclaration";
import {
  getLayoutElements,
  getRandomNumber,
  wait as waitSec,
} from "@/utils/helpers";
import { Monaco } from "@monaco-editor/react";
import { animated, config, useSpring } from "@react-spring/web";
import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor";
import React from "react";
import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
  Handle,
  Position,
  useReactFlow,
  useStore,
} from "reactflow";
import reactDefinitionFile from "./react-definition-file";
import reactFlowTypes from "./reactFlowTypes";
import tailwindcssDefinition from "./tailwindcssDefinition";
import Util from "./Util";

const themes = [
  "andromeeda",
  "aurora-x",
  "ayu-dark",
  "catppuccin-frappe",
  "catppuccin-latte",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dark-plus",
  "dracula",
  "dracula-soft",
  "github-dark",
  "github-dark-default",
  "github-dark-dimmed",
  "github-light",
  "github-light-default",
  "houston",
  "laserwave",
  "light-plus",
  "material-theme",
  "material-theme-darker",
  "material-theme-lighter",
  "material-theme-ocean",
  "material-theme-palenight",
  "min-dark",
  "min-light",
  "night-owl",
  "nord",
  "none",
  "monokai",
  "one-dark-pro",
  "poimandres",
  "one-light",
  "red",
  "rose-pine",
  "rose-pine-dawn",
  "rose-pine-moon",
  "slack-dark",
  "slack-ochin",
  "snazzy-light",
  "solarized-dark",
  "solarized-light",
  "synthwave-84",
  "tokyo-night",
  "vesper",
  "vitesse-black",
  "vitesse-dark",
  "vitesse-light",
];

export async function addLibs(
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: Monaco
) {
  const { createHighlighter } = await import("shiki");
  const highlighter = await createHighlighter({
    themes: [
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
    ],
    langs: ["javascript", "typescript", "tsx", "jsx"],
  });

  monaco.languages.register({ id: "jsx" });
  monaco.languages.register({ id: "tsx" });
  monaco.languages.register({ id: "javascript" });
  monaco.languages.register({ id: "typescript" });

  shikiToMonaco(highlighter, monaco);

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: "React.createElement",
    reactNamespace: "React",
    jsxFragmentFactory: "React.Fragment",
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    reactDefinitionFile,
    `file:///node_modules/@react/types/index.d.ts`
  );

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
    static addNodeType(name: string, func: React.FC<any>):void;

    static addEdgeType(name: string, func: any):void;

    static deepCopy(obj: any): any

  }`,
    "file:///node_modules/@types/Util/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    IReactFlowDeclaration,
    "file:///node_modules/@types/IReactFlow/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    IControllerDeclaration,
    "file:///node_modules/@types/IController/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare function waitSec(sec: number): Promise<void>;`,
    "file:///node_modules/@types/wait/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare const getLayoutElements: (nodes: any, edges: any, options: any) => Promise<{
      nodes: { position: { x: number, y: number } }[];
      edges: any[];
    }>;`,
    "file:///node_modules/@types/getLayoutElements/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare function getRandomNumber(min: number, max: number): number;`,
    "file:///node_modules/@types/getRandomNumber/index.d.ts"
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    reactFlowTypes,
    "file:///node_modules/@types/reactflow/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    StackRFDeclaration,
    "file:///node_modules/@types/StackRF/index.d.ts"
  );
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare function useSpring(props: any): any;

    declare const config: any;

    declare const animated: any;
    `,
    "file:///node_modules/@types/react-spring/index.d.ts"
  );
}

export default function compile(code: string) {
  try {
    const executeCode = new Function(
      "React",
      "BaseEdge",
      "EdgeLabelRenderer",
      "getBezierPath",
      "getStraightPath",
      "getSmoothStepPath",
      "getSimpleBezierPath",
      "useReactFlow",
      "BezierEdge",
      "useStore",
      "Handle",
      "Position",
      "TreeNode",
      "BinarySearchTree",
      "VectorNodeType",
      "VectorRF",
      "HashMap",
      "Table",
      "ElementRF",
      "Util",
      "getLayoutElements",
      "waitSec",
      "getRandomNumber",
      "tailwindcss",
      "StackRF",
      "animated",
      "useSpring",
      "config",
      code + "\nreturn main();"
    );
    return executeCode(
      React,
      BaseEdge,
      EdgeLabelRenderer,
      getBezierPath,
      getStraightPath,
      getSmoothStepPath,
      getSimpleBezierPath,
      useReactFlow,
      BezierEdge,
      useStore,
      Handle,
      Position,
      TreeNode,
      BinarySearchTree,
      VectorNodeType,
      VectorRF,
      HashMap,
      Table,
      ElementRF,
      Util,
      getLayoutElements,
      waitSec,
      getRandomNumber,
      tailwindcssDefinition,
      StackRF,
      animated,
      useSpring,
      config
    );
  } catch (err: any) {
    toast({ title: "Error", description: err.message, variant: "destructive" });
  }
}
