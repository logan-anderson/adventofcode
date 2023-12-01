from typing import List, Dict, Tuple, Set, Optional


class Node:
    def __str__(self) -> str:
        childrenSts = ", ".join([str(node) for node in self.children])
        return f"Name: {self.name} Type: {self.type} {self.size} children: {childrenSts}\n"

    def __init__(self, name: str = "", type: str = "", size: int = 0):
        self.name: str = name
        self.type: str = type
        self.size: int = size
        self.parent: Node = None
        self.children: List[Node] = []

    def add_parent(self, parent):
        self.parent = parent

    def add_child(self, child):
        self.children.append(child)


class Tree:
    def __str__(self) -> str:
        return str(self.root)

    def __init__(self, root: Node):
        self.nodes: Dict = {}
        self.root: Node = root


def get_total_size(node: Node, accum:  List[Node]) -> int:
    sums: List[int] = []
    for c in node.children:
        total = get_total_size(c, accum)
        if(total <= 100000):
            accum.append(c)
        sums.append(total)
    return node.size + sum(sums)


inpt = open('input.txt').read()

# inpt = """$ cd /
# $ ls
# dir a
# 14848514 b.txt
# 8504156 c.dat
# dir d
# $ cd a
# $ ls
# dir e
# 29116 f
# 2557 g
# 62596 h.lst
# $ cd e
# $ ls
# 584 i
# $ cd ..
# $ cd ..
# $ cd d
# $ ls
# 4060174 j
# 8033020 d.log
# 5626152 d.ext
# 7214296 k
# """

cmds = inpt.split('$ ')

rootNode = Node(name='/', type='dir', size=0)

tree = Tree(root=rootNode)

currentNode: Node = rootNode


# Make the tree
for cmd in cmds:
    if cmd == '':
        continue
    lines = cmd.split('\n')
    cmd = lines[0]  # cd / or ls
    if cmd == 'cd /':
        currentNode = rootNode
        continue
    if cmd == 'cd ..':
        currentNode = currentNode.parent
        continue

    # Check this
    if cmd.startswith('cd '):
        dirName = cmd[3:]
        for child in currentNode.children:
            if child.name == dirName:
                currentNode = child
                break
        continue

    if cmd.startswith('ls'):
        for line in lines[1:]:
            if line == '' or not line:
                continue
            if line.startswith('dir '):
                dirName = line[4:]
                newNode = Node(name=dirName, type='dir', size=0)
                currentNode.add_child(newNode)
                newNode.add_parent(currentNode)
            else:
                fileSize, fileName = line.split(' ')
                newNode = Node(name=fileName, type='file', size=int(fileSize))
                currentNode.add_child(newNode)
                newNode.add_parent(currentNode)
        continue

dirsWithTotalSizeGreater: List[Node] = []

# Find the dirs with total size greater than 100,000

for node in tree.root.children:
    totalSize = get_total_size(node, accum=dirsWithTotalSizeGreater)
    if totalSize <= 100000:
        dirsWithTotalSizeGreater.append(node)

sums = []
for node in dirsWithTotalSizeGreater:
    if(node.type.strip() == 'dir'):
        print(node.name)
        sums.append(get_total_size(node, []))
print(sum(sums))
