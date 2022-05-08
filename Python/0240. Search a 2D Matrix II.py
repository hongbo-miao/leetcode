# Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:
#
# - Integers in each row are sorted in ascending from left to right.
# - Integers in each column are sorted in ascending from top to bottom.
#
# Example 1:
#
# Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
# Output: true
#
# Example 2:
#
# Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
# Output: false
#
# Constraints:
#
# m == matrix.length
# n == matrix[i].length
# 1 <= n, m <= 300
# -10^9 <= matrix[i][j] <= 10^9
# All the integers in each row are sorted in ascending order.
# All the integers in each column are sorted in ascending order.
# -10^9 <= target <= 10^9

# 1) Recursion
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix:
            return False

        def go(i, j):
            if (
                i >= len(matrix)
                or j >= len(matrix[0])
                or matrix[i][j] == float("inf")  # visited
                or matrix[i][j] > target
            ):
                return False

            if matrix[i][j] == target:
                return True

            matrix[i][j] = float("inf")  # mark visited
            return go(i + 1, j) or go(i, j + 1)

        return go(0, 0)


# 2) Search from top right corner
#
# Similar
# 74. Search a 2D Matrix
#
# Time O(m + n), rule out one row or one column each time
# Space O(1)
#
# Idea
#
# Like tree: https://leetcode.com/problems/search-a-2d-matrix-ii/discuss/66140/My-concise-O(m+n)-Java-solution/68155
# We start search the matrix from top right corner, # initialize the current position to top right corner.
# - If the target is greater than the value in current position,
#   then the target can not be in entire row of current position because the row is sorted.
# - If the target is less than the value in current position,
#   then the target can not in the entire column because the column is sorted too.
# We can rule out one row or one column each time, so the time complexity is O(m + n).
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix:
            return False

        m = len(matrix)
        n = len(matrix[0])

        i = 0
        j = n - 1
        while j >= 0 and i < m:
            if matrix[i][j] == target:
                return True
            elif matrix[i][j] < target:
                i += 1
            else:
                j -= 1
        return False
