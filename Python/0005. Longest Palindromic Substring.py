# Given a string s, return the longest palindromic substring in s.
#
# Example 1:
#
# Input: s = "babad"
# Output: "bab"
# Explanation: "aba" is also a valid answer.

# Example 2:
#
# Input: s = "cbbd"
# Output: "bb"
#
# Constraints:
#
# 1 <= s.length <= 1000
# s consist of only digits and English letters.

# 1) Brute force
# Time O(n^3)
# Space O(1)
#
# Pick all possible starting and ending positions for a substring, and verify if it is a palindrome

# 2) Dynamic programming
# Time O(n^2)
# Space O(n^2)
#
# To improve over the brute force solution, we first observe how we can avoid unnecessary re-computation while
# validating palindromes. Consider the case "ababa". If we already knew that "bab" is a palindrome, it is obvious
# that "ababa" must be a palindrome since the two left and right end letters are the same.
#
# Therefore,
# dp(i, j) = dp(i + 1, j − 1) and s(i) == s(j)
#
# The base cases are:
# dp(i, i) = true
# dp(i, i + 1) = s(i) == s(j + 1)
#
# This yields a straight forward DP solution, which we first initialize the one and two letters palindromes, and work
# our way up finding all three letters palindromes, and so on.

# 3) Expand from center
# https://www.youtube.com/watch?v=m2Mk9JN5T4A
#
# Time O(n^2). Expanding a palindrome from its center takes O(n) time, so the overall complexity is O(n^2)
# Space O(1)
class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            s1 = self.expend_from_center(s, i, i)
            if len(s1) > len(res):
                res = s1
            s2 = self.expend_from_center(s, i, i + 1)
            if len(s2) > len(res):
                res = s2
        return res

    @staticmethod
    def expend_from_center(s: str, l: int, r: int) -> str:
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1 : r]


# Manacher's algorithm
# Time O(n)
#
# It is a non-trivial algorithm
