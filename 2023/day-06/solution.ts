import fs from "fs";

// const input = [
//   // racetime (ms), record (mm)
//   [71530, 940200],
//   //   [15, 40],
//   //   [30, 200],
// ] as const;

// Time:        56     97     78     75
// Distance:   546   1927   1131   1139
const input = [
  [56, 546],
  [97, 1927],
  [78, 1131],
  [75, 1139],
] as const;

const calculateRace = ({
  holdDown,
  duration,
}: {
  holdDown: number;
  duration: number;
}) => {
  return holdDown * (duration - holdDown);
};

let total = 0;
for (let index = 0; index <= raceTime; index++) {
  const r = index * (raceTime - index);
  if (r > record) {
    total++;
  }
}

const solution = async () => {
  const betterTimes: number[] = [];
  for (let i = 0; i < input.length; i++) {
    const example = input[i];
    const raceTime = example[0];
    const record = example[1];

    // hold button for "Middle" MS
    const middle = Math.floor(raceTime / 2);

    let betterTimesCount = 1;
    let done = false;
    let fromMiddle = 1;
    while (!done) {
      const race1 = calculateRace({
        holdDown: middle + fromMiddle,
        duration: raceTime,
      });
      const race2 = calculateRace({
        holdDown: middle - fromMiddle,
        duration: raceTime,
      });
      // can we beat them
      if (race1 > record) {
        betterTimesCount++;
      }
      if (race2 > record) {
        betterTimesCount++;
      }
      // did we loose both ?
      if (race1 <= record && race2 <= record) {
        done = true;
      }
      fromMiddle++;
    }
    betterTimes.push(betterTimesCount);
  }
  console.log({
    solution: betterTimes.reduce((prev, current) => {
      return prev * current;
    }, 1),
  });
};

solution();
// console.log(calculateRace({ holdDown: 0, duration: 10 }));
// console.log(calculateRace({ holdDown: 1, duration: 10 }));
// console.log(calculateRace({ holdDown: 2, duration: 10 }));
// console.log(calculateRace({ holdDown: 3, duration: 10 }));
// console.log(calculateRace({ holdDown: 4, duration: 10 }));
// console.log(calculateRace({ holdDown: 5, duration: 10 }));
// console.log(calculateRace({ holdDown: 6, duration: 10 }));
// console.log(calculateRace({ holdDown: 7, duration: 10 }));
// console.log(calculateRace({ holdDown: 8, duration: 10 }));
// console.log(calculateRace({ holdDown: 9, duration: 10 }));
// console.log(calculateRace({ holdDown: 10, duration: 10 }));

// console.log(calculateRace({ holdDown: 0, duration: 5 }));
// console.log(calculateRace({ holdDown: 1, duration: 5 }));
// console.log(calculateRace({ holdDown: 2, duration: 5 }));
// console.log(calculateRace({ holdDown: 3, duration: 5 }));
// console.log(calculateRace({ holdDown: 4, duration: 5 }));
// console.log(calculateRace({ holdDown: 5, duration: 5 }));
