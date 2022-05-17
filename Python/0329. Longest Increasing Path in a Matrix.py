# Given an m x n integers matrix, return the length of the longest increasing path in matrix.
# From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).
#
# Example 1:
#
# Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
# Output: 4
# Explanation: The longest increasing path is [1, 2, 6, 9].
#
# Example 2:
#
# Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
# Output: 4
# Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
#
# Example 3:
#
# Input: matrix = [[1]]
# Output: 1
#
# Constraints:
#
# m == matrix.length
# n == matrix[i].length
# 1 <= m, n <= 200
# 0 <= matrix[i][j] <= 2^31 - 1


# Backtracking + Memoization
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        cache = [[None] * n for _ in range(m)]

        def go(x, y):
            if cache[x][y] is not None:
                return cache[x][y]
            mx = 1
            for dx, dy in dirs:
                i = x + dx
                j = y + dy
                if 0 <= i < m and 0 <= j < n and matrix[i][j] > matrix[x][y]:
                    mx = max(mx, go(i, j) + 1)
            cache[x][y] = mx
            return mx

        mx = 0
        for i in range(m):
            for j in range(n):
                mx = max(mx, go(i, j))
        return mx
