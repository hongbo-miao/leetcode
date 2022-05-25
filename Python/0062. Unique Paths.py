# There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
# Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
# The test cases are generated so that the answer will be less than or equal to 2 * 10^9.
#
# Example 1:
#
# Input: m = 3, n = 7
# Output: 28
#
# Example 2:
#
# Input: m = 3, n = 2
# Output: 3
# Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
# 1. Right -> Down -> Down
# 2. Down -> Down -> Right
# 3. Down -> Right -> Down
#
# Constraints:
#
# 1 <= m, n <= 100


# 1) Dynamic programming
# Time O(mn)
# Space O(mn)
#
# Example
# 1   1  (1)  1  1  1
# 1  (2) (3)  4  5  6  (e.g. 3 = 1 + 2)
# 1   3   6  10 15 21
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[-1][-1]


# 2) Dynamic programming (optimization)
# Time O(mn)
# Space O(n)
#
# Example
# i j dp
# 1 1 [1, 2, 1, 1, 1, 1]
# 1 2 [1, 2, 3, 1, 1, 1]
# 1 3 [1, 2, 3, 4, 1, 1]
# 1 4 [1, 2, 3, 4, 5, 1]
# 1 5 [1, 2, 3, 4, 5, 6]
# 2 1 [1, 3, 3, 4, 5, 6]
# 2 2 [1, 3, 6, 4, 5, 6]
# 2 3 [1, 3, 6, 10, 5, 6]
# 2 4 [1, 3, 6, 10, 15, 6]
# 2 5 [1, 3, 6, 10, 15, 21]
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]


# 3) Math - Combination
# https://leetcode.com/explore/learn/card/dynamic-programming/634/matrix-path-based-dp/4129/
# Time O(m)
# Space O(1)
from math import factorial


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        return factorial(m + n - 2) // factorial(n - 1) // factorial(m - 1)
