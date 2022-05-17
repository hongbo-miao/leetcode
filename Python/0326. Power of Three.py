# Given an integer n, return true if it is a power of three. Otherwise, return false.
# An integer n is a power of three, if there exists an integer x such that n == 3x.
#
# Example 1:
#
# Input: n = 27
# Output: true
#
# Example 2:
#
# Input: n = 0
# Output: false
#
# Example 3:
#
# Input: n = 9
# Output: true
#
# Constraints:
#
# -2^31 <= n <= 2^31 - 1


# 1)
# Time O(log n). In our case that is O(log3 n). The number of divisions is given by that logarithm.
# Space O(1)
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        if n <= 0:
            return False
        while n % 3 == 0:
            n /= 3
        return n == 1


# 2) Mathematics
# n = 3^i
# i = log3(n)
# i = log10(n) / log10(3)
import math


class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        # using % 1 to get the decimal part
        return n > 0 and (math.log10(n) / math.log10(3)) % 1 == 0
