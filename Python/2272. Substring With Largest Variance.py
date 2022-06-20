# The variance of a string is defined as the largest difference between the number of occurrences of any 2 characters present in the string. Note the two characters may or may not be the same.
# Given a string s consisting of lowercase English letters only, return the largest variance possible among all substrings of s.
# A substring is a contiguous sequence of characters within a string.
#
# Example 1:
#
# Input: s = "aababbb"
# Output: 3
# Explanation:
# All possible variances along with their respective substrings are listed below:
# - Variance 0 for substrings "a", "aa", "ab", "abab", "aababb", "ba", "b", "bb", and "bbb".
# - Variance 1 for substrings "aab", "aba", "abb", "aabab", "ababb", "aababbb", and "bab".
# - Variance 2 for substrings "aaba", "ababbb", "abbb", and "babb".
# - Variance 3 for substring "babbb".
# Since the largest possible variance is 3, we return it.
#
# Example 2:
#
# Input: s = "abcde"
# Output: 0
# Explanation:
# No letter occurs more than once in s, so the variance of every substring is 0.
#
# Constraints:
#
# 1 <= s.length <= 10^4
# s consists of lowercase English letters.


# https://leetcode.com/problems/substring-with-largest-variance/discuss/2038516/Python-Simple-Solution-Faster-than-100/1393322
from itertools import product


class Solution:
    def largestVariance(self, s: str) -> int:
        chars = set(s)
        max_variance = 0
        for c1, c2 in product(chars, chars):
            if c1 == c2:
                continue
            diff = min_diff = prev_diff = 0
            met1 = met2 = False
            for i, c in enumerate(s):
                if c == c1:
                    met1 = True
                    diff += 1
                elif c == c2:
                    met2 = True
                    diff -= 1
                    # Store `prev_diff` and calculate `diff - prev_diff` instead of `diff - min_diff`
                    # below to account for the fact that we require at least 1 occurrence of `c2` in
                    # the resulting substring
                    #
                    # To see it in action, try removing `prev_diff` and testing on `abcde`.  You will
                    # get max_variance=1 rather than the expected max_variance=0
                    prev_diff = min_diff
                    min_diff = min(min_diff, diff)
                else:
                    continue
                if met1 and met2:
                    max_variance = max(max_variance, diff - prev_diff)
        return max_variance
