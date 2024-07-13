const algorithms = [
  {
    id: "2",
    title: "Binary search tree",
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
    id: "4",
    title: "Binary search",
    description: "",
    autoFrame: false,
    code: `let frame = [];
let wait = .5;
const table = new Table<string, number[]>();
table.set("left", []);
table.set("mid", []);
table.set("right", []);
table.setPosition(600, 100);

function binarySearchF(vec: VectorRF<number>, left: number, right: number, target: number) {
    while (left <= right) {
        let mid = Math.ceil((left + right) / 2);
        vec.threeHighlight(left, right, mid);
        table.set("left", [...table.get("left"), left]);
        table.set("mid", [...table.get("mid"), mid]);
        table.set("right", [...table.get("right"), right]);

        frame.push([Util.deepCopy(vec), Util.deepCopy(table)])
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
    let res = binarySearchF(vec, 0, vec.size() - 1, 40);
    const toast = Util.createToast({ title: \`\${res}\` })
    frame.push([Util.deepCopy(vec), Util.deepCopy(table), toast]);
    return { frame, wait }
}
`,
  },
];

export default algorithms;
