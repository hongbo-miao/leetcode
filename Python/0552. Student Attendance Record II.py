# An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
# 'A': Absent.
# 'L': Late.
# 'P': Present.
# Any student is eligible for an attendance award if they meet both of the following criteria:
#
# The student was absent ('A') for strictly fewer than 2 days total.
# The student was never late ('L') for 3 or more consecutive days.
# Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 109 + 7.
#
# Example 1:
#
# Input: n = 2
# Output: 8
# Explanation: There are 8 records with length 2 that are eligible for an award:
# "PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
# Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
#
# Example 2:
#
# Input: n = 1
# Output: 3
# Example 3:
#
# Input: n = 10101
# Output: 183236316
#
# Constraints:
#
# 1 <= n <= 10^5


# const checkRecord1 = (n) => {
#   const mod = 10 ** 9 + 7;
#
#   const dp00 = Array(n + 1).fill(0); // A never appeared, end with 0 L
#   const dp01 = Array(n + 1).fill(0); // A never appeared, end with 1 L
#   const dp02 = Array(n + 1).fill(0); // A never appeared, end with 2 L
#   const dp10 = Array(n + 1).fill(0); // A appeared once, end with 0 L
#   const dp11 = Array(n + 1).fill(0); // A appeared once, end with 1 L
#   const dp12 = Array(n + 1).fill(0); // A appeared once, end with 2 L
#   dp00[0] = 1;
#
#   // dp00[i] = dp00[i - 1] * 1 (P) + dp01[i - 1] * 1 (P) + dp02[i - 1] * 1 (P)
#   // dp01[i] = dp00[i - 1] * 1 (L)
#   // dp02[i] = dp01[i - 1] * 1 (L)
#   // dp10[i] = dp00[i - 1] * 1 (A) + dp01[i - 1] * 1 (A) + dp02[i - 1] * 1 (A) + dp10[i - 1] * 1 (P) + dp11[i - 1] * 1 (P) + dp12[i - 1] * 1 (P)
#   // dp11[i] = dp10[i - 1] * 1 (L)
#   // dp12[i] = dp11[i - 1] * 1 (L)
#   for (let i = 1; i <= n; i++) {
#     dp00[i] = (dp00[i - 1] * 1 + dp01[i - 1] * 1 + dp02[i - 1] * 1) % mod;
#     dp01[i] = (dp00[i - 1] * 1) % mod;
#     dp02[i] = (dp01[i - 1] * 1) % mod;
#     dp10[i] = (dp00[i - 1] * 1 + dp01[i - 1] * 1 + dp02[i - 1] * 1 + dp10[i - 1] * 1 + dp11[i - 1] * 1 + dp12[i - 1] * 1) % mod;
#     dp11[i] = (dp10[i - 1] * 1) % mod;
#     dp12[i] = (dp11[i - 1] * 1) % mod;
#   }
#
#   return (dp00[-1] + dp01[-1] + dp02[-1] + dp10[-1] + dp11[-1] + dp12[-1]) % mod;
# };


# 1) Dynamic Programming
# https://www.youtube.com/watch?v=zd20HrEb5dg
#
# Time O(n)
# Space O(n)
class Solution:
    def checkRecord(self, n: int) -> int:
        mod = 10 ** 9 + 7
        dp00 = [0] * (n + 1)  # A never appeared, end with 0 L
        dp01 = [0] * (n + 1)  # A never appeared, end with 1 L
        dp02 = [0] * (n + 1)  # A never appeared, end with 2 L
        dp10 = [0] * (n + 1)  # A appeared once, end with 0 L
        dp11 = [0] * (n + 1)  # A appeared once, end with 1 L
        dp12 = [0] * (n + 1)  # A appeared once, end with 2 L
        dp00[0] = 1
        for i in range(1, n + 1):
            dp00[i] = (dp00[i - 1] * 1 + dp01[i - 1] * 1 + dp02[i - 1] * 1) % mod
            dp01[i] = (dp00[i - 1] * 1) % mod
            dp02[i] = (dp01[i - 1] * 1) % mod
            dp10[i] = (
                dp00[i - 1] * 1
                + dp01[i - 1] * 1
                + dp02[i - 1] * 1
                + dp10[i - 1] * 1
                + dp11[i - 1] * 1
                + dp12[i - 1] * 1
            ) % mod
            dp11[i] = (dp10[i - 1] * 1) % mod
            dp12[i] = (dp11[i - 1] * 1) % mod
        return (dp00[-1] + dp01[-1] + dp02[-1] + dp10[-1] + dp11[-1] + dp12[-1]) % mod


# 2) Dynamic Programming (Optimized)
# Time O(n)
# Space O(1)
class Solution:
    def checkRecord(self, n: int) -> int:
        mod = 10 ** 9 + 7
        p = 1
        l = 0
        ll = 0
        a = 0
        al = 0
        all = 0
        while n:
            p, a, l, ll, al, all = (
                (p + l + ll) % mod,
                (a + al + p + l + ll + all) % mod,
                p % mod,
                l % mod,
                a % mod,
                al % mod,
            )
            n -= 1
        return (p + a + l + ll + al + all) % mod
