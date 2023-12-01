

def main():
    inp = open('input.txt').read()
#     inp = """move 1 from 2 to 1
# move 3 from 1 to 3
# move 2 from 2 to 1
# move 1 from 1 to 2"""
    # puz = [['Z', 'N'], ['M', 'C', 'D'], ['P']]
    puz = [
        ['G', 'W', 'L', 'J', 'B', 'R', 'T', 'D'],
        ['C',
         'W',
         'S'],
        ['M',
         'T',
         'Z',
         'R'],
        ['V',
         'P',
         'S',
         'H',
         'C',
         'T',
         'D'],
        ['Z',
         'D',
         'L',
         'T',
         'P',
         'G'],
        ['D',
         'C',
         'Q',
         'J',
         'Z',
         'R',
         'B',
         'F'],
        ['R',
         'T',
         'F',
         'M',
         'J',
         'D',
         'B',
         'S'],
        ['M',
         'V',
         'T',
         'B',
         'R',
         'H',
         'L'],
        ['V',
         'S',
         'D',
         'P',
         'Q']

    ]
    for row in puz:
        row.reverse()

    lines = inp.split('\n')
    for line in lines:
        nums = [int(x) for x in line.replace('move ', '').replace(
            ' from ', ' ').replace(' to ', ' ').split(' ')]
        how_many = nums[0]
        from_num = nums[1]
        to_num = nums[2]
        for _ in range(how_many):
            puz[to_num-1].append(puz[from_num-1].pop())

    # for i in puz:
    #     print('\t'.join(map(str, i)))

    for i in puz:
        print(i[len(i)-1], end='')
    print()


if __name__ == '__main__':
    main()
