const linkedListRFDeclaration = `
declare class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T);

}

declare class LinkedListRF<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private length: number;
  private posX: number | undefined;
  private posY: number | undefined;
  private options: {
      nodeType: string;
      edgeType: string;
      layoutOptions?: any;
  };
  private pointerNode: ListNode<T> | null;

  constructor();

  push_back(value: T): void;

  pop_back(): T | undefined;

  size(): number;

  push_front(value: T): void;

  pop_front(): T | undefined;

  get(index: number): T | undefined;

  set(index: number, value: T): boolean;

  insert(index: number, value: T): boolean;

  remove(index: number): T | undefined;

  clear(): void;

  toArray(): T[];

  getReactFlowElements(): Promise<{
      nodes: any[];
      edges: any[];
  }>;

  getOptions(): {};

  setPosition(posX: number, posY: number): void;

  getPosition(): { posX: number | undefined; posY: number | undefined };

  setOptions(options: {
      nodeType: string;
      edgeType: string;
      layoutOptions?: any;
  }): void;

  setPointer(index: number): boolean;
  
  clearPointer(): void;
  
  clone<U>(instance: U): U;
  
  setHead(node: ListNode<T> | null): void;

  setTail(node: ListNode<T> | null): void;

  getHead(): ListNode<T> | null;
  
  getTail(): ListNode<T> | null;
  }`;

export default linkedListRFDeclaration;
