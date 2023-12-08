import fs from "fs/promises";

type Hand = { hand: string; bid: number };

// get the value of a char
const charMap = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
};

// calculate the hands strength (higher = better, ranging from 1-7)

const calculateStrength = (input: string) => {
  const counts = new Map<string, number>();
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (!counts.has(char)) {
      counts.set(char, 1);
    } else {
      counts.set(char, counts.get(char)! + 1);
    }
  }
  let pair = false;
  let threeOfAKind = false;
  for (let key of counts.keys()) {
    const value = counts.get(key)!;
    // 5 of a kind
    if (value === 5) {
      return 7;
    }
    // 4 of a kind
    if (value === 4) {
      return 6;
    }
    if (value === 3) {
      threeOfAKind = true;
    }
    if (value === 2) {
      pair = true;
    }
  }
  // full house
  if (pair && threeOfAKind) {
    return 5;
  }
  if (threeOfAKind) {
    return 4;
  }
  if (pair) {
    //
    const pairCount = [...counts.values()].reduce((prev, curr) => {
      if (curr === 2) {
        return prev + 1;
      }
      return prev;
    }, 0);
    if (
      // do we have two pairs of two or one pair of two
      pairCount === 2
    ) {
      return 3;
    }
    return 2;
  }
  return 1;
};

// return 1 if a is bigger and -1 if b is bigger
const compareHands = (a: Hand, b: Hand) => {
  const s1 = calculateStrength(a.hand);
  const s2 = calculateStrength(b.hand);
  if (s1 > s2) {
    return 1;
  }
  if (s1 < s2) {
    return -1;
  }
  for (let i = 0; i < 5; i++) {
    if (charMap[a.hand[i]] > charMap[b.hand[i]]) {
      return 1;
    }
    if (charMap[a.hand[i]] < charMap[b.hand[i]]) {
      return -1;
    }
  }
  throw new Error(`input ${a.hand} and ${b.hand} are the same`);
};

const run = async () => {
  const input = (await fs.readFile("./2023/day-07/input.txt")).toString();
  const hands: Hand[] = input.split("\n").map((x) => {
    const [hand, bid] = x.split(" ");
    if (!hand || !bid) {
      throw new Error("invalid input");
    }
    return { hand: hand.trim(), bid: Number(bid.trim()) };
  });

  // sort all of the hands based  on how good they are
  hands.sort(compareHands);
  let total = 0;

  for (let i = 0; i < hands.length; i++) {
    total = total + (i + 1) * hands[i].bid;
  }
  console.log({ total });
};

run();

// console.log(calculateStrength("QQAJA"));
