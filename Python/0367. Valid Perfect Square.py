# Given a positive integer num, write a function which returns True if num is a perfect square else False.
# Follow up: Do not use any built-in library function such as sqrt.
#
# Example 1:
#
# Input: num = 16
# Output: true
#
# Example 2:
#
# Input: num = 14
# Output: false
#
# Constraints:
#
# 1 <= num <= 2^31 - 1


# Binary Search
# Time O(log n)
# Space O(1)
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        l = 0
        r = num
        while l <= r:
            m = (l + r) // 2
            if m ** 2 == num:
                return True
            elif m ** 2 < num:
                l = m + 1
            else:
                r = m - 1
        return False
