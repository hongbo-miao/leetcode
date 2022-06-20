# The appeal of a string is the number of distinct characters found in the string.
# - For example, the appeal of "abbca" is 3 because it has 3 distinct characters: 'a', 'b', and 'c'.
# Given a string s, return the total appeal of all of its substrings.
# A substring is a contiguous sequence of characters within a string.
#
# Example 1:
#
# Input: s = "abbca"
# Output: 28
# Explanation: The following are the substrings of "abbca":
# - Substrings of length 1: "a", "b", "b", "c", "a" have an appeal of 1, 1, 1, 1, and 1 respectively. The sum is 5.
# - Substrings of length 2: "ab", "bb", "bc", "ca" have an appeal of 2, 1, 2, and 2 respectively. The sum is 7.
# - Substrings of length 3: "abb", "bbc", "bca" have an appeal of 2, 2, and 3 respectively. The sum is 7.
# - Substrings of length 4: "abbc", "bbca" have an appeal of 3 and 3 respectively. The sum is 6.
# - Substrings of length 5: "abbca" has an appeal of 3. The sum is 3.
# The total sum is 5 + 7 + 7 + 6 + 3 = 28.
#
# Example 2:
#
# Input: s = "code"
# Output: 20
# Explanation: The following are the substrings of "code":
# - Substrings of length 1: "c", "o", "d", "e" have an appeal of 1, 1, 1, and 1 respectively. The sum is 4.
# - Substrings of length 2: "co", "od", "de" have an appeal of 2, 2, and 2 respectively. The sum is 6.
# - Substrings of length 3: "cod", "ode" have an appeal of 3 and 3 respectively. The sum is 6.
# - Substrings of length 4: "code" has an appeal of 4. The sum is 4.
# The total sum is 4 + 6 + 6 + 4 = 20.
#
# Constraints:
#
# 1 <= s.length <= 10^5
# s consists of lowercase English letters.


# Count contribution for each character
# https://leetcode.com/problems/total-appeal-of-a-string/discuss/1996390/JavaC%2B%2BPython-Easy-and-Concise-with-Explanation
#
# Time O(n)
# Space O(26)
#
# This solution is more like what we do for 828. Count Unique Characters of All Substrings of a Given String.
# You can take 828 as another challenge to practice more.
#
# In a substring, multiple same character only get one point.
# We can consider that the first occurrence get the point.
# Now for each character, we count its contribution for all substring.
#
# For each character s[i],
# the substring must start before s[i] to contain s[i]
# and need to end after the last occurrence of s[i],
# otherwise the last occurrence of character s[i] will get the score.
#
# In total, there are i - last[s[i]] possible start position,
# and n - i possible end position,
# so s[i] can contribute (i - last[s[i]]) * (n - i) points.
#
# From this formula, we can also the difference between problem 2262 and 828.
#
# e.g. "abcab"
# c last[c] i n   res
# a     -1  0 5
#         1 * 5
#                  5
# b     -1  1 5
#         2 * 4
#                 13
# c     -1  2 5
#         3 * 3
#                 22
# a      0  3 5
#         3 * 2
#                 28
# b      1  4 5
#         3 * 1
#                 31
from collections import defaultdict


class Solution:
    def appealSum(self, s: str) -> int:
        last = defaultdict(lambda: -1)
        res, n = 0, len(s)
        for i, c in enumerate(s):
            # print(c, last[c], i, n)
            # print(i - last[c], "*", n - i)
            res += (i - last[c]) * (n - i)
            # print("res", res)
            last[c] = i
        return res
