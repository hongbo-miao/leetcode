# Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
# An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
#
# Example 1:
#
# Input: grid = [
#   ["1","1","1","1","0"],
#   ["1","1","0","1","0"],
#   ["1","1","0","0","0"],
#   ["0","0","0","0","0"]
# ]
# Output: 1
#
# Example 2:
#
# Input: grid = [
#   ["1","1","0","0","0"],
#   ["1","1","0","0","0"],
#   ["0","0","1","0","0"],
#   ["0","0","0","1","1"]
# ]
# Output: 3
#
# Constraints:
#
# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 300
# grid[i][j] is '0' or '1'.


# DFS
# Time O(M * N) where M is the number of rows and N is the number of columns.
# Space O(M * N). Worst case O(M * N) in case that the grid map is filled with lands where DFS goes by M * N deep.
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def go(x, y):
            if 0 <= x < m and 0 <= y < n and grid[x][y] == "1":
                grid[x][y] = "0"
                for dx, dy in dirs:
                    go(x + dx, y + dy)

        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1":
                    go(i, j)
                    count += 1
        return count
