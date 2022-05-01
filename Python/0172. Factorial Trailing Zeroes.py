# Given an integer n, return the number of trailing zeroes in n!.
# Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.
#
# Example 1:
#
# Input: n = 3
# Output: 0
# Explanation: 3! = 6, no trailing zero.
#
# Example 2:
#
# Input: n = 5
# Output: 1
# Explanation: 5! = 120, one trailing zero.
#
# Example 3:
#
# Input: n = 0
# Output: 0
#
# Constraints:
#
# 0 <= n <= 10^4
#
# Follow up: Could you write a solution that works in logarithmic time complexity?


# 1)
# Each 2 * 5 will have a 0, since there are a lot of 2, so only need count the number of 5 in n!
# e.g. 26
# 25, 20, 15, 10, 5, 0
# count = (25 / 5) + (5 / 5) = 6
class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        while n > 0:
            count += n // 5
            n //= 5
        return count


# 2)
class Solution:
    def trailingZeroes(self, n: int) -> int:
        return 0 if n == 0 else n // 5 + self.trailingZeroes(n // 5)
