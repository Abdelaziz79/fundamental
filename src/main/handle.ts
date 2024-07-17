const handleTypes = `
declare enum Position {
    Top = 'top',
    Left = 'left',
    Right = 'right',
    Bottom = 'bottom'
};

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
  `;
export default handleTypes;
