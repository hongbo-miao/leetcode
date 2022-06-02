# Given an integer n, return the nth digit of the infinite integer sequence [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...].
#
# Example 1:
#
# Input: n = 3
# Output: 3
#
# Example 2:
#
# Input: n = 11
# Output: 0
# Explanation: The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.
#
# Constraints:
#
# 1 <= n <= 2^31 - 1

# https://leetcode.com/problems/nth-digit/discuss/88363/Java-solution/93222
#
# 1 ~ 9 include 9 one digit number;
# 10 ~ 99 include 90 two digits number;
# 100 ~ 999 include 900 three digits number;
# 1000 ~ 9999 include 9000 four digits number;
#
# len is how many digits:1 or 2 or 3 ...
# range is 9 or 90 or 900 ...
#
# Steps:
# 1. Find the len of the number where the nth digit is from
# 2. Find the actual number where the nth digit is from
# 3. Find the nth digit and return
#
# e.g.
# n = 103
# len = 2, range = 90
# i = 56
# res = 6
class Solution:
    def findNthDigit(self, n: int) -> int:
        len = 1
        i = 1
        range = 9
        # 1. Find the len of the number where the nth digit is from
        while n > len * range:
            n -= len * range
            len += 1
            range *= 10
            i *= 10

        # 2. Find the actual number where the nth digit is from
        i += (n - 1) // len

        # 3. Find the nth digit and return
        return int(str(i)[(n - 1) % len])
