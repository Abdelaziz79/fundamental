const IReactFlowDeclaration = `
declare interface IReactFlow {
    
    getReactFlowElements({}): Promise<{
        nodes: any[];
        edges: any[];
    }>;

};
`;

export default IReactFlowDeclaration;
