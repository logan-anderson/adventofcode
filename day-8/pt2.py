from typing import List


class Tree:
    def __init__(self, value: int):
        self.visible = False
        self.value: int = value

    def __str__(self) -> str:
        return f"{self.value} ({self.visible})"

    def setVisible(self, visible: bool):
        self.visible = visible


def seeingDept(current: Tree, other: List[Tree]):
    if(len(other) == 0):
        return 0
    depth = 0
    for t in other:
        if current.value > t.value:
            depth += 1
        else:
            depth += 1
            break
    return depth


def isTallerThenAll(current: Tree, other: List[Tree]):
    isTaller = True
    for t in other:
        if t.value >= current.value:
            isTaller = False
            break
    return isTaller


def printBoard(board: List[List[Tree]]):
    for row in board:
        for tree in row:
            print(tree, end=' ')
        print()


def main():
    board: List[List[Tree]] = []
    inpt = """30373
25512
65332
33549
35390"""
    inpt = open('input.txt').read()
    maxIndex = len(inpt.split('\n')[0].strip()) - 1

    # set up the board
    for rowNum, line in enumerate(inpt.split('\n')):
        row = []
        for colNum, val in enumerate(line.strip()):
            t = Tree(int(val))
            row.append(t)

        board.append(row)

    # iterate through the board

    maxScore = 0

    for row in range(maxIndex + 1):
        for col in range(maxIndex + 1):
            current = board[row][col]
            if current.visible:
                continue

            # iterate up and see if the node is visible
            canBeSeenFromTop = []
            for i in range(row - 1, -1, -1):
                canBeSeenFromTop.append(board[i][col])

            # iterate down and see if the node is visible
            canBeSeenFromBottom = []
            for i in range(row + 1, maxIndex+1):
                canBeSeenFromBottom.append(board[i][col])

            # # iterate right and see if the node is visible
            canBeSeenFromRight = []
            for i in range(col + 1, maxIndex+1):
                canBeSeenFromRight.append(board[row][i])

            # # iterate left and see if the node is visible
            canBeSeenFromLeft = []
            for i in range(col - 1, -1, -1):
                canBeSeenFromLeft.append(board[row][i])

            score = seeingDept(current, canBeSeenFromRight) * seeingDept(current, canBeSeenFromLeft) * \
                seeingDept(current, canBeSeenFromTop) * \
                seeingDept(current, canBeSeenFromBottom)

            if(score > maxScore):
                print(current, score)
                maxScore = score

    printBoard(board)
    print(maxScore)


if __name__ == "__main__":
    main()
