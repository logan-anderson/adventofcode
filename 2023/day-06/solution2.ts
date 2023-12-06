const raceTime = 56977875;
const record = 546192711311139;

let total = 0;

for (let index = 0; index <= raceTime; index++) {
  const r = index * (raceTime - index);
  if (r > record) {
    total++;
  }
}
console.log({ total });
