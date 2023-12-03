import fs from "fs/promises";

function isSymbol(char: string) {
  if (char.match(/[0-9]|\./)) {
    return false;
  }
  // console.log(`YES! ${char} is a symbol`);
  return true;
}
function isNumber(char: string) {
  if (char.match(/[0-9]/)) {
    return true;
  }
  // console.log(`YES! ${char} is a symbol`);
  return false;
}
function getNumber(row: number, col: number, arr: string[]) {
  const strRow = arr[row];
  const nums = strRow.matchAll(/[0-9]+/g);
  for (let num of nums) {
    const match = num[0];
    if (
      typeof num.index !== "undefined" &&
      num.index <= col &&
      col <= num.index + match.length
    ) {
      return { num: Number(match), jump: num.index + match.length - col };
    }
  }
  return { num: 0, jump: 0 };
}

export const findAdjacentNumbers = (
  startIndex: number,
  row: number,
  len: number,
  arr: string[]
) => {
  const nums: number[] = [];
  const maxWidth = arr[0].length - 1;
  const maxHeight = arr.length;

  const left = Math.max(startIndex - 1, 0);
  const right = Math.min(startIndex + len, maxWidth);
  // Check top row
  if (row - 1 >= 0) {
    for (let i = left; i <= right; i++) {
      if (isNumber(arr[row - 1][i])) {
        const { jump, num } = getNumber(row - 1, i, arr);
        nums.push(num);
        i = i + jump;
      }
    }
  }
  // check left and right side
  if (left === startIndex - 1) {
    if (isNumber(arr[row][left])) {
      const { jump, num } = getNumber(row, left, arr);
      nums.push(num);
    }
  }
  if (right === startIndex + len) {
    if (isNumber(arr[row][right])) {
      const { num } = getNumber(row, right, arr);
      nums.push(num);
    }
  }
  // check bottom row
  if (row + 1 < maxHeight) {
    for (let i = left; i <= right; i++) {
      if (isNumber(arr[row + 1][i])) {
        const { num, jump } = getNumber(row + 1, i, arr);
        nums.push(num);
        i = i + jump;
      }
    }
  }
  return nums;
};
const run = async () => {
  let total = 0;
  const input = await fs.readFile("2023/day-03/input.txt");

  const lines = input.toString().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const allStars = line.matchAll(/\*/gm);
    for (let match of allStars) {
      if (typeof match?.index !== "undefined") {
        const adj = findAdjacentNumbers(match.index, i, match[0].length, lines);
        if (adj.length >= 2) {
          total = total + adj.reduce((a, b) => a * b, 1);
        }
      }
    }
  }
  console.log({ total });
};

run();
// console.log(isSymbol("."));
// console.log(isSymbol("a"));
// console.log(isSymbol("3"));
// console.log(isSymbol("#"));
