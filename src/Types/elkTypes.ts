// elkTypes.ts

export enum ElkAlgorithm {
  SporeOverlap = "sporeOverlap",
  Layered = "layered",
  Random = "random",
  Box = "box",
  MrTree = "mrtree",
  Disco = "disco",
  Fixed = "fixed",
  Force = "force",
  Radial = "radial",
  RectPacking = "rectpacking",
  SporeCompaction = "sporeCompaction",
  Stress = "stress",
}

export enum ElkDirection {
  Undefined = "UNDEFINED",
  Right = "RIGHT",
  Left = "LEFT",
  Down = "DOWN",
  Up = "UP",
}

export interface ElkLayoutOptions {
  "elk.algorithm"?: ElkAlgorithm;
  "elk.direction"?: ElkDirection;
  "elk.spacing.nodeNode"?: string;
  "elk.layered.spacing.nodeNodeBetweenLayers"?: string;
  "elk.spacing.nodeNodeBetweenLayers"?: string;
  "elk.spacing.edgeNode"?: string;
  "elk.spacing.edgeEdge"?: string;
  "elk.layered.spacing.nodeNodeWithinLayer"?: string;
  "elk.padding"?: string;
  "elk.edgeRouting"?: string;
  "elk.edgeRouting.selfLoopStyle"?: string;
  "elk.spacing.portPort"?: string;
  "elk.layered.priority.layering.nodeNode"?: string;
  "elk.layered.priority.layering.edgeEdge"?: string;
  "elk.layered.layering.strategy"?: string;
  "elk.layered.nodePlacement.strategy"?: string;
  "elk.layered.nodePlacement.bk.fixedAlignment"?: string;
  "elk.layered.nodePlacement.bk.randomSeed"?: string;
  "elk.layered.compaction.postCompaction.strategy"?: string;
  "elk.layered.compaction.postCompaction.separationMethod"?: string;
  "elk.padding.left"?: string;
  "elk.padding.right"?: string;
  "elk.padding.top"?: string;
  "elk.padding.bottom"?: string;
  // Add other options as needed
}

export const defaultElkLayoutOptionsBST: ElkLayoutOptions = {
  "elk.algorithm": ElkAlgorithm.MrTree,
  "elk.direction": ElkDirection.Down,
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  // Add default values for other options as needed
};
