// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// (1 for Rock, 2 for Paper, and 3 for Scissors)
// (0 if you lost, 3 if the round was a draw, and 6 if you won)

const solve = ({ elf, me }: { elf: string; me: string }) => {
  // if its a draw return 3
  if (
    (elf === "A" && me === "X") ||
    (elf === "B" && me === "Y") ||
    (elf === "C" && me === "Z")
  )
    return 3;
  // If I wins return 6
  if (
    (me === "X" && elf === "C") ||
    (me === "Y" && elf === "A") ||
    (me === "Z" && elf === "B")
  )
    return 6;
  return 0;
};

// (1 for Rock, 2 for Paper, and 3 for Scissors)
const getExtraPoints = (letter: string) => {
  if (letter === "X") return 1;
  if (letter === "Y") return 2;
  if (letter === "Z") return 3;
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
  const roundScore = solve({ elf, me });
  console.log({ roundScore });
  total += roundScore;
  const extraPts = getExtraPoints(me);
  console.log({ extraPts });
  total += extraPts;
}
console.log(total);
