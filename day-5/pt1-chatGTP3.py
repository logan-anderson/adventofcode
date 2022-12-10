# This is the output of a conversation from chatGTP3

with open("input-real.txt") as f:
    # Read the lines from the file
    lines = f.readlines()

# Initialize the stacks and the procedure
stacks = []
procedure = []

# Parse the lines in the input file
for line in lines:
    # Ignore empty lines
    if line.strip() == "":
        continue

    # Parse the stacks
    if line[0] == "[":
        # Split the line by spaces to get the crates in the stack
        crates = line.split()
        # Remove the square brackets from the crate names
        crates = [crate[1:-1] for crate in crates]
        # Add the stack to the list of stacks
        stacks.append(crates)
    # Parse the instructions
    else:
        # Split the line by spaces to get the words in the instruction
        words = line.split()
        # Extract the source stack, destination stack, and number of crates from the instruction
        src, dest, num_crates = int(words[3]), int(words[5]), int(words[1])
        # Add the instruction to the procedure
        procedure.append((src, dest, num_crates))

# Iterate through the instructions in the procedure
for src, dest, num_crates in procedure:
    # Move crates from the source stack to the destination stack
    for _ in range(num_crates):
        crates = stacks[src - 1]
        crate = crates.pop()
        stacks[dest - 1].append(crate)

# Output the top crates of each stack
for i, stack in enumerate(stacks):
    print(f"Top crate on stack {i + 1}: {stack[-1]}")
