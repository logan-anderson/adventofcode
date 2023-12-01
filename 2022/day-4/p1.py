
def main():
    inp = open('input.txt').read()
#     inp = """2-4,6-8
# 2-3,4-5
# 5-7,7-9
# 2-8,3-7
# 6-6,4-6
# 2-6,4-8"""

    lines = inp.split('\n')

    total = 0

    for line in lines:
        [a, b] = line.split(",")
        # print(a, b)
        if(does_contain(a, b)):
            total += 1

    print(total)


def does_contain(a: str, b: str) -> bool:
    [a1, a2] = [int(x) for x in a.split("-")]
    [b1, b2] = [int(x) for x in b.split("-")]
    print(a1, a2, b1, b2)

    if(a1 <= b1 and a2 >= b2):
        print('true a')
        return True
    elif b1 <= a1 and b2 >= a2:
        print('true b')
        return True
    return False


if __name__ == "__main__":
    main()
