# You are given an m x n binary matrix grid.
# In one operation, you can choose any row or column and flip each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).
# Return true if it is possible to remove all 1's from grid using any number of operations or false otherwise.
#
# Example 1:
#
# Input: grid = [[0,1,0],[1,0,1],[0,1,0]]
# Output: true
# Explanation: One possible way to remove all 1's from grid is to:
# - Flip the middle row
# - Flip the middle column
#
# Example 2:
#
# Input: grid = [[1,1,0],[0,0,0],[0,0,0]]
# Output: false
# Explanation: It is impossible to remove all 1's from grid.
#
# Example 3:
#
# Input: grid = [[0]]
# Output: true
# Explanation: There are no 1's in grid.
#
# Constraints:
#
# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 300
# grid[i][j] is either 0 or 1.


# https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips/discuss/1695472/Python-3-or-Simple-Explanation
# 1. For each row or col, we only need to flip it once or do not flip.
#   (Flip 2, 4, 6,.. times is same as not flip; flip 1, 3, 5, .. times is same as flip once);
# 2. The order of flipping does not matter.
# 3. If after some flips, we can get the all-zero matrix.
#   Then for each pair of rows (or cols), they must be exactly same (every element is the same) or completely different (every element is different).
class Solution:
    def removeOnes(self, grid: List[List[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        row0 = grid[0]
        row0_flip = [1 - x for x in grid[0]]
        for row in range(1, m):
            if grid[row] != row0 and grid[row] != row0_flip:
                return False
        return True
