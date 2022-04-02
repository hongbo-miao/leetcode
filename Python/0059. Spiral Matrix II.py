# Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.
#
# Example 1:
#
# Input: n = 3
# Output: [[1,2,3],[8,9,4],[7,6,5]]
#
# Example 2:
#
# Input: n = 1
# Output: [[1]]
#
# Constraints:
#
# 1 <= n <= 20


# Directions
# Similar
# 54. Spiral Matrix
# 59. Spiral Matrix II
#
# When traversing the matrix in the spiral order, at any time we follow one out of the following four directions:
# RIGHT DOWN LEFT UP. Suppose we are working on a 5 x 3 matrix as such:
# 0  1  2  3  4  5
#    6  7  8  9 10
#   11 12 13 14 15
#
# Imagine a cursor starts off at (0, -1), i.e. the position at '0', then we can achieve the spiral order by doing
# the following:
# 1. Go right 5 times
# 2. Go down 2 times
# 3. Go left 4 times
# 4. Go up 1 times.
# 5. Go right 3 times
# 6. Go down 0 times -> quit
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[None] * n for _ in range(n)]
        dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        steps = [n, n - 1]
        dir = 0
        x = 0
        y = -1
        num = 1
        while steps[dir % 2] > 0:
            for _ in range(steps[dir % 2]):
                x += dirs[dir][0]
                y += dirs[dir][1]
                matrix[x][y] = num
                num += 1
            steps[dir % 2] -= 1
            dir = (dir + 1) % 4
        return matrix
