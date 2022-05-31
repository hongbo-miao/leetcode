# You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
# Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.
#
# Example 1:
#
# Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
# Output: 6
# Explanation:
# The shortest path without eliminating any obstacle is 10.
# The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
#
# Example 2:
#
# Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
# Output: -1
# Explanation: We need to eliminate at least two obstacles to find such a walk.
#
# Constraints:
#
# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 40
# 1 <= k <= m * n
# grid[i][j] is either 0 or 1.
# grid[0][0] == grid[m - 1][n - 1] == 0


class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        # Optimization:
        #   If we have sufficient quotas to eliminate the obstacles,
        #   the shortest distance is the Manhattan distance.
        if k >= m + n - 2:
            return m + n - 2

        state = (0, 0, k)  # (row, col, remaining quota to eliminate obstacles)
        q = [(0, state)]  # (steps, state)
        seen = {state}

        while q:
            steps, (x0, y0, k0) = q.pop(0)
            if (x0, y0) == (m - 1, n - 1):
                return steps

            for dx, dy in dirs:
                x1 = x0 + dx
                y1 = y0 + dy
                if 0 <= x1 < m and 0 <= y1 < n:
                    k1 = k0 - grid[x1][y1]
                    state1 = (x1, y1, k1)
                    if k1 >= 0 and state1 not in seen:
                        q.append((steps + 1, state1))
                        seen.add(state1)
        return -1
