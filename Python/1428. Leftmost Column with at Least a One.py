# A row-sorted binary matrix means that all elements are 0 or 1 and each row of the matrix is sorted in non-decreasing order.
# Given a row-sorted binary matrix binaryMatrix, return the index (0-indexed) of the leftmost column with a 1 in it. If such an index does not exist, return -1.
# You can't access the Binary Matrix directly. You may only access the matrix using a BinaryMatrix interface:
# - BinaryMatrix.get(row, col) returns the element of the matrix at index (row, col) (0-indexed).
# - BinaryMatrix.dimensions() returns the dimensions of the matrix as a list of 2 elements [rows, cols], which means the matrix is rows x cols.
# Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.
# For custom testing purposes, the input will be the entire binary matrix mat. You will not have access to the binary matrix directly.
#
# Example 1:
#
# Input: mat = [[0,0],[1,1]]
# Output: 0
#
# Example 2:
#
# Input: mat = [[0,0],[0,1]]
# Output: 1
#
# Example 3:
#
# Input: mat = [[0,0],[0,0]]
# Output: -1
#
# Constraints:
#
# rows == mat.length
# cols == mat[i].length
# 1 <= rows, cols <= 100
# mat[i][j] is either 0 or 1.
# mat[i] is sorted in non-decreasing order.


# """
# This is BinaryMatrix's API interface.
# You should not implement it, or speculate about its implementation
# """
# class BinaryMatrix(object):
#    def get(self, row: int, col: int) -> int:
#    def dimensions(self) -> list[]:


# Time O(m + n), m is number of rows and n is number of columns
# Space O(1)
#
# Using the information that the rows are sorted, if we start searching from
# the right top corner(1st row, last column) and every time when we get a 1,
# as the row is sorted in non-decreasing order, there is a chance of getting
# 1 in the left column, so go to previous column in the same row. And if we
# get 0, there is no chance that in that row we can find a 1, so go to next
# row. Here is the implementation:
class Solution:
    def leftMostColumnWithOne(self, binaryMatrix: "BinaryMatrix") -> int:
        m, n = binaryMatrix.dimensions()

        i, j = 0, n - 1
        leftmost_col = -1
        while i < m and j >= 0:
            if binaryMatrix.get(i, j) == 1:
                leftmost_col = j
                j -= 1
            else:
                i += 1
        return leftmost_col
