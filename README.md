# [Fun & Mental](https://fundamental-iota.vercel.app/): Visualizing Data Structures and Algorithms with React Flow and Monaco Editor

![image](/images/Screenshot%202024-08-20%20105609.png)

Welcome to **[Fun & Mental](https://fundamental-iota.vercel.app/)**, an innovative project that brings data structures and algorithms to life through interactive visualizations. This project, currently under development, leverages the power of React Flow and Monaco Editor to allow users to create, visualize, and understand complex data structures and algorithms in a fun and intuitive way.

## Key Features

1. **Interactive Visualizations**: Use React Flow to create dynamic nodes and edges representing various data structures and algorithms.
2. **Code in TSX**: Write and visualize your code directly in TSX files using the Monaco Editor.
3. **Customizable Components**: Design your own data structures, nodes, and edges with ease.
4. **Integrated Layout Management**: Utilize ELK library for efficient and customizable layout management.
5. **Ready-to-Use Data Structures**: Access pre-built data structures like
   - **Binary Search Trees**
     - ![alt text](</images/Screenshot 2024-07-19 105033.png>)
   - **Stacks**
     - ![alt text](</images/Screenshot 2024-07-19 105145.png>)
   - **Vectors**,
     - ![alt text](/images/image-3.png)
   - **HashMaps**
     - ![alt text](/images/image-1.png)
   - **Tables**.
     - ![alt text](/images/image.png)
   - **Element**
     - ![alt text](/images/image-2.png)
6. **LeetCode Problem Visualizations**: Visualize solutions to various LeetCode problems, with plans to cover all Neetcode problems.

### Getting Started

### Example Code

Here's a quick example to get you started with visualizing a Binary Search Tree:

```tsx
let frame = [];
let wait = 0.3;

function main() {
  const bst = new BinarySearchTree<number>();

  for (let i = 0; i < 30; i++) {
    const num = Math.round(Math.random() * 100);
    bst.insert(num);
    frame.push([Util.deepCopy(bst)]);
  }

  return { frame, wait };
}
```

![ezgif-5-1bcd419ec2](/images/Screenshot%202024-08-20%20104524.png)

In this example:

- `frame` is an array that stores each state of the binary search tree.
- `wait` sets the wait time between each render.
- `Util.deepCopy` is used to get a deep copy of the object.

link to this example <https://fundamental-iota.vercel.app/algorithm/2>

## Creating Custom Visualization Using Playground

### Step 1: Simple Linked List Class

First, let's create a basic linked list class without implementing the `IReactFlow` interface. This class will allow us to add and remove elements from the linked list.

```tsx
class LinkedList<T> {
  private list: T[];

  constructor() {
    this.list = [];
  }

  push_back(ele: T) {
    this.list.push(ele);
  }

  pop_back() {
    return this.list.pop();
  }

  size() {
    return this.list.length;
  }
}
```

[Link to this example](https://fundamental-iota.vercel.app/playground?shared=eJyFkEGLwjAQhf_KkFMLUgRv7q6_wKM3lSUbRzsYJyWZrsXif9-k2aKi4BzfvO8Nb9a9Yn1CNVfEO-wqCZ2aKONYkCWqxuoQYEl8xN2SgnyuFtBvGOI0nn61INgoz2G13n5sOG8iHsS3RpwvytGeRmoKVfLDFwz-JF5HrGlD_f2jzbFAizHxNVolW3KUT7xrMv4AepTW8z3vmuKJDXTBN5xFPkh9AwfWosDexw-OjZJw1pQaTqvZ8JJ9y0bIMZw0cT6SQ_5P9DlhkrmUrK7bP-K6gpw)

### Step 2: Visualizing Linked List with React Flow

Next, we will implement the method in the `IReactFlow` interface that generates React Flow elements (nodes and edges) for visualizing the linked list. We'll use the default node and edge types provided by React Flow.

[React Flow Documentation](https://reactflow.dev/)

```tsx
class LinkedList<T> implements IReactFlow {
  // ... (previous code)

  // create react flow elements
  getReactFlowElements() {
    const elements = {
      nodes: [],
      edges: [],
    };

    if (this.list.length === 0) return Promise.resolve(elements);

    // to see all node props <https://reactflow.dev/api-reference/types/node-props>
    elements.nodes.push({
      id: `node-0`,
      type: "default",
      position: { x: 0, y: 0 },
      data: { label: this.list[0] },
    });

    let preNodeId = `node-0`;

    for (let i = 1; i < this.list.length; i++) {
      const node = {
        id: `node-${i}`,
        type: "default",
        position: { x: i * 200, y: 0 },
        data: { label: this.list[i] },
      };
      elements.nodes.push(node);
      // to see all edge props <https://reactflow.dev/api-reference/types/edge-props>
      const edge = {
        id: `edge-${i}`,
        source: preNodeId,
        target: `node-${i}`,
        type: "default",
      };

      elements.edges.push(edge);
      preNodeId = `node-${i}`;
    }

    return Promise.resolve(elements);
  }
}
```

![alt text](/images/image-5.png)

[Full example](https://fundamental-iota.vercel.app/playground?shared=eJytld9v2jAQx_-VU7SHZKVJur2FH2-bVKmapqlvgFqTXMCqY0e2A-1Q_vfZDgGSwNZp8wMg-_s9zp-7XOZ7j5MCvcSjPMPXUKtXb-Slgmvk2uymjCgFD5S_YPZAlZ48zoAWJcPCnCu4_4Ek1V-Z2MF-wcGsUtIt0QjMiBN4nC_HC96cmKBKyyrVQvpBK7dLb6gKrR6m4PR2s25tZaU2TyuSvvjI0ES8bA2tzCqCgV-Ujb1jlKgryc_9ovQHXkV_4h98DPlab_rGNeojmS8HWN1AjgZgC3J6fmYXFxmqxPAYdfcxWw_26yNju2gOfj8_mE6nEAdt-t-lKKjCUKISbIt-m0bQCRRFoAUoRCCMuYRMdUWpYLLRulRJFEl7x9zcMcxwG5GS3krMUSJPMdJvJarIum6da3YK3P5d6C7ZlK53fZol8OzM8XOPgA2cwMLLMCcV0wuvd14KRTUVPIE9vCYQj-DNfELdk2VEEythZIUsOVV0Hi872roLhaE2FPCbSe0-M2Vrk-yIciHBt0pqFHdj8zUZtgzQm5ugX_amLRzrQUt0uXzY07qP5j14LiCi8BE-xddA_RYWXQ709bjXsReqbX8GPV233Wyf_327Wdeg3U5cXdDrXJ37GlclKpkassfiX2JPpHny_7VC3ce5g9A9_YdZZ372EQ4b0-VwpqrPQ79jGhw8zmYbOpfmbdHOabuxI9TO7Tj87LLOK57azoKCUH6aeA1-U9YpcNydv094VaxQzo6zl7HwNPHv4v-23Ry49Bt-c8aWrf4AYt-cj5pL2Wt79fIXoX0ZVQ)

### Step 3: Using ELK Library for Layout

We can use the ELK library to handle the layout.

```tsx
class LinkedList<T> implements IReactFlow {
  // ... (previous code)

  // create react flow elements
  getReactFlowElements() {
    const elements = {
      nodes: [],
      edges: [],
    };

    if (this.list.length === 0) return Promise.resolve(elements);

    // to see all node props <https://reactflow.dev/api-reference/types/node-props>
    elements.nodes.push({
      id: `node-0`,
      type: "default",
      data: { label: this.list[0] },
    });

    let preNodeId = `node-0`;

    for (let i = 1; i < this.list.length; i++) {
      const node = {
        id: `node-${i}`,
        type: "default",
        data: { label: this.list[i] },
      };
      elements.nodes.push(node);
      // to see all edge props <https://reactflow.dev/api-reference/types/edge-props>
      const edge = {
        id: `edge-${i}`,
        source: preNodeId,
        target: `node-${i}`,
        type: "default",
      };

      elements.edges.push(edge);
      preNodeId = `node-${i}`;
    }

    // getLayoutElements takes the nodes, edges, and ELK options
    return getLayoutElements(elements.nodes, elements.edges, {
      "elk.algorithm": "box",
    });
  }
}
```

![alt text](/images/image-6.png)

[Full example](https://fundamental-iota.vercel.app/playground?shared=eJylVdtuozAQ_ZUR2gdQKVDtG2361pWqjarVqm9JtHVgSKwYG9mml43y72ubkGBo96L1QwL2nGHOmYsX-4CTGoM8oLzE10Sr1yAOCsE1cm12C0aUgjnlOyznVOmbx1ugdcOwNucK7r8jKfQXJl5gv-RgViPpM9EIzBjn8LhYXS95d2KcKi3bQgsZRr25XXpLVWLtYQbO3m4eeljTqu2PNSl2ITI0Ht-HJtbMWkQTvGg6uAeUqFvJh3jRhBOsoj_xDziGfKO3Y-AG9UmZu6NYviOnBmAv5Gx4ZhcXJarc6BH7-1huJvuHk8Z20QrCcXwwm80gi_rwv0lRU4WJRCXYM4Z9GJHnKE1BC1CIQBhzAZnsikbBzVbrRuVpKi3HynBMSnxOSUMvJVYokReY6rcGVWpRlw51e3bcfy5xJLvUjejTMocnB86eRgpYxzksgxIr0jK9DEbnJdEkhz0wskaWn1O1yFZwGKrms2WoDT18MN-8L00--q97RpWQEFpLaiyurs3fzbQWgF5cRON8dvl2Ik5y7RP-tKeHMee_4f1b7tTn3lfN8P29rNjHaGTnl4Wtx38vC4ualMVZJuf0Y5kc-iOZlGhlYYQ65fI9KYk0Hfq_gvtt50nouvQ4k8zjWMJpnbkYBlaHUSOacOfkTbS6nyaGww7N7xa7URF3kyEGwku4m38F0WhqxJyMromn0E98PGIRj9OwDJDtEsI2QlK9rZeB1WgtXj19DoNZ6rjYpqmkuWr6IW83Xgi1Qz9LPjspq5YXNmioCeXncdnVhKm1GXB8GV5GvK3XKG9Pg9trz6xrz6ssm3YkY8n5XrHD2qgm6gfnLsxiC8qiyXXg4u-yumBs1Z8fhd1353HHyvIODqtfIL8wMg)

### Step 4: Adding Custom Node and Edge Types

To make the visualization more interactive, we'll define custom node and edge types.

### Custom Node Type

Let's define a custom node type that changes its background color when clicked.

```tsx
// create custom node: <https://reactflow.dev/examples/nodes/custom-node>
function LinkedListNodeType({ data }) {
  const colors = [
    "green",
    "red",
    "blue",
    "rose",
    "indigo",
    "gray",
    "orange",
    "amber",
    "teal",
    "pink",
  ];
  const [i, setI] = React.useState(0);

  function handleClick() {
    setI((i) => (i + 1) % colors.length);
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <div className="flex rounded h-14 border-2 border-gray-500">
        <div
          className={`bg-${colors[i]}-300 w-14 flex justify-center items-center`}
        >
          {data?.label}
        </div>
        <span className="w-14 border-l-2 border-gray-500 bg-white" />
      </div>
    </div>
  );
}

Util.addNodeType("lln", LinkedListNodeType);
```

### Custom Edge Type

We'll also define a custom edge type that draws a smooth step path with an arrow marker.

```tsx
// create custom edge: <https://reactflow.dev/examples/edges/custom-edges>
function LinkedListEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
          </marker>
        </defs>
      </svg>
      <BaseEdge path={edgePath} markerEnd="url(#arrowhead)" style={style} />
    </>
  );
}

Util.addEdgeType("lle", LinkedListEdgeType);
```

### Step 5: Integrating Custom Types with Linked List

Now, we'll modify the `getReactFlowElements` method to use our custom node and edge types.

```tsx
class LinkedList<T> implements IReactFlow {
  // ... (previous code)

  // create react flow elements
  getReactFlowElements() {
    const elements = {
      nodes: [],
      edges: [],
    };

    if (this.list.length === 0) return Promise.resolve(elements);

    // to see all node props <https://reactflow.dev/api-reference/types/node-props>
    elements.nodes.push({
      id: `node-0`,
      // adding new node type
      type: "lln",
      data: { label: this.list[0] },
    });

    let preNodeId = `node-0`;

    for (let i = 1; i < this.list.length; i++) {
      const node = {
        id: `node-${i}`,
        // adding new node type
        type: "lln",
        data: { label: this.list[i] },
      };
      elements.nodes.push(node);
      // to see all edge props <https://reactflow.dev/api-reference/types/edge-props>
      const edge = {
        id: `edge-${i}`,
        source: preNodeId,
        target: `node-${i}`,
        // adding new edge type
        type: "lle",
      };

      elements.edges.push(edge);
      preNodeId = `node-${i}`;
    }

    // getLayoutElements takes the nodes, edges, and ELK options
    return getLayoutElements(elements.nodes, elements.edges, {
      "elk.algorithm": "box",
    });
  }
}
```

![alt text](/images/image-7.png)

[Full example here](https://fundamental-iota.vercel.app/playground?shared=eJyVVuFu2zYQfhXC3QAJtWWlWTHAsT1gQ4YWC4Ki7bAWdrDQ1lniQosCScXJDL37jqRki5LdrP6RiOTd8e677-642A9yuoXBZMDyBJ4irZ4Gw8Fa5BpyjbtrTpUiNyx_gOSGKT39PCdsW3DY4rki7z8CXevfudiR_TIn-Cske6QaCEfhCfm8uLta5u4EjSoty7UWMggbcfPTGVORkSczYuXNZtWoFaXK_l7R9UMAHNDiadXIiBmJsKcvCqfuKUrQpczb-qIIerqK_Qsv6HHIU511FVPQB2Sua7B8QxYNAg2Qs_aZ-eUiATVBPIb-PiRpb786YGx-bEOCrn9kNpuROGzc_yDFlimIJCjBHyFo3Ag9Q-Mx0YIoAEI5tw5hdkWhyDTTulCT8ViaGDcYY5TA45gWbCRhAxLyNYz1cwFqbLRGVmt-NNxcF9kgXeo64bNkQu6tcnzfQQDdoknC8pTksHNumbt8IbMzIcsB5_ly0DGQUE0nZE84XQGfHHO5iO9I1YbVh4ODxvjhFi98n2DCGvc8oY2QJDCSDCUurvDftE8Wwl6_DrsJd4Sw4fTI4CPyw55VXVD-NzAvgfNNgJgPkAXpqsPPE7k1n-FVL4stchlWfz-5jFaPXEcsrdHzWFrtc1gqUco1gnRI-AkZTSXW-fdlxfr0UlaglxW_wj2cbUOo2x9-dnHuM9Y62pKqOjWPMd3QZ1HqpnFhoA-AfzNwXWnomtCQ0Dwh1zd_EFFohoj3umTPUuCzY9iJYtjN1XIA_CGiPBWS6Wy7HBh8VuLJw6dqtW0biym_jcSp1swTs7GjzMyXOLq0UG7KfG2cJlvK8mNndsRBQs5stlpzLy-3K5Dzw4zwCj12hX4Rx_3a5jw6jjAzFxA1sb215oJ4aJTisDd5rP8uqwvO75rzGti9Ox-6qEzcg2p4mOQbxuFNb5JjZtdYUjia16XSYmtzOTlXbvBEzZR3DVyNncrILOZL2YLviJBh2WekcLC3_QPTgihI47YDdS24kGbQLdyuyW4qAWwLOuxISLz1ipfgCwjlb-C7haXC20olffY2hKR56qtRg7-3o4Fyb6PA2A4byKNWMAs2xN6l399hPHbQR6WCTxrRDeLQSjrpA04ZZp3Db5zVD5H6EmMjCFhIZnMSMPKaXITkxxqqelqE9cXV0WrNgqCxMk3YIxG5tT7bt66qiH2_3SIvZsvBupRKyFEhGHICY583-mjhnVWyPQglXfdbDvDxpJjxf7b_UH9FH1ma6YqMz2u7vnha-wY2XWXjfNvNDYcnIkWJ79GEZKOLn8hKyATk6E3zYfI7ehvHXgjOUntNWmb396sUO59DFudYNbqMY7Iz1u19_yDB2eZ5tAaDDWEatqpe3Fdto3P_hr3h-i-RnZSe3HSM3vjuqYLmXqS7VnC8Hx5Bl3cZuoJQeoh5ptsrx5UDU_7UjEc4fA6l2Yz8E2UbXnVbyOXLLcR07ZdbiO3tTQuxi3M95BoPXQ9x8bCkrj5HyC_e6mu9cnT74q2-epIN-zyRzqbSz9y-Fqp6Y0vlA8jr3LnQ7WYLE8cHqjPTAdDap60QOvukoTCbwbHAPce7rp9xsBtTN6ozIVTtztPrEW0CqceU7FiiMyQhVhHJwBS1W3RKCjaqQ_mpQ8bfNLlCfSql2GVAsYl3z53WX_WtF_E5iXeNLz_3JfAB-AVP3p48-Yonl9GJM3w8IH-Nd6UW3eN5V3paCP6cIi1tn1QGFGLHNEHjQxIT9ItgfXA8eRWbJuQVpytJF4oP5biD5XSMaWivf6UKru1DGCk02zcMq45UxCtLyYNXB5hDvN0yd7a3_9qtdTr-dlc4FFvz5DxRiKYr3P0Hbkz1PQ)

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
