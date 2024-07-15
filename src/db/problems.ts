const problems = [
  {
    id: "217",
    title: "217. Contains Duplicate",
    description: "find duplicate number in that array",
    autoFrame: false,
    level: "easy",
    code: `let frame = [];
let wait = .3;

function hasDuplicate(vec: VectorRF<number>) {
    const hm = new HashMap<number, boolean>();
    hm.setPosition(1000, 0);

    frame.push([Util.deepCopy(vec), Util.deepCopy(hm)]);
    for (let i = 0; i < vec.size(); i++) {
        const curNum = vec.get(i);
        vec.oneHighlight(i);
        hm.setPointer(\`\${curNum}\`);

        frame.push([Util.deepCopy(vec), Util.deepCopy(hm)]);
        if (hm.get(curNum) === true) {
            const toast = Util.createToast({ title: \`Found duplicate number \${curNum}\`, className: "bg-green-200 border-green-500 " })
            frame.push([Util.deepCopy(vec), Util.deepCopy(hm), toast]);
            return true;
        }
        hm.set(curNum, true);
        
        frame.push([Util.deepCopy(vec), Util.deepCopy(hm)]);
    }
    const toast = Util.createToast({ title: \`there is no duplicate number\`, variant: "destructive" })
    
    frame.push([Util.deepCopy(vec), Util.deepCopy(hm), toast]);
    return false;
}
function main() {

    const nums = new VectorRF<number>({ items: [6, 1, 8, 2, 9, 10, 7, 13, 45, 7, 743, 431] });
    hasDuplicate(nums);

    return { frame, wait };
}
`,
  },
  {
    id: "1",
    title: "1. Two Sum",
    description: "",
    autoFrame: false,
    level: "easy",
    code: `let frame = [];
let wait = 0.5;

function twoSum(nums: VectorRF<number>, target: number) {

    const newTarget = new VectorRF<number>();
    newTarget.push_back(target);
    newTarget.setPosition(-200, 0)
    const map = new HashMap<number, number>();
    map.setPosition(400, 0);

    frame.push([Util.deepCopy(nums), Util.deepCopy(newTarget), Util.deepCopy(map)]);

    for (let i = 0; i < nums.size(); i++) {
        nums.oneHighlight(i);
        const want = target - nums.get(i);
        if (map.has(want)) {
            const result = new VectorRF<number>();
            result.push_back(map.get(want));
            result.push_back(i);
            result.setPosition(-200, 100);
            const toast = Util.createToast({title:\`Found the two sum in index \${map.get(want)} and \${i}\`})
            frame.push([Util.deepCopy(nums), Util.deepCopy(newTarget), Util.deepCopy(map), Util.deepCopy(result),toast]);
            return { indices: [map.get(want), i] };
        }
        map.set(nums.get(i), i);
        map.setPointer(\`\${nums.get(i)}\`);
        frame.push([Util.deepCopy(nums), Util.deepCopy(newTarget), Util.deepCopy(map)]);
    }

    const toast = Util.createToast({ title: \`No two sum solution found\`, variant: "destructive" });
    frame.push([Util.deepCopy(nums), Util.deepCopy(newTarget), Util.deepCopy(map), toast]);
    return { indices: [] };
}

function main() {
    const nums = new VectorRF<number>({ items: [2, 7, 11, 15] })
    const target = 26;
    const result = twoSum(nums, target);
    
    return { frame, wait };
}`,
  },
  {
    id: "242",
    title: "242. Valid Anagram",
    description: "",
    autoFrame: false,
    level: "easy",
    code: `let frame = [];
let wait = 0.5;

function isAnagram(s: string, t: string) {
    const newS = new VectorRF<string>();
    newS.push_back(s);

    const newT = new VectorRF<string>();
    newT.push_back(t);
    newT.setPosition(200,0);
    if (s.length !== t.length) {
        const toast = Util.createToast({ title: \`Strings are not of the same length\`, variant: "destructive" });
        frame.push([Util.deepCopy(newS), Util.deepCopy(newT), toast]);
        return false;
    }

    const map = new HashMap<string, number>();
    map.setPosition(400, 0);

    frame.push([Util.deepCopy(newS), Util.deepCopy(newT), Util.deepCopy(map)]);

    for (const c of s) {
        map.set(c, (map.get(c) || 0) + 1);
        map.setPointer(c);
        frame.push([Util.deepCopy(newS), Util.deepCopy(newT), Util.deepCopy(map)]);
    }

    for (const c of t) {
        map.set(c, (map.get(c) || 0) - 1);
        map.setPointer(c);
        frame.push([Util.deepCopy(newS), Util.deepCopy(newT), Util.deepCopy(map)]);
    }

    for (const [key, value] of map.entries()) {
        if (value !== 0) {
            const toast = Util.createToast({ title: \`Strings are not anagrams\`, variant: "destructive" });
            frame.push([Util.deepCopy(newS), Util.deepCopy(newT), Util.deepCopy(map), toast]);
            return false;
        }
    }

    const toast = Util.createToast({ title: \`Strings are anagrams\`, className: "bg-green-200 border-green-500 " });
    frame.push([Util.deepCopy(newS), Util.deepCopy(newT), Util.deepCopy(map), toast]);
    return true;
}

function main() {
    const str1 = "listen";
    const str2 = "silent";
    isAnagram(str1, str2);

    return { frame, wait };
}
`,
  },
  {
    id: "49",
    title: "49. Group Anagrams",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 1;

function groupAnagrams(strs: VectorRF<string>) {
    const ans = new VectorRF<VectorRF<string>>();
    const map = new HashMap<string, VectorRF<string>>();
    map.setPosition(300, 100);
    ans.setPosition(-100, 100);
    frame.push([Util.deepCopy(strs), Util.deepCopy(map)]);
    for (let i = 0; i < strs.size(); i++) {
        const arr = new Array(26).fill(0);
        strs.oneHighlight(i);
        for (const c of strs.get(i)) {
            arr[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = arr.toString();
        if (!map.has(key)) {
            map.set(key, new VectorRF());
        }
        map.get(key)!.push_back(strs.get(i));
        frame.push([Util.deepCopy(strs), Util.deepCopy(map)]);

    }

    for (const [_, res] of map.entries()) {
        ans.push_back(new VectorRF<string>({items:res.toArray()}));
    }
    frame.push([Util.deepCopy(strs), Util.deepCopy(map), ans]);

    return ans;
}

function main() {
    const input = new VectorRF<string>({ items: ["eat", "tea", "tan", "ate", "nat", "bat"] })
    const result = groupAnagrams(input);

    return { frame, wait }
}
    `,
  },
  {
    id: "347",
    title: "347. Top K Frequent Elements",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;

function topKFrequent(nums: VectorRF<number>, k: number) {
    const res = new VectorRF<number>();
    const count = new HashMap<number, number>();
    const freq = new VectorRF<VectorRF<number>>()
    res.setPosition(-100, 0);
    nums.setPosition(0, -100);
    count.setPosition(200, 0);
    freq.setPosition(500, 0);

    frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res)]);

    for (let i = 0; i < nums.size() + 1; i++) {
        freq.push_back(new VectorRF({ items: [] }));
    }

    for (let i = 0; i < nums.size(); i++) {
        const n = nums.get(i);
        nums.oneHighlight(i);
        count.setPointer(\`\${n}\`);
        count.set(n, (count.get(n) || 0) + 1)
        frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res)]);

    }

    for (const [key, value] of count.entries()) {
        count.setPointer(\`\${key}\`)
        freq.oneHighlight(value);
        freq.get(value).push_back(key);
        frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res)]);

    }
    for (let i = freq.size() - 1; i > 0; --i) {
        if (freq.get(i).size() === 0) continue;

        freq.oneHighlight(i);
        frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res)]);

        for (let j = 0; j < freq.get(i).size(); j++) {
            freq.get(i).oneHighlight(j);
            res.push_back(freq.get(i).get(j));
            frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res)]);

            if (res.size() == k) {
                const toast = Util.createToast({ title: "Finished", className: "bg-green-200 border-green-500" })
                frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res), toast]);
                return res;
            }
        }
    }
    const toast = Util.createToast({ title: "Finished", className: "bg-green-200 border-green-500" })
    frame.push([Util.deepCopy(nums), Util.deepCopy(count), Util.deepCopy(freq), Util.deepCopy(res), toast]);

    return res;
}


function main() {
    const nums = new VectorRF({ items: [1, 2, 2, 3, 3, 4, 3, 3, 5, 5] })
    const k = 3
    topKFrequent(nums, k);
    return { frame, wait }
}`,
  },
  {
    id: "238",
    title: "238. Product of Array Except Self",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = .5;

function productExceptSelf(nums: VectorRF<number>) {
    const n = nums.size();
    const ans = new VectorRF({ items: new Array(n).fill(0) });
    const pre = new VectorRF({ items: new Array(n).fill(1) });
    const suf = new VectorRF({ items: new Array(n).fill(1) });

    pre.setPosition(0, 100);
    suf.setPosition(0, 200);
    ans.setPosition(0, 300);

    frame.push([Util.deepCopy(nums), Util.deepCopy(pre), Util.deepCopy(suf)]);

    for (let i = 1, j = n - 2; i < n && j >= 0; i++, j--) {
        nums.twoHighlight(i - 1, j + 1);
        pre.oneHighlight(i);
        suf.oneHighlight(j);
        pre.set(i, nums.get(i - 1) * pre.get(i - 1));
        suf.set(j, nums.get(j + 1) * suf.get(j + 1));
        frame.push([Util.deepCopy(nums), Util.deepCopy(pre), Util.deepCopy(suf)]);
    }

    for (let i = 0; i < n; i++) {
        pre.oneHighlight(i);
        suf.oneHighlight(i);
        ans.oneHighlight(i);
        ans.set(i, pre.get(i) * suf.get(i));
        frame.push([Util.deepCopy(nums), Util.deepCopy(pre), Util.deepCopy(suf), Util.deepCopy(ans)]);
    }
    const toast = Util.createToast({ title: "Finished", className: "bg-green-200 border-green-500" })
    frame.push([Util.deepCopy(nums), Util.deepCopy(pre), Util.deepCopy(suf), Util.deepCopy(ans), toast]);

    return ans;
}

function main() {
    const input = new VectorRF({ items: [1, 2, 3, 4] });
    const result = productExceptSelf(input);

    return { frame, wait };
}
`,
  },
  {
    id: "36",
    title: "36. Valid Sudoku",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.3;

function isValidSudoku(board: VectorRF<VectorRF<string>>) {
    const map = new VectorRF({ items: new Array(9).fill(null).map(() => new VectorRF({ items: new Array(10).fill(0) })) });
    const minMap = new VectorRF({
        items: [
            new VectorRF({ items: [0, 1, 2] }),
            new VectorRF({ items: [3, 4, 5] }),
            new VectorRF({ items: [6, 7, 8] })
        ]
    });

    map.setPosition(1000, 0);
    minMap.setPosition(0, 1000);
    frame.push([Util.deepCopy(board), Util.deepCopy(map), Util.deepCopy(minMap)]);

    for (let i = 0; i < 9; i++) {
        const checkRows = new VectorRF({ items: new Array(10).fill(0) });
        const checkCols = new VectorRF({ items: new Array(10).fill(0) });

        checkRows.setPosition(500, 1000);
        checkCols.setPosition(500, 1100);

        frame.push([Util.deepCopy(board), Util.deepCopy(map), Util.deepCopy(minMap), Util.deepCopy(checkRows), Util.deepCopy(checkCols)]);

        for (let j = 0; j < 9; j++) {
            board.get(i).oneHighlight(j);
            board.get(j).oneHighlight(i);
            if (board.get(i).get(j) !== '.') {
                const num = parseInt(board.get(i).get(j));
                checkRows.oneHighlight(num);

                if (checkRows.get(num) === 1) return false;
                checkRows.set(num, checkRows.get(num) + 1);
                
                minMap.oneHighlight(Math.floor(i / 3));
                minMap.get(Math.floor(i / 3)).oneHighlight(Math.floor(j / 3))

                const minMapIndex = minMap.get(Math.floor(i / 3)).get(Math.floor(j / 3));
                map.get(minMapIndex).oneHighlight(num);
                if (map.get(minMapIndex).get(num) === 1) return false;
                map.get(minMapIndex).set(num, map.get(minMapIndex).get(num) + 1);
            }

            if (board.get(j).get(i) !== '.') {
                const num = parseInt(board.get(j).get(i));
                checkCols.oneHighlight(num);
                if (checkCols.get(num) === 1) return false;
                checkCols.set(num, checkCols.get(num) + 1);
            }

            frame.push([Util.deepCopy(board), Util.deepCopy(map), Util.deepCopy(minMap), Util.deepCopy(checkRows), Util.deepCopy(checkCols)]);
        }
    }

    const toast = Util.createToast({ title: "Sudoku is valid", className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(board), Util.deepCopy(map), Util.deepCopy(minMap), toast]);

    return true;
}

function main() {
    const input = new VectorRF({
        items: [
            new VectorRF({ items: ['5', '3', '.', '.', '7', '.', '.', '.', '.'] }),
            new VectorRF({ items: ['6', '.', '.', '1', '9', '5', '.', '.', '.'] }),
            new VectorRF({ items: ['.', '9', '8', '.', '.', '.', '.', '6', '.'] }),
            new VectorRF({ items: ['8', '.', '.', '.', '6', '.', '.', '.', '3'] }),
            new VectorRF({ items: ['4', '.', '.', '8', '.', '3', '.', '.', '1'] }),
            new VectorRF({ items: ['7', '.', '.', '.', '2', '.', '.', '.', '6'] }),
            new VectorRF({ items: ['.', '6', '.', '.', '.', '.', '2', '8', '.'] }),
            new VectorRF({ items: ['.', '.', '.', '4', '1', '9', '.', '.', '5'] }),
            new VectorRF({ items: ['.', '.', '.', '.', '8', '.', '.', '7', '9'] })
        ]
    });

    const result = isValidSudoku(input);
    if (result === false) {
        frame.push([Util.createToast({ title: "not valid sudoku", variant: "destructive" })])
    }
    return { frame, wait };
}
`,
  },
  {
    id: "128",
    title: "128. Longest Consecutive Sequence",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;

function longestConsecutive(nums: VectorRF<number>) {
    if (nums.size() === 0) return 0;

    let res = 0;
    const numsSet = new Set<number>();
    for (let i = 0; i < nums.size(); i++) {
        numsSet.add(nums.get(i));
    }

    const setVector = new VectorRF({ items: Array.from(numsSet) });
    setVector.setPosition(0, 100);
    frame.push([Util.deepCopy(nums), Util.deepCopy(setVector)]);
    let i = 0;
    for (const num of numsSet) {
        setVector.oneHighlight(i++);
        const highlightSet = new Set([num]);
        if (!numsSet.has(num - 1)) {
            let longest = 0;
            while (numsSet.has(num + longest)) {
                highlightSet.add(num + longest);
                longest++;
            }
            res = Math.max(longest, res);
        }
        const currentLongest = new VectorRF({ items: Array.from(highlightSet) });
        currentLongest.setPosition(0, 200);
        frame.push([Util.deepCopy(nums), Util.deepCopy(setVector), Util.deepCopy(currentLongest)]);
    }

    const resultToast = Util.createToast({ title: \`Longest Consecutive Sequence: \${res}\`, className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(nums), Util.deepCopy(setVector), resultToast]);

    return res;
}

function main() {
    const input = new VectorRF<number>({ items: [100, 4, 200, 1, 3, 2, 2, 3] });
    const result = longestConsecutive(input);

    return { frame, wait };
}

    `,
  },
  {
    id: "271",
    title: "271. Encode and Decode Strings",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;
const encoded = new VectorRF<string>();

function encode(strs: VectorRF<string>) {
    let s = "";
    encoded.setPosition(0, 100);
    for (let i = 0; i < strs.size(); i++) {
        const str = strs.get(i);
        const part = \`\${str.length}#\${str}\`;
        s += part;
        encoded.push_back(part);
        strs.oneHighlight(i);
        frame.push([Util.deepCopy(strs), Util.deepCopy(encoded)]);
    }

    const resultToast = Util.createToast({ title: \`Encoded String: \${s}\`, className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(strs), Util.deepCopy(encoded), resultToast]);

    return s;
}

function decode(s: string) {
    const res = new VectorRF<string>();
    res.setPosition(0, 100);
    encoded.setPosition(0, 0);
    let i = 0;

    while (i < s.length) {
        let j = i;
        while (s[j] !== '#') j++;
        const len = parseInt(s.substring(i, j));
        const str = s.substring(j + 1, j + 1 + len);
        res.push_back(str);
        i = j + 1 + len;
        res.oneHighlight(res.size() - 1);
        encoded.oneHighlight(res.size() - 1);
        frame.push([Util.deepCopy(res), Util.deepCopy(encoded)]);
    }

    const resultToast = Util.createToast({ title: "Decoding Finished", className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(res), resultToast]);

    return res;
}

function main() {
    const input = new VectorRF<string>({ items: ["hello", "world", "encode", "decode"] });
    const encoded = encode(input);


    const decoded = decode(encoded);

    return { frame, wait };
}
 `,
  },
  {
    id: "125",
    title: "125. Valid Palindrome",
    description: "",
    autoFrame: false,
    level: "easy",
    code: `let frame = [];
let wait = 0.5;

function isAlphaNumeric(c: string): boolean {
    const charCode = c.charCodeAt(0);
    if (charCode < 48 || charCode > 122) return false;
    if (charCode > 57 && charCode < 65) return false;
    if (charCode > 90 && charCode < 97) return false;
    return true;
}

function isPalindrome(s: VectorRF<string>): boolean {
    let l = 0;
    let h = s.size() - 1;

    s.setPosition(0, 100);
    frame.push([Util.deepCopy(s)]);

    while (l < h) {
        while (l < s.size() && h >= 0 && !isAlphaNumeric(s.get(l))) l++;
        while (l < s.size() && h >= 0 && !isAlphaNumeric(s.get(h))) h--;

        s.twoHighlight(l, h);
        frame.push([Util.deepCopy(s)]);

        if (l < s.size() && h >= 0 && s.get(l).toLowerCase() !== s.get(h).toLowerCase()) {
            const resultToast = Util.createToast({ title: "Not a Palindrome", variant: "destructive" });
            frame.push([Util.deepCopy(s), resultToast]);
            return false;
        }

        l++;
        h--;

        frame.push([Util.deepCopy(s)]);
    }

    const resultToast = Util.createToast({ title: "Is a Palindrome", className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(s), resultToast]);

    return true;
}

function main() {
    const input = new VectorRF<string>({ items: Array.from("A man, a plan, a canal: Panama") });
    const result = isPalindrome(input);

    return { frame, wait };
}
`,
  },
  {
    id: "167",
    title: "167. Two Sum II - Input Array Is Sorted",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;

function twoSum(numbers: VectorRF<number>, target: number): VectorRF<number> {
    let l = 0, h = numbers.size() - 1;
    const result = new VectorRF<number>();

    numbers.setPosition(0, 100);
    frame.push([Util.deepCopy(numbers)]);

    while (l < h) {
        numbers.twoHighlight(l, h);
        frame.push([Util.deepCopy(numbers)]);

        if (numbers.get(l) + numbers.get(h) === target) {
            result.push_back(l + 1);
            result.push_back(h + 1);
            const resultToast = Util.createToast({ title: \`Pair Found: [\${l + 1}, \${h + 1}]\`, className: "bg-green-200 border-green-500" });
            frame.push([Util.deepCopy(numbers), result, resultToast]);
            return result;
        }
        if (numbers.get(l) + numbers.get(h) > target) {
            h--;
        } else {
            l++;
        }

        frame.push([Util.deepCopy(numbers)]);
    }

    result.push_back(-1);
    result.push_back(-1);
    const resultToast = Util.createToast({ title: "Pair Not Found", className: "bg-red-200 border-red-500" });
    frame.push([Util.deepCopy(numbers), result, resultToast]);

    return result;
}

function main() {
    const input = new VectorRF<number>({ items: [2, 7, 11, 15, 21, 43, 66, 102, 104] });
    const target = 64;
    const result = twoSum(input, target);

    return { frame, wait };
}
`,
  },
  {
    id: "15",
    title: "15. 3Sum",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;

function threeSum(nums: VectorRF<number>): VectorRF<VectorRF<number>> {
    const res = new VectorRF<VectorRF<number>>();
    res.setPosition(0, 100);
    const n = nums.size();
    nums.sort((a, b) => a - b);

    frame.push([Util.deepCopy(nums), Util.deepCopy(res)]);

    for (let i = 0; i < n - 1; i++) {
        if (i > 0 && nums.get(i - 1) === nums.get(i)) continue;

        let l = i + 1, r = n - 1;

        while (l < r) {
            nums.twoHighlight(i, l);
            nums.oneHighlight(r);
            frame.push([Util.deepCopy(nums), Util.deepCopy(res)]);

            const sum = nums.get(i) + nums.get(l) + nums.get(r);
            if (sum === 0) {
                res.push_back(new VectorRF<number>({ items: [nums.get(i), nums.get(l), nums.get(r)] }));
                l++;
                while (l < r && nums.get(l - 1) === nums.get(l)) l++;
            } else if (sum > 0) {
                r--;
            } else {
                l++;
            }

            frame.push([Util.deepCopy(nums), Util.deepCopy(res)]);
        }
    }

    const resultToast = Util.createToast({ title: "Finished", className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(nums), Util.deepCopy(res), resultToast]);

    return res;
}

function main() {
    const input = new VectorRF<number>({ items: [-1, 0, 1, 2, -1, -4] });
    const result = threeSum(input);

    return { frame, wait };
}
`,
  },
  {
    id: "11",
    title: "11. Container With Most Water",
    description: "",
    autoFrame: false,
    level: "medium",
    code: `let frame = [];
let wait = 0.5;
const table = new Table<string, number[]>();
table.set("left", []);
table.set("right", []);
table.set("result", []);
table.set("v", []);
table.setPosition(0, 100);

function maxArea(height: VectorRF<number>): number {

    let res = 0;
    const n = height.size();
    let l = 0, r = n - 1;

    frame.push([Util.deepCopy(height)]);

    while (l < r) {
        height.twoHighlight(l, r);
        const v = Math.min(height.get(l), height.get(r)) * (r - l);
        res = Math.max(res, v);
        table.set("left", [...table.get("left"), l])
        table.set("right", [...table.get("right"), r])
        table.set("result", [...table.get("result"), res])
        table.set("v", [...table.get("v"), v])
        frame.push([Util.deepCopy(height), Util.deepCopy(table)]);

        if (height.get(l) <= height.get(r)) {
            l++;
        } else {
            r--;
        }
    }

    const resultToast = Util.createToast({ title: \`Maximum Area: \${res}\`, className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(height), Util.deepCopy(table), resultToast]);

    return res;
}

function main() {
    const input = new VectorRF<number>({ items: [1, 8, 6, 2, 5, 4, 8, 3, 7] });
    const result = maxArea(input);

    return { frame, wait };
}
`,
  },
  {
    id: "42",
    title: "42. Trapping Rain Water",
    description: "",
    autoFrame: false,
    level: "hard",
    code: `let frame = [];
let wait = 0.5;
const table = new Table<string, number[]>();
table.set("maxLeft", []);
table.set("maxRight", []);
table.set("sum", []);
table.setPosition(0, 300);

function trap(height: VectorRF<number>): number {
    let res = 0;
    const n = height.size();
    const maxLeft = new VectorRF<number>({ items: new Array(n).fill(0) });
    const maxRight = new VectorRF<number>({ items: new Array(n).fill(0) });

    maxLeft.setPosition(0, 100);
    maxRight.setPosition(0, 200);
    frame.push([Util.deepCopy(height), Util.deepCopy(maxLeft), Util.deepCopy(maxRight), Util.deepCopy(table)]);

    for (let i = 1; i < n; i++) {
        height.oneHighlight(i - 1);
        maxLeft.oneHighlight(i - 1);
        maxLeft.set(i, Math.max(maxLeft.get(i - 1), height.get(i - 1)));
        table.set("maxLeft", maxLeft.toArray());
        frame.push([Util.deepCopy(height), Util.deepCopy(maxLeft), Util.deepCopy(maxRight), Util.deepCopy(table)]);
    }

    for (let i = n - 2; i >= 0; i--) {
        height.oneHighlight(i + 1);
        maxRight.oneHighlight(i + 1);
        maxRight.set(i, Math.max(maxRight.get(i + 1), height.get(i + 1)));
        table.set("maxRight", maxRight.toArray());
        frame.push([Util.deepCopy(height), Util.deepCopy(maxLeft), Util.deepCopy(maxRight), Util.deepCopy(table)]);
    }

    for (let i = 0; i < n; i++) {
        maxRight.oneHighlight(i);
        maxLeft.oneHighlight(i);
        height.oneHighlight(i);
        const sum = Math.min(maxLeft.get(i), maxRight.get(i)) - height.get(i);
        if (sum > 0) res += sum;
        table.set("sum", [...table.get("sum"), sum]);
        frame.push([Util.deepCopy(height), Util.deepCopy(maxLeft), Util.deepCopy(maxRight), Util.deepCopy(table)]);
    }

    const resultToast = Util.createToast({ title: \`Total Water Trapped: \${res}\`, className: "bg-green-200 border-green-500" });
    frame.push([Util.deepCopy(height), Util.deepCopy(maxLeft), Util.deepCopy(maxRight), Util.deepCopy(table), resultToast]);

    return res;
}

function main() {
    const input = new VectorRF<number>({ items: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] });
    const result = trap(input);

    return { frame, wait };
}
`,
  },
];

export default problems;
