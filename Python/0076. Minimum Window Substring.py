# Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
# The testcases will be generated such that the answer is unique.
# A substring is a contiguous sequence of characters within the string.
#
# Example 1:
#
# Input: s = "ADOBECODEBANC", t = "ABC"
# Output: "BANC"
# Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
#
# Example 2:
#
# Input: s = "a", t = "a"
# Output: "a"
# Explanation: The entire string s is the minimum window.
#
# Example 3:
#
# Input: s = "a", t = "aa"
# Output: ""
# Explanation: Both 'a's from t must be included in the window.
# Since the largest window of s only has one 'a', return empty string.
#
# Constraints:
#
# m == s.length
# n == t.length
# 1 <= m, n <= 10^5
# s and t consist of uppercase and lowercase English letters.
#
# Follow up: Could you find an algorithm that runs in O(m + n) time?


# Notion

# Sliding window
from collections import Counter


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)  # hash table to store char frequency
        missing = len(t)  # total number of chars we care
        start, end = 0, 0
        l = 0
        # Move the right pointer until the window contains all the chars from string t
        for r, c in enumerate(s, 1):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1

            # Now the window has all chars
            if missing == 0:
                # Remove chars to find the real start
                while l < r and need[s[l]] < 0:
                    need[s[l]] += 1
                    l += 1

                # Update window
                if end == 0 or r - l < end - start:
                    start, end = l, r

                # Move left pointer again which makes the window no more desirable to find next window
                need[s[l]] += 1
                missing += 1
                l += 1
        return s[start:end]
