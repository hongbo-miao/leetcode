# Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.
# A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
# - All the visited cells of the path are 0.
# - All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
# The length of a clear path is the number of visited cells of this path.
#
# Example 1:
#
# Input: grid = [[0,1],[1,0]]
# Output: 2
#
# Example 2:
#
# Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
# Output: 4
#
# Example 3:
#
# Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
# Output: -1
#
# Constraints:
#
# n == grid.length
# n == grid[i].length
# 1 <= n <= 100
# grid[i][j] is 0 or 1


class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if grid[0][0] or grid[n - 1][n - 1]:
            return -1
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1), (-1, -1), (1, 1), (1, -1), (-1, 1)]
        q = [(0, 0)]
        seen = {(0, 0)}
        step = 1
        while q:
            nodes = q.copy()
            q = []
            while nodes:
                i, j = nodes.pop(0)
                if i == n - 1 and j == n - 1:
                    return step
                for dx, dy in dirs:
                    x = i + dx
                    y = j + dy
                    if (
                        0 <= x < n
                        and 0 <= y < n
                        and grid[x][y] == 0
                        and (x, y) not in seen
                    ):
                        seen.add((x, y))
                        q.append((x, y))
            step += 1
        return -1
