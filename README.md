# [Fun & Mental](https://fundamental-iota.vercel.app/): Visualizing Data Structures and Algorithms with React Flow and Monaco Editor

![image](https://res.cloudinary.com/daily-now/image/upload/s--Y1vf3tiD--/f_auto/v1721307385/ugc/content_db874517-135b-4739-b48b-82311fc5d011)

Welcome to **[Fun & Mental](https://fundamental-iota.vercel.app/)**, an innovative project that brings data structures and algorithms to life through interactive visualizations. This project, currently under development, leverages the power of React Flow and Monaco Editor to allow users to create, visualize, and understand complex data structures and algorithms in a fun and intuitive way.

## Key Features

1. **Interactive Visualizations**: Use React Flow to create dynamic nodes and edges representing various data structures and algorithms.
2. **Code in TSX**: Write and visualize your code directly in TSX files using the Monaco Editor.
3. **Customizable Components**: Design your own data structures, nodes, and edges with ease.
4. **Integrated Layout Management**: Utilize ELK library for efficient and customizable layout management.
5. **Ready-to-Use Data Structures**: Access pre-built data structures like
   - **Binary Search Trees**
     - ![alt text](<Screenshot 2024-07-19 105033.png>)
   - **Stacks**
     - ![alt text](<Screenshot 2024-07-19 105145.png>)
   - **Vectors**,
     - ![alt text](image-3.png)
   - **HashMaps**
     - ![alt text](image-1.png)
   - **Tables**.
     - ![alt text](image.png)
   - **Element**
     - ![alt text](image-2.png)
6. **LeetCode Problem Visualizations**: Visualize solutions to various LeetCode problems, with plans to cover all Neetcode problems.

### Getting Started

### Example Code

Here's a quick example to get you started with visualizing a Binary Search Tree:

```tsx
let frame = [];
let wait = 0.3;

function main() {
  const bst = new BinarySearchTree<number>();
  bst.setOptions({
    nodeType: "custom",
    edgeType: "step",
    elkOptions: defaultElkLayoutOptionsBS,
    parentNode: true,
    posX: 0,
    posY: 0,
  });

  for (let i = 0; i < 30; i++) {
    const num = Math.round(Math.random() * 100);
    bst.insert(num);
    frame.push([Util.deepCopy(bst)]);
  }

  return { frame, wait };
}
const defaultElkLayoutOptionsBS = {
  "elk.algorithm": "mrtree",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  // Add default values for other options as needed
};
```

![ezgif-5-1bcd419ec2](https://res.cloudinary.com/daily-now/image/upload/s--QfqJzo95--/f_auto/v1721307442/ugc/content_2f982989-9394-41b2-9114-5bd50bfc986f)

In this example:

- `frame` is an array that stores each state of the binary search tree.
- `wait` sets the wait time between each render.
- `Util.deepCopy` is used to get a deep copy of the object.

link to this example <https://fundamental-iota.vercel.app/algorithm/2>

### Custom Data Structures

You can create your own data structures by implementing the `IReactFlow` interface. Here's an example of a Stack implementation:

```tsx
class Stack implements IReactFlow {
  elements;
  reactFlowElements;
  constructor() {
    this.elements = [];
    this.reactFlowElements = {
      nodes: [],
      edges: [],
    };
  }

  push(element) {
    this.elements.push(element);
  }

  pop() {
    return this.elements.pop();
  }

  peek() {
    return this.elements[this.elements.length - 1];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  async getReactFlowElements() {
    this.reactFlowElements.nodes = this.elements.map((element, index) => ({
      id: `node-${index}`,
      data: { label: element },
      type: "stackNode",
      position: {
        x: 250,
        y: index * 100,
      },
    }));

    return this.reactFlowElements;
  }
}
let frame = [];
function main() {
  const s = new Stack();
  s.push(10);
  s.push(10);
  s.push(10);
  s.push(10);

  frame.push([s]);
  return { frame };
}
```

And if you want full control you can implement the `IController` interface

### Custom Node and Edge Types

Follow react flow documentation for creating nodes and edges [here](https://reactflow.dev/examples/nodes/custom-node)

Creating custom node types is straightforward. Here’s how you can define a `StackNode`:

```tsx
const StackNode = ({ data }) => {
  return (
    <div className="p-4 bg-blue-500 text-white rounded shadow-lg flex justify-center items-center">
      {data.label}
    </div>
  );
};

Util.addNodeType("stackNode", StackNode);
```

### Layout Management with ELK

Use the ELK library to manage the layout before return the final nodes and edges:

```tsx
const defaultElkLayoutOptionsBS = {
  "elk.algorithm": "mrtree",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  // Add default values for other options as needed
};

getLayoutElements(nodes, edges, elkOptions);
```

### Styling with Tailwind CSS

While you can style your React components using Tailwind CSS, note that pseudo-classes in Tailwind are not currently working in this project.

### Ready-to-Use Data Structures

Explore our ready-to-use data structures like Binary Search Trees, Stacks, Vectors, HashMaps, and Tables. These structures come pre-built but with basic styling for now.

### Visualizing LeetCode Problems

One of our exciting goals is to visualize all Neetcode problems. This feature will help users understand and solve coding challenges with clear, step-by-step visualizations.

### Project Status

Please note that **Fun & Mental** is still under development. We are continuously working to improve functionality and add more features. Your feedback and contributions are welcome!

---

Enjoy exploring and visualizing data structures and algorithms with **Fun & Mental**! Stay tuned for more updates and improvements.

### Stay Connected

Follow our progress and contribute to the project on [GitHub](https://github.com/Abdelaziz79/fundamental). Happy coding!
