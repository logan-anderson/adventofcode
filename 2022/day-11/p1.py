from typing import List


class Monkey:
    def __init__(self, name: str, operation: str, test_num: int, true_num: int, false_num: int, items: List[int]) -> None:
        self.name = name
        self.operation = operation
        self.inspect_count = 0
        self.test_num = test_num
        self.true_num = true_num
        self.false_num = false_num
        self.items: List[int] = items

    def __str__(self) -> str:
        return f"{self.name} {self.inspect_count}"

    def add_inspection(self):
        self.inspect_count = self.inspect_count + 1

    def test(self, item: int):
        return self.true_num if item % self.test_num == 0 else self.false_num

    def operate_func(self, item: int):
        [operation, operand] = self.operation.split(' ')
        if operand == "old":
            operand = item
        operand = int(operand)

        if operation == "+":
            return item + operand
        elif operation == "*":
            return item * operand


inpt = open('input.txt').read()
inpt = open('example.txt').read()

monkeys: List[Monkey] = []

for monkey_str in inpt.split("\n\n"):
    lines = monkey_str.splitlines()
    m = Monkey(
        name=lines[0].strip(),
        items=[int(x.strip()) for x in lines[1].strip().removeprefix(
            "Starting items:").split(", ")],
        operation=lines[2].strip().removeprefix(
            "Operation: new = old").strip(),
        test_num=int(lines[3].strip()[-2:]),
        true_num=int(lines[4].strip()[-2:]),
        false_num=int(lines[5].strip()[-2:]),
    )
    monkeys.append(m)

# 20 rounds
for i in range(20):
    for m in monkeys:
        for item in m.items:
            new_item = m.operate_func(item)
            new_item = new_item // 3
            new_monkey_index = m.test(new_item)
            monkeys[new_monkey_index].items.append(new_item)
            m.add_inspection()
        m.items = []

for m in monkeys:
    print(m)


def getKey(m: Monkey):
    return m.inspect_count


[one, two, ] = sorted(monkeys, key=getKey, reverse=True)[:2]

print(one.inspect_count * two.inspect_count)
