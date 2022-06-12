# Given a m x n binary matrix mat. In one step, you can choose one cell and flip it and all the four neighbors of it if they exist (Flip is changing 1 to 0 and 0 to 1). A pair of cells are called neighbors if they share one edge.
# Return the minimum number of steps required to convert mat to a zero matrix or -1 if you cannot.
# A binary matrix is a matrix with all cells equal to 0 or 1 only.
# A zero matrix is a matrix with all cells equal to 0.
#
# Example 1:
#
# Input: mat = [[0,0],[0,1]]
# Output: 3
# Explanation: One possible solution is to flip (1, 0) then (0, 1) and finally (1, 1) as shown.
#
# Example 2:
#
# Input: mat = [[0]]
# Output: 0
# Explanation: Given matrix is a zero matrix. We do not need to change it.
#
# Example 3:
#
# Input: mat = [[1,0,0],[1,0,0]]
# Output: -1
# Explanation: Given matrix cannot be a zero matrix.
#
# Constraints:
#
# m == mat.length
# n == mat[i].length
# 1 <= m, n <= 3
# mat[i][j] is either 0 or 1.

# BFS
# Time O(m * n * 2 ^ (m * n))
# Space O(2 ^ (m * n))
# https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/discuss/446342/JavaPython-3-Convert-matrix-to-int%3A-BFS-and-DFS-codes-w-explanation-comments-and-analysis.
class Solution:
    def minFlips(self, mat: List[List[int]]) -> int:
        # Note that (0, 0) is included which means flipping the cell itself
        dirs = [(0, 0), (0, 1), (0, -1), (1, 0), (-1, 0)]
        m, n = len(mat), len(mat[0])

        # Flip itself and all the four neighbors
        def flip(u, x, y):
            v = u
            for dx, dy in dirs:
                i, j = x + dx, y + dy
                if 0 <= i < m and 0 <= j < n:
                    v ^= 1 << (i * n + j)
            return v

        start = sum(
            val << (i * n + j) for i, row in enumerate(mat) for j, val in enumerate(row)
        )
        q = [start]
        seen = {start}
        step = 0
        while q:
            nodes = q.copy()
            q = []
            while nodes:
                u = nodes.pop(0)
                # Return step if the node is a zero matrix
                if not u:
                    return step
                for i in range(m):
                    for j in range(n):
                        v = flip(u, i, j)
                        if v not in seen:
                            q.append(v)
                            seen.add(v)
            step += 1
        return -1
