# Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
#
# Example 1:
#
# Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
# Output: 4
#
# Example 2:
#
# Input: matrix = [["0","1"],["1","0"]]
# Output: 1
#
# Example 3:
#
# Input: matrix = [["0"]]
# Output: 0
#
# Constraints:
#
# m == matrix.length
# n == matrix[i].length
# 1 <= m, n <= 300
# matrix[i][j] is '0' or '1'.

# Dynamic Programming
# https://leetcode.com/problems/maximal-square/discuss/600149/Python-Thinking-Process-Diagrams-DP-Approach
#
# Time O(mn). Single pass - row x col (m=row; n=col)
# Space O(mn). Additional space for dp grid (don't need to worry about additional 1 row and col).
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_side = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == "1":
                    # Be careful of the indexing since dp has additional row and column
                    dp[i + 1][j + 1] = min(dp[i][j], dp[i + 1][j], dp[i][j + 1]) + 1
                    max_side = max(max_side, dp[i + 1][j + 1])
        return max_side ** 2
