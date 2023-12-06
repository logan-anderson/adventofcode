import fs from "fs/promises";

function processMaps(seed: number, maps: [number, number, number][][]) {
  let seedNumber = seed;
  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const el = map.find((x) => {
      return x[0] <= seedNumber && seedNumber < x[1];
    });
    if (el) {
      const diff = el[2];
      const newSeedNumber = seedNumber + diff;
      console.log({ seedNumber, newSeedNumber });
      console.log({ el: el[2], diff });
      seedNumber = newSeedNumber;
    }
  }
  return seedNumber;
}

const run = async () => {
  const input = (await fs.readFile("./2023/day-05/input.txt")).toString();
  const lines = input.split("\n");
  const seeds = lines[0].replace("seeds: ", "").trim().split(" ").map(Number);
  const maps: [number, number, number][][] = [];
  let mapIndex = 0;

  for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      continue;
    }
    if (line.endsWith("map:")) {
      mapIndex++;
      continue;
    }
    let [mapTo, mapFrom, count] = line.split(" ").map(Number);

    const mapExists = typeof maps[mapIndex] !== "undefined";
    if (!mapExists) {
      maps.push([]);
    }
    const currentMap = maps[mapIndex];

    currentMap.push([mapFrom, mapFrom + count, mapTo - mapFrom]);

    // for (let j = mapFrom; j < mapFrom + count; j++) {
    //   currentMap.set(j, k);
    //   k++;
    // }
  }
  // keep track of all location numbers
  const locationNumbers: number[] = seeds.map((seed) =>
    processMaps(seed, maps)
  );

  console.log({ locationNumbers, solution: Math.min(...locationNumbers) });

  console.dir({ firstMap: maps[0] }, { depth: null });
};
run();
