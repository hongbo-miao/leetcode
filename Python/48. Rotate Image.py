# You are given an n x n 2D matrix representing an image.
#
# Rotate the image by 90 degrees (clockwise).
#
# Note:
#
# You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
#
# Example 1:
#
#   Given input matrix =
#   [
#     [1,2,3],
#     [4,5,6],
#     [7,8,9]
#   ],
#
#   rotate the input matrix in-place such that it becomes:
#   [
#     [7,4,1],
#     [8,5,2],
#     [9,6,3]
#   ]
#
# Example 2:
#
#   Given input matrix =
#   [
#     [ 5, 1, 9,11],
#     [ 2, 4, 8,10],
#     [13, 3, 6, 7],
#     [15,14,12,16]
#   ],
#
#   rotate the input matrix in-place such that it becomes:
#   [
#     [15,13, 2, 5],
#     [14, 3, 4, 1],
#     [12, 6, 8, 9],
#     [16, 7,10,11]
#   ]


class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """

        # Reverse up to down, then swap the symmetry
        #
        # Idea:
        # To clockwise rotate, reverse up to down, then swap the symmetry
        # (To anticlockwise rotate, reverse left to right, then swap the symmetry)
        #
        # Example:
        # 1 2 3    7 8 9    7 4 1
        # 4 5 6 -> 4 5 6 -> 8 5 2
        # 7 8 9    1 2 3    9 6 3

        # Note zip() create additional space to hold and return the result matrix
        matrix[::] = zip(*matrix[::-1])
