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


total = 0

for i, p in enumerate(inpt):
    l1, l2 = map(eval, p.split("\n"))
    s = is_in_right_order(l1, l2)
    if s == 1:
        print(i+1)
        print(l1, l2)
        total = total + i+1


print("total", total)
