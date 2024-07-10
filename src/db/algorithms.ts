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
  {
    id: "3",
    title: "Two Sum",
    description: "",
    code: `let frame = [];
let wait = .5;

function main() {
    // write your code here
    const t = 10;
    const nums = new VectorRF<number>({ items: [1, 4, 7, 2, 8, 2, 4] })
    const hm = new HashMap<number, number>();
    hm.setPosition(600, 0);
    let sz = nums.size();
    frame.push([Util.deepCopy(nums), Util.deepCopy(hm)]);
    for (let i = 0; i < sz; i++) {
        const currNum = nums.get(i);
        nums.oneHighlight(i);
        const want = t - currNum;
        const ask = Util.createToast({ title: \`\${currNum} need \${want} to be \${t} we saw \${want} ?\` })

        frame.push([Util.deepCopy(nums), Util.deepCopy(hm), ask]);
        if (hm.get(want)) {
            const wantIndex = hm.get(want);
            const yes = Util.createToast({ title: \`yes then print there index \${i} , \${wantIndex} \`, className: "bg-green-200 border-green-500" })
            console.log(i, wantIndex);
            hm.setPointer(\`\${want}\`);
            frame.push([Util.deepCopy(nums), Util.deepCopy(hm), yes]);

            break;
        }
        const no = Util.createToast({ title: \`no then add \${currNum} and its index \${i} to the map\`, variant: "destructive" })
        hm.set(currNum, i);
        hm.setPointer(\`\${currNum}\`);
        frame.push([Util.deepCopy(nums), Util.deepCopy(hm), no]);

    }

    return { frame, wait }
}`,
    autoFrame: false,
  },
  {
    id: "4",
    title: "Binary search",
    description: "",
    autoFrame: false,
    code: `let frame = [];
let wait = 0.5;


function binarySearchF(vec: VectorRF<number>, left: number, right: number, target: number) {
    while (left <= right) {
        let mid = Math.ceil((left + right) / 2);
        vec.threeHighlight(left, right, mid);
        frame.push([Util.deepCopy(vec)])
        if (vec.get(mid) === target) return mid;
        else if (vec.get(mid) > target) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    return -1;
}


function main() {
    const vec = new VectorRF<number>({ items: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200] });
    let res = binarySearchF(vec, 0, vec.size() - 1, 140);
    const toast = Util.createToast({ title: \`\${res}\` })
    frame.push([Util.deepCopy(vec), toast]);
    return { frame, wait }
}
`,
  },
];

export default algorithms;
