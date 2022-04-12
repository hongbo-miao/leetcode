# A message containing letters from A-Z can be encoded into numbers using the following mapping:
#
# 'A' -> "1"
# 'B' -> "2"
# ...
# 'Z' -> "26"
#
# To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
#
# "AAJF" with the grouping (1 1 10 6)
# "KJF" with the grouping (11 10 6)
# Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
#
# Given a string s containing only digits, return the number of ways to decode it.
#
# The test cases are generated so that the answer fits in a 32-bit integer.
#
# Example 1:
#
# Input: s = "12"
# Output: 2
# Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
#
# Example 2:
#
# Input: s = "226"
# Output: 3
# Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
#
# Example 3:
#
# Input: s = "06"
# Output: 0
# Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
#
# Constraints:
#
# 1 <= s.length <= 100
# s contains only digits and may contain leading zero(s).


# Dynamic programming
# Similar
# 70. Climbing Stairs
# 91. Decode Ways
#
# Time O(n)
# Space O(n)
#
# dp[n] =
#   dp[n - 2] // the number made by s[n - 1] and s[n] should be between 10 to 26
# + dp[n - 1] // s[n] != 0
#
# e.g. '226'
# dp = [1, 1, 2, 3]
#
# e.g. '236'
# dp = [1, 1, 2, 2]
#
# e.g. '101'
# dp = [1, 1, 1, 1]
#
# e.g. '110'
# dp = [1, 1, 2, 1]
class Solution:
    def numDecodings(self, s: str) -> int:
        if not s:
            return 0
        if s[0] == "0":
            return 0

        dp = [0] * (len(s) + 1)
        dp[0] = 1
        dp[1] = 1

        for i in range(2, len(s) + 1):
            a = int(s[i - 1])  # last one digit
            if a != 0:
                dp[i] += dp[i - 1]

            b = int(s[i - 2 : i])  # last two digits
            if 10 <= b <= 26:
                dp[i] += dp[i - 2]

        return dp[-1]
