import fs from "fs/promises";

const run = async () => {
  const input = (await fs.readFile("./day-4/input.txt")).toString().split("\n");
  const cardCounts: number[] = new Array(input.length).fill(1);

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
    if (ourWinningNumbers.length > 0) {
      const cardWinnings = ourWinningNumbers.length;
      const currentCardCount = cardCounts[i];

      // console.log({
      //   cardWinnings,
      //   start: i + 1,
      //   end: i + cardWinnings,
      //   currentCardCount,
      // });

      for (
        let cardNumber = i + 1;
        cardNumber <= i + cardWinnings;
        cardNumber++
      ) {
        cardCounts[cardNumber] = cardCounts[cardNumber] + currentCardCount;
      }
      // console.log({ i, ourWinningNumbers, cardCounts });
    }
  }
  console.log({ cardCounts });
  console.log({
    total: cardCounts.reduce((prev, current) => {
      return prev + current;
    }, 0),
  });
};
run();
