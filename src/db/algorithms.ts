const algorithms = [
  {
    id: "1",
    title: "Find duplicate",
    description: "find duplicate number in that array",
    code: `let frame = [];
let wait = .5;

function main() {
    
    const nums = new VectorRF<number>({ items: [6, 1, 8, 2, 9, 10, 7, 1, 45, 2, 7, 1] });
    const hm = new HashMap<number, boolean>();
    hm.setPosition(1000, 0);
    
    for (let i = 0; i < nums.size(); i++) {
        nums.oneHighlight(i);
        const curNum = nums.get(i);
        hm.setPointer(\`\${curNum}\`);
        
        const ask = Util.createToast({ title: \`if we saw \${curNum} before ?\` });
        
        if (hm.get(curNum) === true) {
            const yes = Util.createToast({ title: \`yes found duplicate number : \${curNum}\`, className: "bg-green-200 border-green-500 " });
            break;
        }
        
        const no = Util.createToast({ title: \`no then add \${curNum} to the map\`, variant: "destructive" });

        hm.set(curNum, true);
    }

    return { frame, wait };
}
`,
    autoFrame: true,
  },
  {
    id: "2",
    title: "Binary search tree test",
    description: "test binary search tree",
    code: `let frame = [];
let wait = .5;

function main() {
  const bst = new BinarySearchTree<number>();
  bst.setOptions({ nodeType: "custom", edgeType: "step", elkOptions: defaultElkLayoutOptionsBS, parentNode: true, posX: 0, posY: 0 });

  for (let i = 0; i < 30; i++) {
    const num = Math.round(Math.random() * 100);
    bst.insert(num);
  }

  return { frame, wait };
}

enum ElkAlgorithm {
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

const defaultElkLayoutOptionsBS = {
  "elk.algorithm": ElkAlgorithm.MrTree,
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  // Add default values for other options as needed
};
`,
    autoFrame: true,
  },
];

export default algorithms;
