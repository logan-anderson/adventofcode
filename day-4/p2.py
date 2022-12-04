
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
        if(does_overlap(a, b)):
            total += 1

    print(total)


def does_overlap(a: str, b: str) -> bool:
    [a1, a2] = [int(x) for x in a.split("-")]
    [b1, b2] = [int(x) for x in b.split("-")]
    print(a1, a2, b1, b2)

    if(a1 >= b1 and a1 <= b2):
        print('a1 is contained in b1-b2')
        return True
    elif(a2 >= b1 and a2 <= b2):
        print('a2 is contained in b1-b2')
        return True
    elif(b1 >= a1 and b1 <= a2):
        print('b1 is contained in a1-a2')
        return True
    elif(b2 >= a1 and b2 <= a2):
        print('b2 is contained in a1-a2')
        return True
    return False


if __name__ == "__main__":
    main()
