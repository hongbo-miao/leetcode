# You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m-1][n-1]). The robot can only move either down or right at any point in time.
# An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.
# Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
# The testcases are generated so that the answer will be less than or equal to 2 * 109.
#
# Example 1:
#
# Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
# Output: 2
# Explanation: There is one obstacle in the middle of the 3x3 grid above.
# There are two ways to reach the bottom-right corner:
# 1. Right -> Right -> Down -> Down
# 2. Down -> Down -> Right -> Right
#
# Example 2:
#
# Input: obstacleGrid = [[0,1],[0,0]]
# Output: 1
#
# Constraints:
#
# m == obstacleGrid.length
# n == obstacleGrid[i].length
# 1 <= m, n <= 100
# obstacleGrid[i][j] is 0 or 1.


# Dynamic Programming
# Time O(mn)
# Space O(mn)
#
# Algorithm
#
# 1. If the first cell i.e. obstacleGrid[0,0] contains 1, this means there is
# an obstacle in the first cell. Hence the robot won't be able to make any
# move and we would return the number of ways as 0.
#
# 2. Otherwise, if obstacleGrid[0,0] has a 0 originally we set it to 1 and
# move ahead.
#
# 3. Iterate the first row. If a cell originally contains a 1, this means the
# current cell has an obstacle and shouldn't contribute to any path. Hence,
# set the value of that cell to 0. Otherwise, set it to the value of previous
# cell i.e. obstacleGrid[i,j] = obstacleGrid[i,j-1]
#
# 4. Iterate the first column. If a cell originally contains a 1, this means
# the current cell has an obstacle and shouldn't contribute to any path.
# Hence, set the value of that cell to 0. Otherwise, set it to the value of
# previous cell i.e. obstacleGrid[i,j] = obstacleGrid[i-1,j]
#
# 5. Now, iterate through the array starting from cell obstacleGrid[1,1]. If
# a cell originally doesn't contain any obstacle then the number of ways of
# reaching that cell would be the sum of number of ways of reaching the cell
# above it and number of ways of reaching the cell to the left of it.
# obstacleGrid[i,j] = obstacleGrid[i-1,j] + obstacleGrid[i,j-1]
#
# 6. If a cell contains an obstacle set it to 0 and continue. This is done to
# make sure it doesn't contribute to any other path.
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])

        dp = [[0] * n for _ in range(m)]

        # Initialize the first row and column
        # "* mask" means if there is an obstacle in the cell, set it to 0, otherwise set it to 1
        dp[0][0] = 1 - obstacleGrid[0][0]
        for i in range(1, m):
            mask = 1 - obstacleGrid[i][0]
            dp[i][0] = dp[i - 1][0] * mask
        for j in range(1, n):
            mask = 1 - obstacleGrid[0][j]
            dp[0][j] = dp[0][j - 1] * mask

        for i in range(1, m):
            for j in range(1, n):
                mask = 1 - obstacleGrid[i][j]
                dp[i][j] = dp[i - 1][j] * mask + dp[i][j - 1] * mask
        return dp[-1][-1]
