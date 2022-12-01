inp = open('input.txt').read().split('\n\n')

sums = []

for cal in inp:
    total = 0
    lines = cal.split('\n')
    inter = map(lambda x: int(x), lines)
    nums = list(inter)
    for num in nums:
        total += num
    sums.append(total)

top3 = sorted(sums, reverse=True)[:3]
print(top3[0] + top3[1] + top3[2])
