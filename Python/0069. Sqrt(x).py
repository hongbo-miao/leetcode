# Given a non-negative integer x, compute and return the square root of x.
# Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
# Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.
#
# Example 1:
#
# Input: x = 4
# Output: 2
#
# Example 2:
#
# Input: x = 8
# Output: 2
# Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
#
# Constraints:
#
# 0 <= x <= 2^31 - 1

# 1)
# Time O(n)
# Space O(1)
class Solution:
    def mySqrt(self, x: int) -> int:
        for i in range(x + 1):
            if i * i == x:
                return i
            if i * i > x:
                return i - 1
        return x


# 2) Integer square root
# https://en.wikipedia.org/wiki/Integer_square_root
class Solution:
    def mySqrt(self, x: int) -> int:
        r = x
        while r * r > x:
            r = (r + x / r) / 2
        return r


# 3) Binary search
# Time O(log n)
# Space O(1)
class Solution:
    def mySqrt(self, x: int) -> int:
        l = 1  # the square root of x cannot be 0, so start from 1
        r = x  # the square root of x can be x, for example 1^2 = 1
        while l <= r:
            m = (l + r) // 2
            if m * m == x:
                return m
            elif m * m < x:
                l = m + 1
            else:
                r = m - 1

        # End condition: l > r. We expect the square root of 8 is 2, so select the smaller one.
        return r
