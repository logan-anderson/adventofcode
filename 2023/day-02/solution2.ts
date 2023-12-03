import fs from "fs/promises";

export const isRoundPossible = ({
  numRed,
  numBlue,
  numGreen,
}: {
  numRed: number;
  numBlue: number;
  numGreen: number;
}) => {
  if (numRed > 12 || numGreen > 13 || numBlue > 14) {
    return false;
  }
  return true;
};

export const solution = (input: string[]) => {
  let total = 0;

  return total;
};
const run = async () => {
  let total = 0;
  (await fs.readFile("2023/day-02/input.txt"))
    .toString()
    .split("\n")
    .forEach((x) => {
      const [beforeGame, afterGame] = x.split(":");
      const roundNumber = Number(beforeGame.replace("Game", "").trim());
      const rounds = afterGame.split(";");
      const smallestColors = {
        numRed: 0,
        numBlue: 0,
        numGreen: 0,
      };
      rounds.forEach((x) => {
        x.split(",")
          .map((x) => x.trim())
          .forEach((x) => {
            const [num] = x.split(" ");
            // console.log({ num });
            if (x.endsWith("blue")) {
              if (smallestColors.numBlue < Number(num)) {
                smallestColors.numBlue = Number(num);
              }
            }
            if (x.endsWith("green")) {
              if (smallestColors.numGreen < Number(num)) {
                smallestColors.numGreen = Number(num);
              }
            }
            if (x.endsWith("red")) {
              if (smallestColors.numRed < Number(num)) {
                smallestColors.numRed = Number(num);
              }
            }
          });
      });
      const gamePower =
        smallestColors.numBlue *
        smallestColors.numGreen *
        smallestColors.numRed;
      console.log({ gamePower, roundNumber, smallestColors });
      total = total + gamePower;
    });
  console.log({ total });
};

run();
