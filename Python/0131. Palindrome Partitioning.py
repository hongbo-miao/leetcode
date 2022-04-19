# Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
# A palindrome string is a string that reads the same backward as forward.
#
# Example 1:
#
# Input: s = "aab"
# Output: [["a","a","b"],["aa","b"]]
#
# Example 2:
#
# Input: s = "a"
# Output: [["a"]]
#
# Constraints:
#
# 1 <= s.length <= 16
# s contains only lowercase English letters.


# Backtracking
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        if not s:
            return []
        res = []

        def is_palindrome(s: str) -> bool:
            return s == s[::-1]

        def go(l: int, list: List[str]) -> None:
            if l == len(s):
                res.append(list)
                return
            for r in range(l, len(s)):
                if is_palindrome(s[l : r + 1]):
                    go(r + 1, list + [s[l : r + 1]])

        go(0, [])
        return res
