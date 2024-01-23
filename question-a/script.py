def do_lines_overlap(line1, line2):
    x1, x2 = line1
    x3, x4 = line2

    # Check for overlap
    if max(x1, x3) <= min(x2, x4):
        return True
    else:
        return False

# Take input from the user for line1
x1 = float(input("Enter the x-coordinate for the starting point of line1: "))
x2 = float(input("Enter the x-coordinate for the ending point of line1: "))
line1 = (x1, x2)

# Take input from the user for line2
x3 = float(input("Enter the x-coordinate for the starting point of line2: "))
x4 = float(input("Enter the x-coordinate for the ending point of line2: "))
line2 = (x3, x4)

# Check for overlap
overlap_result = do_lines_overlap(line1, line2)

# Display the result
if overlap_result:
    print("The lines overlap.")
else:
    print("The lines do not overlap.")
