# Given an m x n matrix, return all elements of the matrix in spiral order.
#
# Example 1:
#
# Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
# Output: [1,2,3,6,9,8,7,4,5]
#
# Example 2:
#
# Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
# Output: [1,2,3,4,8,12,11,10,9,5,6,7]
#
# Constraints:
#
# m == matrix.length
# n == matrix[i].length
# 1 <= m, n <= 10
# -100 <= matrix[i][j] <= 100


# Directions
# Similar
# 54. Spiral Matrix
# 59. Spiral Matrix II
#
# https://leetcode.com/problems/spiral-matrix/discuss/20573/A-concise-C++-implementation-based-on-Directions
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
#
# Notice that the directions we choose always follow the order 'right -> down -> left -> up', and for horizontal
# movements, the number of shifts follows: { 5, 4, 3 }, and vertical movements follows { 2, 1, 0 }.
# Thus, we can make use of a direction matrix that records the offset for all directions, then an array of two
# elements that stores the number of shifts for horizontal and vertical movements, respectively. This way, we really
# just need one for loop instead of four.
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        steps = [len(matrix[0]), len(matrix) - 1]
        dir = 0
        x = 0
        y = -1
        res = []
        while steps[dir % 2] > 0:
            for _ in range(steps[dir % 2]):
                x += dirs[dir][0]
                y += dirs[dir][1]
                res.append(matrix[x][y])
            steps[dir % 2] -= 1
            dir = (dir + 1) % 4
        return res
