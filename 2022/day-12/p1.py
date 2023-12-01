from sys import maxsize
from typing import List
inpt = open('input.txt').read().splitlines()
# inpt = open('example.txt').read().splitlines()


class Node:
    def __init__(self, name: str, pos: tuple[int, int] = None):
        self.name = name
        self.distance = maxsize
        self.pos: tuple[int, int] = pos
        self.visited = False

    def __str__(self) -> str:
        return f"Node({self.name}, {self.distance}, {self.pos}))"

    def set_distance(self, distance: int):
        self.visited = True
        self.distance = distance

    def set_position(self, x: int, y: int):
        self.pos = (x, y)


board: list[list[Node]] = [[Node(name=node)
                           for node in list(line)] for line in inpt]


def get_neighbours(node: Node) -> list[Node]:
    # get the neighbours of the node on the board
    x, y = node.pos
    neighbours: list[Node] = []
    if x > 0:
        neighbours.append(board[x-1][y])
    if x < len(board)-1:
        neighbours.append(board[x+1][y])
    if y > 0:
        neighbours.append(board[x][y-1])
    if y < len(board[0])-1:
        neighbours.append(board[x][y+1])

    def filter_func(node: Node) -> bool:
        c = current
        n = node

        can_visit = ord(n.name) - ord(c.name) <= 1
        return not node.visited and can_visit

    return filter(filter_func, neighbours)


allNodes = set()
startingNode: Node = None
endingNode: Node = None
for x, row in enumerate(board):
    for y, node in enumerate(row):
        node.set_position(x, y)
        if node.name == 'S':
            startingNode = node
            node.name = 'a'
            # starting distance is 0
            node.set_distance(0)
        if node.name == 'E':
            node.name = 'z'
            endingNode = node
        allNodes.add(node)

print("starting at ", startingNode)
print("ending at ", endingNode)


isDone = False

while not isDone or len(allNodes) == 0:
    if len(allNodes) == 0:
        break
    current = min(allNodes, key=lambda n: n.distance)
    neighbours = get_neighbours(current)
    for node in neighbours:
        node.set_distance(current.distance + 1)
        if node == endingNode:
            isDone = True

    allNodes.remove(current)

print(endingNode.distance)
