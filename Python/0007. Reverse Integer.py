# Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
# Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
#
# Example 1:
# Input: x = 123
# Output: 321
#
# Example 2:
# Input: x = -123
# Output: -321
#
# Example 3:
# Input: x = 120
# Output: 21
#
# Constraints:
# -2^31 <= x <= 2^31 - 1


# Pop and push
# Time O(n)
# Space O(1)
#
# e.g. 123
# d: 3, x: 12, n: 3
# d: 2, x: 1,  n: 32
# d: 1, x: 0,  n: 321
class Solution:
    def reverse(self, x: int) -> int:
        if x < 0:
            return -self.reverse(-x)

        n = 0
        while x > 0:
            # pop
            d = x % 10
            x = x // 10

            # push
            n = n * 10 + d

            # Above codes can be combined to these, but hard to understand
            # n = n * 10 + x % 10
            # x = x // 10

            if n > 2 ** 31 - 1:
                return 0
        return n
