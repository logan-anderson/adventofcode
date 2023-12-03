import fs from "fs/promises";

const matchMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export function getFirstDigit(str: string) {
  const fistMatch = str.match(
    /one|two|three|four|five|six|seven|eight|nine|[0-9]/
  );
  // base case no digits left
  if (!fistMatch) {
    return null;
  }
  const match = fistMatch[0];
  if (Object.keys(matchMap).includes(match)) {
    return matchMap[match];
  }
  return match;
}

export function getLastDigit(str: string) {
  const matches = str.match(
    /one|two|three|four|five|six|seven|eight|nine|[0-9]/gm
  );
  if (!matches) {
    return null;
  }
  const lastMatch = matches?.pop();
  if (!lastMatch) {
    return null;
  }
  const match = lastMatch[0];
  if (Object.keys(matchMap).includes(match)) {
    return matchMap[match];
  }
  return match;
}
// export const solution = (input: string[]) => {
//   let total = 0;
//   input
//     .map((x) => {
//       return resolveMatches(x);
//     })
//     .map((x) => x.replace(/[^\d|\n]+/gm, ""))
//     .map((x) => {
//       const num = x[0] + x[x.length - 1];
//       return Number(num);
//     })
//     .forEach((x) => {
//       total += x;
//     });
//   return total;
// };
// // const run = async () => {
//   const input = (await fs.readFile("2023/day-01/input.txt"))
//     .toString()
//     .split("\n");
//   console.log({ total: solution(input) });
// };

// run();
