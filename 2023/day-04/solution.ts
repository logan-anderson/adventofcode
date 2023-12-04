import fs from "fs/promises";

const run = async () => {
  const input = (await fs.readFile("./day-4/input.txt")).toString().split("\n");
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    // keep track of all the our numbers that are wining numbers
    const ourWinningNumbers: number[] = [];
    const element = input[i];
    // Remove's "Card <Number>:""
    const [, allNumbersInput] = element.split(":");
    // get a string of both number sets
    const [winningNumbersInput, numbersInput] = allNumbersInput.split("|");
    // get an array of both numbers
    const winningNumbers = winningNumbersInput
      .trim()
      .split(" ")
      .map((s) => s.trim())
      // will remove unwanted white space
      .filter(Boolean)
      .map(Number);
    const numbers = numbersInput
      .trim()
      .split(" ")
      .map((s) => s.trim())
      // will remove unwanted white space
      .filter(Boolean)
      .map(Number);

    for (let index = 0; index < numbers.length; index++) {
      const number = numbers[index];
      if (winningNumbers.includes(number)) ourWinningNumbers.push(number);
    }
    // Multiplier  = 2 raised to the power of |all of our matches| - 1
    if (ourWinningNumbers.length > 0) {
      const mult = Math.pow(2, ourWinningNumbers.length - 1);
      console.log({
        mult,
        i,
        length: ourWinningNumbers.length,
        ourWinningNumbers,
        numbers,
      });
      total = total + mult;
    }
  }
  console.log({ total });
};
run();
