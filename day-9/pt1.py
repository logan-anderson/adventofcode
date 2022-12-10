
# Looks at the 8 spots around the head to see if the tail is touching it
def is_touching(tail, head):
    if tail == head:
        return True
    if (head[0] + 1, head[1]) == tail:
        return True
    if (head[0] - 1, head[1]) == tail:
        return True
    if (head[0], head[1] + 1) == tail:
        return True
    if (head[0], head[1] - 1) == tail:
        return True
    if (head[0] + 1, head[1] + 1) == tail:
        return True
    if (head[0] + 1, head[1] - 1) == tail:
        return True
    if (head[0] - 1, head[1] + 1) == tail:
        return True
    if (head[0] - 1, head[1] - 1) == tail:
        return True
    return False


def move_tail(tail, head, oldHead):
    if(is_touching(tail, head)):
        return tail
    else:
        return oldHead


def main():
    tail = (0, 0)
    head = (0, 0)
    poses = ["0,0"]
    inpt = open("input.txt", "r").read()
#     inpt = """R 4
# U 4
# L 3
# D 1
# R 4
# D 1
# L 5
# R 2"""
    for line in inpt.split('\n'):
        [direction, distance] = line.split(' ')

        for _ in range(int(distance)):
            oldHead = tuple(head)

            # Moving up
            if(direction == 'U'):
                head = (head[0], head[1] + 1)
                pass
            # moving down
            if direction == 'D':
                head = (head[0], head[1] - 1)
                pass
            # moving left
            if direction == 'L':
                head = (head[0] - 1, head[1])
                pass
            # moving right
            if(direction == 'R'):
                head = (head[0] + 1, head[1])
                pass

            tail = move_tail(tail, head, oldHead)
            poses.append(str(tail[0]) + ',' + str(tail[1]))

    print(len(set(poses)))


if __name__ == "__main__":
    main()
