# Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2. You may assume that multiplication is always possible.
#
# Example 1:
#
# Input: mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
# Output: [[7,0,0],[-7,0,3]]
#
# Example 2:
#
# Input: mat1 = [[0]], mat2 = [[0]]
# Output: [[0]]
#
# Constraints:
#
# m == mat1.length
# k == mat1[i].length == mat2.length
# n == mat2[i].length
# 1 <= m, n, k <= 100
# -100 <= mat1[i][j], mat2[i][j] <= 100

# 1) Naive Iteration
# Time O(mkn)
# Space O(1)
# We iterate over all m⋅k elements of the matrix mat1mat1.
# For each element of matrix mat1mat1, we iterate over all n columns of the matrix mat2.
# Thus, it leads to a time complexity of m⋅k⋅n.
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        # Product matrix.
        res = [[0] * len(mat2[0]) for _ in range(len(mat1))]

        for row_index, row_elements in enumerate(mat1):
            for element_index, row_element in enumerate(row_elements):
                for col_index, col_element in enumerate(mat2[element_index]):
                    res[row_index][col_index] += row_element * col_element
        return res


# 2) Naive Iteration with Optimization
# Time O(mkn)
# Space O(1)
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        # Product matrix.
        res = [[0] * len(mat2[0]) for _ in range(len(mat1))]

        for row_index, row_elements in enumerate(mat1):
            for element_index, row_element in enumerate(row_elements):
                # Optimization: if current element of mat1 is non-zero then iterate over all columns of mat2.
                if row_element:
                    for col_index, col_element in enumerate(mat2[element_index]):
                        res[row_index][col_index] += row_element * col_element
        return res


# 3) List of Lists
# Let m and k represent the number of rows and columns in mat1, respectively.
# Likewise, let k and n represent the number of rows and columns in mat2, respectively.
#
# Time O(mkn)
# Space O(mk+kn)
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        def compress_matrix(matrix: List[List[int]]) -> List[List[int]]:
            rows, cols = len(matrix), len(matrix[0])
            compressed_matrix = [[] for _ in range(rows)]
            for row in range(rows):
                for col in range(cols):
                    if matrix[row][col]:
                        compressed_matrix[row].append([matrix[row][col], col])
            return compressed_matrix

        m = len(mat1)
        k = len(mat1[0])
        n = len(mat2[0])

        # Store the non-zero values of each matrix.
        A = compress_matrix(mat1)
        B = compress_matrix(mat2)

        res = [[0] * n for _ in range(m)]
        for mat1_row in range(m):
            # Iterate on all current 'row' non-zero elements of mat1.
            for element1, mat1_col in A[mat1_row]:
                # Multiply and add all non-zero elements of mat2
                # where the row is equal to col of current element of mat1.
                for element2, mat2_col in B[mat1_col]:
                    res[mat1_row][mat2_col] += element1 * element2
        return res
