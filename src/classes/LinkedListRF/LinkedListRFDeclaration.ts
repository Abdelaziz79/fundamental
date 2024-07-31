const linkedListRFDeclaration = ` declare class LinkedListRF<T> {
    private list: T[];

    constructor();

    push_back(ele: T): void;

    pop_back(): T | null;

    size(): number;

    getReactFlowElements(): Promise<{
      nodes: any[];
      edges: any[];
    }>;

    clone<T>(instance: T): T;

    getOptions(): {};

    setOptions(options: {}): void;

    getPosition(): { posX: number | undefined; posY: number | undefined };

    setPosition(posX: number, posY: number): void;

}
    `;
export default linkedListRFDeclaration;
