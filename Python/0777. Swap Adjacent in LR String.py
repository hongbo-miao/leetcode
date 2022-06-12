# In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string end, return True if and only if there exists a sequence of moves to transform one string to the other.
#
# Example 1:
#
# Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
# Output: true
# Explanation: We can transform start to end following these steps:
# RXXLRXRXL ->
# XRXLRXRXL ->
# XRLXRXRXL ->
# XRLXXRRXL ->
# XRLXXRRLX
#
# Example 2:
#
# Input: start = "X", end = "L"
# Output: false
#
# Constraints:
#
# 1 <= start.length <= 10^4
# start.length == end.length
# Both start and end will only consist of characters in 'L', 'R', and 'X'.


class Solution:
    def canTransform(self, start: str, end: str) -> bool:
        # Non-X of 2 strings have to be same
        if start.replace("X", "") != end.replace("X", ""):
            return False

        i = j = 0
        while i < len(start) and j < len(end):
            # Get the non-X positions of 2 strings
            while i < len(start) and start[i] == "X":
                i += 1
            while j < len(end) and end[j] == "X":
                j += 1

            # If both pointers reach the end, the strings are transformable
            if i == len(start) and j == len(end):
                return True
            elif i == len(start) or j == len(end):
                return False

            if start[i] != end[j]:
                return False

            # If the character is 'L', it can only be moved to the left
            # i should be >= j
            if start[i] == "L" and j > i:
                return False
            # If the character is 'R', it can only be moved to the right
            # j should be >= i
            elif start[i] == "R" and i > j:
                return False

            i += 1
            j += 1
        return True
