# Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.
#
# Example 1:
#
# Input: s = "aaabb", k = 3
# Output: 3
# Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
#
# Example 2:
#
# Input: s = "ababbc", k = 2
# Output: 5
# Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
#
# Constraints:
#
# 1 <= s.length <= 10^4
# s consists of only lowercase English letters.
# 1 <= k <= 10^5


# 1) If every character appears at least k times, the whole string is ok.
# Otherwise, split by a least frequent character
# (because it will always be too infrequent and thus can't be part of any ok substring) and make the most out of the splits.
# https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/discuss/87768/4-lines-Python
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        if len(s) < k:
            return 0
        c = min(set(s), key=s.count)
        if s.count(c) >= k:
            return len(s)
        return max(self.longestSubstring(t, k) for t in s.split(c))


# 2) Similar to 1)
# https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/discuss/87768/4-lines-Python
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        for c in set(s):
            if s.count(c) < k:
                return max(self.longestSubstring(t, k) for t in s.split(c))
        return len(s)
