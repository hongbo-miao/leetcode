# Given a string s, return the number of palindromic substrings in it.
# A string is a palindrome when it reads the same backward as forward.
# A substring is a contiguous sequence of characters within the string.
#
# Example 1:
#
# Input: s = "abc"
# Output: 3
# Explanation: Three palindromic strings: "a", "b", "c".
#
# Example 2:
#
# Input: s = "aaa"
# Output: 6
# Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
#
# Constraints:
#
# 1 <= s.length <= 1000
# s consists of lowercase English letters.


# Expand Around Possible Centers
# Time O(n^2)
# Space O(1)
class Solution:
    def countSubstrings(self, s: str) -> int:
        n = 0
        for i in range(len(s)):
            n += self.count(s, i, i)
            n += self.count(s, i, i + 1)
        return n

    def count(self, s, l, r):
        n = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            n += 1
            l -= 1
            r += 1
        return n
