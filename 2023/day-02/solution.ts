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
  const input = (await fs.readFile("2023/day-02/input.txt"))
    .toString()
    .split("\n")
    .forEach((x) => {
      const [beforeGame, afterGame] = x.split(":");
      const roundNumber = Number(beforeGame.replace("Game", "").trim());
      const rounds = afterGame.split(";");
      let isGamePossible = true;
      rounds.forEach((x) => {
        const colors = {
          numRed: 0,
          numBlue: 0,
          numGreen: 0,
        };
        x.split(",")
          .map((x) => x.trim())
          .forEach((x) => {
            const [num] = x.split(" ");
            // console.log({ num });
            if (x.endsWith("blue")) {
              colors.numBlue = Number(num);
            }
            if (x.endsWith("green")) {
              colors.numGreen = Number(num);
            }
            if (x.endsWith("red")) {
              colors.numRed = Number(num);
            }
            if (!isRoundPossible(colors)) {
              isGamePossible = false;
            }
          });
      });
      if (isGamePossible) {
        total = total + roundNumber;
      }
    });
  console.log({ total });
};

run();
