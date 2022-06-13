# Given a rectangle of size n x m, return the minimum number of integer-sided squares that tile the rectangle.
#
# Example 1:
#
# Input: n = 2, m = 3
# Output: 3
# Explanation: 3 squares are necessary to cover the rectangle.
# 2 (squares of 1x1)
# 1 (square of 2x2)
#
# Example 2:
#
# Input: n = 5, m = 8
# Output: 5
#
# Example 3:
#
# Input: n = 11, m = 13
# Output: 6
#
# Constraints:
# 1 <= n, m <= 13


# Notion

# 1) Dynamic Programming
# Cannot use because of example 3

# 2) Skyline
# https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares/discuss/414260/8ms-Memorized-Backtrack-Solution-without-special-case!
from functools import cache


class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        @cache
        def dp(skyline):
            # Convert to list
            skyline = list(skyline)
            min_h = min(skyline)

            # All skylines are the same height n, which means filled out
            if n == min_h:
                return 0

            start = skyline.index(min_h)
            res = float("inf")
            for end in range(start, m):
                if skyline[end] == min_h:
                    tile_width = end - start + 1
                    if min_h + tile_width <= n:
                        skyline[start : end + 1] = [min_h + tile_width] * tile_width
                        # Convert back to tuple
                        res = min(res, dp(tuple(skyline)))
                # Break when sees a different height
                else:
                    break
            return res + 1

        # To cache, it has to be immutable, so we use tuple instead of list
        return dp(tuple([0] * m))
