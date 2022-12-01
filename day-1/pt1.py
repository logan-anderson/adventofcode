inp = open('input.txt').read().split('\n\n')

highest = 0
for cal in inp:
    newHighest = 0
    lines = cal.split('\n')
    inter = map(lambda x: int(x), lines)
    nums = list(inter)
    for num in nums:
        newHighest += num
    if newHighest > highest:
        highest = newHighest
print(highest)
