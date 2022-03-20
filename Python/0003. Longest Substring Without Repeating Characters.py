# Given a string s, find the length of the longest substring without repeating characters.
#
# Example 1:
#
# Input: s = "abcabcbb"
# Output: 3
# Explanation: The answer is "abc", with the length of 3.
#
# Example 2:
#
# Input: s = "bbbbb"
# Output: 1
# Explanation: The answer is "b", with the length of 1.
#
# Example 3:
#
# Input: s = "pwwkew"
# Output: 3
# Explanation: The answer is "wke", with the length of 3.
# Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
#
# Constraints:
#
# 0 <= s.length <= 5 * 10^4
# s consists of English letters, digits, symbols and spaces.


# 1) Sliding window + hash map
# Similar
# 3. Longest Substring Without Repeating Characters
# 904. Fruit Into Baskets
# 992. Subarrays with K Different Integers
#
# Time O(2n) = O(n). In the worst case each character will be visited twice by l and r.
# Space O(min(m, n)). We need O(k) space for the sliding window, where k is the size of the Set. The size of the Set is
#   upper bounded by the size of the string nn and the size of the charset/alphabet m.
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        dic = dict()
        max_len = 0
        l = 0
        r = 0
        while l < len(s) and r < len(s):
            if s[r] not in dic:
                dic[s[r]] = True
                r += 1
                max_len = max(max_len, r - l)
            else:
                dic.pop(s[l])
                l += 1
        return max_len


# 2) Sliding window (optimized)
# Time O(n)
# Space O(min(m, n)), m is the size of the hash map
#
# The above solution requires at most 2n steps. In fact, it could be optimized to require only n steps. Instead of
# using a set to tell if a character exists or not, we could define a mapping of the characters to its index. Then
# we can skip the characters immediately when we found a repeated character.
#   The reason is that if s[r] have a duplicate in the range [l, r) with index r', we don't need to increase l
# little by little. We can skip all the elements in the range [l, r'] and let l to be r' + 1 directly.
#
# e.g. pwwkew
# l = 0, r = 0, dic = { p: 1 }
# l = 0, r = 1, dic = { p: 1, w: 2 }
# l = 2, r = 2, dic = { p: 1, w: 3 }
# l = 2, r = 3, dic = { p: 1, w: 3, k: 4 }
# l = 2, r = 4, dic = { p: 1, w: 3, k: 4, e: 5 }
# l = 3, r = 5, dic = { p: 1, w: 6, k: 4, e: 5 }
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        dic = dict()
        max_len = 0
        l = 0
        for r, c in enumerate(s):
            if c in dic:
                # not l = dic[c], because max makes sure l always increase
                l = max(l, dic[c])
            dic[c] = r + 1  # dic[c] saves next start point for l
            max_len = max(max_len, r - l)
        return max_len
