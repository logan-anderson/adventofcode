import fs from "fs/promises";

function isSymbol(char: string) {
  if (char.match(/[0-9]|\./)) {
    return false;
  }
  // console.log(`YES! ${char} is a symbol`);
  return true;
}

export const isPartNumber = (
  startIndex: number,
  row: number,
  len: number,
  arr: string[]
) => {
  // console.log(
  //   `is ${arr[row].slice(startIndex, startIndex + len)} a part number`
  // );
  const maxWidth = arr[0].length - 1;
  const maxHeight = arr.length;

  const left = Math.max(startIndex - 1, 0);
  const right = Math.min(startIndex + len, maxWidth);
  // Check top row
  if (row - 1 > 0) {
    for (let i = left; i <= right; i++) {
      if (isSymbol(arr[row - 1][i])) {
        return true;
      }
    }
  }
  // check left and right side
  if (isSymbol(arr[row][left])) {
    return true;
  }
  if (isSymbol(arr[row][right])) {
    return true;
  }
  // check bottom row
  if (row + 1 < maxHeight) {
    for (let i = left; i <= right; i++) {
      if (isSymbol(arr[row + 1][i])) {
        return true;
      }
    }
  }
  return false;
};
const run = async () => {
  let total = 0;
  const input = await fs.readFile("2023/day-03/input.txt");

  const lines = input.toString().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const allNums = line.matchAll(/[0-9]+/gm);
    for (let match of allNums) {
      if (typeof match?.index !== "undefined") {
        if (isPartNumber(match.index, i, match[0].length, lines)) {
          // console.log(`${match[0]} is a part number`);
          total = total + Number(match[0]);
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
