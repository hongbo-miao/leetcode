# Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
#
# '.' Matches any single character.
# '*' Matches zero or more of the preceding element.
# The matching should cover the entire input string (not partial).
#
# Example 1:
#
# Input: s = "aa", p = "a"
# Output: false
# Explanation: "a" does not match the entire string "aa".
#
# Example 2:
#
# Input: s = "aa", p = "a*"
# Output: true
# Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
#
# Example 3:
#
# Input: s = "ab", p = ".*"
# Output: true
# Explanation: ".*" means "zero or more (*) of any character (.)".
#
# Constraints:
#
# 1 <= s.length <= 20
# 1 <= p.length <= 30
# s contains only lowercase English letters.
# p contains only lowercase English letters, '.', and '*'.
# It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.


# Dynamic programming
# https://leetcode.com/problems/regular-expression-matching/discuss/5651/Easy-DP-Java-Solution-with-detailed-Explanation/238767
#
# dp[i][j] denotes whether s[0: i - 1] matches p[0 : j - 1]
#
# 1. if p[j] == s[i]
#    dp[i][j] = dp[i - 1][j - 1]
#
# 2. if p[j] == '.'
#    dp[i][j] = dp[i - 1][j - 1]
#
# 3. if p[j] == '*', also need consider p[j - 1]
#    1) if p[j - 1] != s[i] and p[j - 1] != '.'  # a ab* and not a a.*
#       dp[i][j] = dp[i][j - 2]                  # e.g. a ab* -> p remove 'b*' which is j - 2
#
#    2) if p[j - 1] == s[i] or p[j - 1] == '.'
#       a) dp[i][j] = dp[i][j - 2]               # c* - no 'c', e.g. ab ab.*
#       b) dp[i][j] = dp[i][j - 1]               # c* - single 'c', e.g. abc abc*
#       c) dp[i][j] = dp[i - 1][j]               # c* - multiple 'c', e.g. abccc abc*
#
# Example 1
# s = 'abcd', p = 'a*.cd'
#
#     p 0 1 2 3 4
# s     a * . c d
# 0   T F T F F F
# 1 a F T T T F F
# 2 b F F F T F F
# 3 c F F F F T F
# 4 d F F F F F T
#
# Example 2
# s = 'abaa', p = 'ab.*'
#
#   p 0 1 2 3 4
# s     a b . *
# 0   T F F F F
# 1 a F T F F F
# 2 b F F T F T
# 3 a F F F T T
# 4 a F F F F T

# "aab"
# "c*a*b"


class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]

        # Initialization
        # 1) empty string matches empty pattern
        dp[0][0] = True

        # 2) dp[i][0] = False (which is default value of the boolean array) since empty pattern cannot match non-empty string
        # 3) dp[0][j]: what pattern matches empty string ""? It should be #*#*#*#*..., or (#*)* if allow me to represent regex using regex :P,
        #    and for this case we need to check manually:
        #    as we can see, the length of pattern should be even && the character at the even position should be *,
        #    thus for odd length, dp[0][j] = false which is default. So we can just skip the odd position, i.e. j starts from 2, the interval of j is also 2.
        #    and notice that the length of repeat sub-pattern #* is only 2, we can just make use of dp[0][j - 2] rather than scanning j length each time
        #    for checking if it matches #*#*#*#*.
        for j in range(2, len(p), 2):
            if p[j - 1] == "*" and dp[0][j - 2]:
                dp[0][j] = True

        for i in range(len(s)):
            for j in range(len(p)):
                if p[j] == s[i]:
                    dp[i + 1][j + 1] = dp[i][j]
                elif p[j] == ".":
                    dp[i + 1][j + 1] = dp[i][j]
                elif p[j] == "*":
                    if p[j - 1] != s[i] and p[j - 1] != ".":
                        dp[i + 1][j + 1] = dp[i + 1][j - 1]
                    else:
                        dp[i + 1][j + 1] = (
                            dp[i + 1][j - 1] or dp[i + 1][j] or dp[i][j + 1]
                        )
        return dp[-1][-1]
