# Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
# Note that the same word in the dictionary may be reused multiple times in the segmentation.
#
# Example 1:
#
# Input: s = "leetcode", wordDict = ["leet","code"]
# Output: true
# Explanation: Return true because "leetcode" can be segmented as "leet code".
#
# Example 2:
#
# Input: s = "applepenapple", wordDict = ["apple","pen"]
# Output: true
# Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
# Note that you are allowed to reuse a dictionary word.
#
# Example 3:
#
# Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
# Output: false
#
# Constraints:
#
# 1 <= s.length <= 300
# 1 <= wordDict.length <= 1000
# 1 <= wordDict[i].length <= 20
# s and wordDict[i] consist of only lowercase English letters.
# All the strings of wordDict are unique.


# 1) Backtracking + Memoization
# Similar
# 139. Word Break
# 140. Word Break II
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dic = {}

        def go(s: str) -> bool:
            if not s:
                return True
            if s in dic:
                return dic[s]

            for w in wordDict:
                if s.startswith(w) and go(s[len(w) :]):
                    dic[s] = True
                    return True
            dic[s] = False
            return False

        return go(s)


# 2) Dynamic programming
# Similar
# 139. Word Break
# 472. Concatenated Words
#
# Time O(n^2). Two loops are their to fill dp array.
# Space O(n). Length of dp array is n + 1.
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        if not s:
            return True
        if not wordDict:
            return False
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in wordDict:
                    dp[i] = True
                    break
        return dp[-1]
