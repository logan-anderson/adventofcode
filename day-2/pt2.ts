// A for Rock, B for Paper, and C for Scissors

//  X means you need to lose,
//  Y means you need to end the round in a draw
//  Z means you need to win. Good luck!"

// (1 for Rock, 2 for Paper, and 3 for Scissors)
// (0 if you lost, 3 if the round was a draw, and 6 if you won)

const solve = ({ elf, me }: { elf: string; me: string }) => {
  // if its a draw return 3
  const needToLoose = me === "X";
  const needToDraw = me === "Y";
  const needToWin = me === "Z";

  if (needToDraw) {
    return { score: 3, letter: elf };
  }

  // If I need to win
  if (needToWin && elf === "A") {
    return { score: 6, letter: "B" };
  }
  if (needToWin && elf === "B") {
    return { score: 6, letter: "C" };
  }
  if (needToWin && elf === "C") {
    return { score: 6, letter: "A" };
  }

  // if I need to loose
  if (needToLoose && elf === "A") {
    return { score: 0, letter: "C" };
  }
  if (needToLoose && elf === "B") {
    return { score: 0, letter: "A" };
  }
  if (needToLoose && elf === "C") {
    return { score: 0, letter: "B" };
  }

  throw Error("Invalid input");
};

// (1 for Rock, 2 for Paper, and 3 for Scissors)
const getExtraPoints = (letter: string) => {
  if (letter === "A") return 1;
  if (letter === "B") return 2;
  if (letter === "C") return 3;
  throw Error("Invalid letter");
};

const input = await Deno.readTextFile("input.txt");
// const input = `A Y
// B X
// C Z`;
const lines = input.split("\n");

let total = 0;

for (const line of lines) {
  const [elf, me] = line.split(" ");
  console.log({ elf, me });
  const roundScore = solve({ elf, me });
  console.log({ roundScore });
  total += roundScore.score;
  const extraPts = getExtraPoints(roundScore.letter);
  console.log({ extraPts });
  total += extraPts;
}
console.log(total);
