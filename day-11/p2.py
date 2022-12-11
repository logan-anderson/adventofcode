from math import lcm
import numpy as np
from typing import List


def add_func(one, two):
    return np.add(one, two)


def mult_func(one, two):
    return np.multiply(one, two)


def square(one):
    return np.square(one)


class Monkey:
    def __init__(self, name: str, operation: str, test_num: int, true_num: int, false_num: int, items: List[int]) -> None:
        self.name = name
        self.inspect_count = 0
        self.test_num = test_num
        self.true_num = true_num
        self.false_num = false_num
        self.items: List[int] = items
        self.test_cache = dict()
        [operation_real, operand] = operation.split(' ')
        self.operation_real = operation_real
        self.operand = operand if operand == "old" else int(operand)

        self.calc: function

        if(self.operation_real == "+"):
            self.calc = add_func
        else:
            self.calc = mult_func

    def __str__(self) -> str:
        return f"{self.name} {self.inspect_count} items: {', '.join(str(i) for i in self.items)} "

    def add_inspection(self):
        self.inspect_count = self.inspect_count + 1

    def test(self, item: int):
        # t = self.test_cache.get(item)
        # if t:
        # return t
        val = self.true_num if item % self.test_num == 0 else self.false_num
        # self.test_cache[item] = val
        return val

    def operate_func(self, item: int):
        if self.operand == "old":
            return square(item)
        return self.calc(item, self.operand)


inpt = open('input.txt').read()
# inpt = open('example.txt').read()

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


def print_monkeys(monkeys: List[Monkey]):
    for m in monkeys:
        print(m)
    print('====')


num_lmc = lcm(*[monkey.test_num for monkey in monkeys])
print(num_lmc)

for i in range(10000):
    # print_monkeys(monkeys)
    for m in monkeys:
        for item in m.items:
            new_item = m.operate_func(item)

            new_monkey_index = m.test(new_item)
            new_item %= num_lmc
            monkeys[new_monkey_index].items.append(new_item)
            m.add_inspection()
        m.items.clear()


def getKey(m: Monkey):
    return m.inspect_count


print_monkeys(monkeys)
[one, two, ] = sorted(monkeys, key=getKey, reverse=True)[:2]

print(one.inspect_count * two.inspect_count)
