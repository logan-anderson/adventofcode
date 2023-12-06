// import fs from "fs/promises";

// const cache = new Map<number, number>();

// function processMaps(seed: number, maps: [number, number, number][][]) {
//   if (cache.has(seed)) {
//     return cache.get(seed)!;
//   }
//   let seedNumber = seed;
//   for (let i = 0; i < maps.length; i++) {
//     const map = maps[i];
//     const el = map.find((x) => {
//       return x[0] <= seedNumber && seedNumber < x[1];
//     });
//     if (el) {
//       const diff = el[2];
//       const newSeedNumber = seedNumber + diff;
//       seedNumber = newSeedNumber;
//     }
//   }
//   cache.set(seed, seedNumber);
//   return seedNumber;
// }

// const run = async () => {
//   const input = (await fs.readFile("./2023/day-05/input.txt")).toString();
//   const lines = input.split("\n");
//   const seeds = lines[0].replace("seeds: ", "").trim().split(" ").map(Number);
//   const pairs: [number, number][] = seeds.reduce(function (
//     result,
//     value,
//     index,
//     array
//   ) {
//     if (index % 2 === 0) result.push(array.slice(index, index + 2));
//     return result;
//   },
//   [] as any);
//   console.log({ pairs });

//   const maps: [number, number, number][][] = [];
//   let mapIndex = 0;

//   for (let i = 3; i < lines.length; i++) {
//     const line = lines[i];
//     if (!line) {
//       continue;
//     }
//     if (line.endsWith("map:")) {
//       mapIndex++;
//       continue;
//     }
//     let [mapTo, mapFrom, count] = line.split(" ").map(Number);

//     const mapExists = typeof maps[mapIndex] !== "undefined";
//     if (!mapExists) {
//       maps.push([]);
//     }
//     const currentMap = maps[mapIndex];

//     currentMap.push([mapFrom, mapFrom + count, mapTo - mapFrom]);

//     // for (let j = mapFrom; j < mapFrom + count; j++) {
//     //   currentMap.set(j, k);
//     //   k++;
//     // }
//   }

//   const locationNumbers: number[] = [];
//   for (let pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
//     const pair = pairs[pairIndex];
//     for (let i = pair[0]; i < pair[0] + pair[1]; i++) {
//       locationNumbers.push(processMaps(i, maps));
//     }
//   }
//   // keep track of all location numbers
//   //   const locationNumbers: number[] = seeds.map((seed) =>
//   //     processMaps(seed, maps)
//   //   );

//   console.log({ solution: Math.min(...locationNumbers) });
// };
// run();

import fs from "fs";

// Read the file and split into lines
const lines = fs
  .readFileSync("./2023/day-05/input.txt", "utf8")
  .trim()
  .split("\n");

const rawSeeds = lines[0].split(" ").slice(1).map(Number);
const seeds: [number, number][] = [];

for (let i = 0; i < rawSeeds.length; i += 2) {
  seeds.push([rawSeeds[i], rawSeeds[i + 1]]);
}

// Generate all the mappings
const maps: Array<Array<[number, number, number]>> = [];

let i = 2;
while (i < lines.length) {
  const [catA, catB] = lines[i].split(" ")[0].split("-");
  maps.push([]);

  i++;
  while (i < lines.length && lines[i] !== "") {
    const [dstStart, srcStart, rangeLen] = lines[i].split(" ").map(Number);
    maps[maps.length - 1].push([dstStart, srcStart, rangeLen]);
    i++;
  }

  maps[maps.length - 1].sort((a, b) => a[1] - b[1]);

  i++;
}

// Ensure that all mappings are disjoint
for (const m of maps) {
  for (let i = 0; i < m.length - 1; i++) {
    if (!(m[i][1] + m[i][2] <= m[i + 1][1])) {
      console.log(m[i], m[i + 1]);
    }
  }
}

function* remap(
  lo: number,
  hi: number,
  m: Array<[number, number, number]>
): Generator<[number, number]> {
  const ans: Array<[number, number, number]> = [];
  for (const [dst, src, R] of m) {
    const end = src + R - 1;
    const D = dst - src;

    if (!(end < lo || src > hi)) {
      ans.push([Math.max(src, lo), Math.min(end, hi), D]);
    }
  }

  for (let i = 0; i < ans.length; i++) {
    const [l, r, D] = ans[i];
    yield [l + D, r + D];

    if (i < ans.length - 1 && ans[i + 1][0] > r + 1) {
      yield [r + 1, ans[i + 1][0] - 1];
    }
  }

  if (ans.length === 0) {
    yield [lo, hi];
    return;
  }

  if (ans[0][0] !== lo) {
    yield [lo, ans[0][0] - 1];
  }

  if (ans[ans.length - 1][1] !== hi) {
    yield [ans[ans.length - 1][1] + 1, hi];
  }
}

let ans = 1 << 60;

for (const [start, R] of seeds) {
  let curIntervals: Array<[number, number]> = [[start, start + R - 1]];
  let newIntervals: Array<[number, number]> = [];

  for (const m of maps) {
    for (const [lo, hi] of curIntervals) {
      for (const newInterval of remap(lo, hi, m)) {
        newIntervals.push(newInterval);
      }
    }

    [curIntervals, newIntervals] = [newIntervals, []];
  }

  for (const [lo, _] of curIntervals) {
    ans = Math.min(ans, lo);
  }
}

console.log(ans);
