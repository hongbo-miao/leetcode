# Given a string s, consider all duplicated substrings: (contiguous) substrings of s that occur 2 or more times. The occurrences may overlap.
# Return any duplicated substring that has the longest possible length. If s does not have a duplicated substring, the answer is "".
#
# Example 1:
#
# Input: s = "banana"
# Output: "ana"
#
# Example 2:
#
# Input: s = "abcd"
# Output: ""
#
# Constraints:
#
# 2 <= s.length <= 3 * 10^4
# s consists of lowercase English letters.

# Binary search
# https://leetcode.com/problems/longest-duplicate-substring/discuss/290871/Python-Binary-Search
# Time O(NlogN)
#   Binary Search in range 1 and N, so it's O(logN)
#   Rolling hash O(N)
#   Overall O(NlogN)
# Space O(N)
#
# Binary search the length of longest duplicate substring and call the help function test(L).
# test(L) slide a window of length L,
# rolling hash the string in this window,
# record the seen string in a hashset,
# and try to find duplicated string.
#
# I give it a big mod for rolling hash, and it should be enough for this problem.
# Actually there could be hash collision.
# One solution is to have two different mod for hash.
# Or we can use a hashmap to record the index of string.
from functools import reduce


class Solution:
    def longestDupSubstring(self, s: str) -> str:
        A = [ord(c) - ord("a") for c in s]
        mod = 2 ** 63 - 1

        def test(L):
            p = pow(26, L) % mod  # or p = pow(26, L, mod)
            cur = reduce(lambda x, y: (x * 26 + y) % mod, A[:L], 0)
            seen = {cur}
            for i in range(L, len(s)):
                cur = (cur * 26 + A[i] - A[i - L] * p) % mod
                if cur in seen:
                    return i - L + 1
                seen.add(cur)

        res = 0
        l, r = 0, len(s)
        while l < r:
            m = (l + r) // 2 + 1
            pos = test(m)
            if pos:
                l = m
                res = pos
            else:
                r = m - 1
        return s[res : res + l]
