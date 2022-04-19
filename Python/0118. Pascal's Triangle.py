# Given an integer numRows, return the first numRows of Pascal's triangle.
# In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
#
# Example 1:
#
# Input: numRows = 5
# Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
#
# Example 2:
#
# Input: numRows = 1
# Output: [[1]]
#
# Constraints:
#
# 1 <= numRows <= 30


# Dynamic programming
# Time O(numRows^2), consider how many overall loop iterations there are. The outer loop obviously runs numRows times, but for each iteration of the outer loop, the inner loop runs rowNum times
#   Therefore, the overall number of triangle updates that occur is 1 + 2 + 3 + ... + numRows, which, according to Gauss' formula, is (1 + numRows) * numRows / 2 -> O(numRows^2)
# Space O(numRows^2), we need to store each number that we update in triangle, so the space requirement is the same as the time complexity
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        if numRows == 0:
            return []
        if numRows == 1:
            return [[1]]
        if numRows == 2:
            return [[1], [1, 1]]

        res = [[1], [1, 1]]
        for i in range(2, numRows):
            row = [1]
            for j in range(1, i):
                row.append(res[i - 1][j - 1] + res[i - 1][j])
            row.append(1)
            res.append(row)
        return res
