from functools import cmp_to_key


inpt = open("input.txt").read().split("\n\n")
# inpt = open("example.txt").read().split("\n\n")


# 1 means in the right order. 0 means we dont know yet and -1 means in the wrong order
def is_in_right_order(l1, l2):

    # Are they both ints?
    if isinstance(l1, int) and isinstance(l2, int):
        if l1 < l2:
            return 1
        if l1 == l2:
            return 0
        return -1

    # If l1 is a int and l2 is a list
    if isinstance(l1, int) and isinstance(l2, list):
        l1 = [l1]

    # IF l1 is a list and l2 is an int
    if isinstance(l1, list) and isinstance(l2, int):
        l2 = [l2]

    for i in range(min(len(l1), len(l2))):
        order = is_in_right_order(l1[i], l2[i])
        if order != 0:
            return order

    if len(l1) == len(l2):
        return 0
    if len(l1) < len(l2):
        return 1
    return -1


all = []

for i, p in enumerate(inpt):
    l1, l2 = map(eval, p.split("\n"))
    all.append(l1)
    all.append(l2)

d1 = [[2]]
d2 = [[6]]
all.append(d1)
all.append(d2)

all.sort(key=cmp_to_key(is_in_right_order), reverse=True)

index1 = all.index(d1) + 1
index2 = all.index(d2) + 1
print(index1*index2)
# new_all = sorted(all, key=)
