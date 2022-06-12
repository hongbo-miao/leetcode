# You are given an array of words where each word consists of lowercase English letters.
# wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.
# - For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
# A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.
# Return the length of the longest possible word chain with words chosen from the given list of words.
#
# Example 1:
#
# Input: words = ["a","b","ba","bca","bda","bdca"]
# Output: 4
# Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
#
# Example 2:
#
# Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
# Output: 5
# Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
#
# Example 3:
#
# Input: words = ["abcd","dbqca"]
# Output: 1
# Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
# ["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
#
# Constraints:
#
# 1 <= words.length <= 1000
# 1 <= words[i].length <= 16
# words[i] only consists of lowercase English letters.

# Dynamic Programming (Bottom-Up)
# https://leetcode.com/problems/longest-string-chain/discuss/1213876/Python-3-solutions-LIS-DP-Top-down-DP-Bottom-up-DP-Clean-and-Concise
# Firstly, we sort words in increasing order by their length, to ensure length of the previous word no longer than length of the current word, it means len(words[j]) <= len(word[i]), where j < i.
# Let dp(word) be the length of the longest possible word chain end at word word.
# To calculate dp(word), we try all predecessors of word word and get the maximum length among them.
from collections import Counter


class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=len)  # sort words by its length
        res = 0
        dp = Counter()
        for w in words:
            dp[w] = 1
            for i in range(len(w)):
                predecessor = w[:i] + w[i + 1 :]
                if predecessor in dp and dp[w] < dp[predecessor] + 1:
                    dp[w] = dp[predecessor] + 1
            res = max(res, dp[w])
        return res
