const reactFlowTypes = `
declare type Position = 'top' | 'bottom' | 'left' | 'right';

declare interface HandleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id?: string;
  type: 'source' | 'target';
  position: Position;
  isConnectable?: boolean;
  style?: React.CSSProperties;
  onConnect?: (params: { source: string; target: string }) => void;
}

declare const Handle: React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    HandleProps & React.RefAttributes<HTMLDivElement>
  >
>;

declare const BaseEdge: {
  ({ id, path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth, }: BaseEdgeProps): JSX.Element;
  displayName: string;
};

declare function EdgeLabelRenderer({ children }: { children: React.ReactNode }): import("react").ReactPortal | null;

declare type EdgeProps<T = any> = Pick<Edge<T>, 'id' | 'animated' | 'data' | 'style' | 'selected' | 'source' | 'target'> & Pick<WrapEdgeProps, 'sourceX' | 'sourceY' | 'targetX' | 'targetY' | 'sourcePosition' | 'targetPosition' | 'sourceHandleId' | 'targetHandleId' | 'interactionWidth'> & EdgeLabelOptions & {
  markerStart?: string;
  markerEnd?: string;
  pathOptions?: any;
};

declare function getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, curvature, }: GetBezierPathParams): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number];

declare function useReactFlow<NodeData = any, EdgeData = any>(): ReactFlowInstance<NodeData, EdgeData>;

declare const BezierEdge: React.MemoExoticComponent<({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth, }: BezierEdgeProps) => JSX.Element>;

declare type Node<T = any, U extends string | undefined = string | undefined> = {
  id: string;
  position: XYPosition;
  data: T;
  type?: U;
  style?: React.CSSProperties;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  /** @deprecated use \`parentId\` instead */
  parentNode?: string;
  parentId?: string;
  zIndex?: number;
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;
  [internalsSymbol]?: {
      z?: number;
      handleBounds?: NodeHandleBounds;
      isParent?: boolean;
  };
};

declare type Edge<T = any> = DefaultEdge<T> | SmoothStepEdgeType<T> | BezierEdgeType<T>;

declare function useStore<StateSlice = ExtractState>(selector: (state: ReactFlowState) => StateSlice, equalityFn?: (a: StateSlice, b: StateSlice) => boolean): StateSlice;

declare type ReactFlowState = ReactFlowStore & ReactFlowActions;

declare type NodeProps<T = any> = Pick<WrapNodeProps<T>, 'id' | 'data' | 'dragHandle' | 'type' | 'selected' | 'isConnectable' | 'xPos' | 'yPos' | 'zIndex'> & {
  // Add additional properties if needed
};
`;
export default reactFlowTypes;
