# Given two integers a and b, return the sum of the two integers without using the operators + and -.
#
# Example 1:
#
# Input: a = 1, b = 2
# Output: 3
#
# Example 2:
#
# Input: a = 2, b = 3
# Output: 5
#
# Constraints:
#
# -1000 <= a, b <= 1000


# 1)
class Solution:
    def getSum(self, a: int, b: int) -> int:
        l = [a, b]
        return sum(l)


# 2) Bit
# https://leetcode.com/problems/sum-of-two-integers/discuss/776952/Python-BEST-LeetCode-371-Explanation-for-Python
