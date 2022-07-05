# Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.
# A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.
#
# Example 1:
#
# Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
# Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
# Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats";
# "dogcatsdog" can be concatenated by "dog", "cats" and "dog";
# "ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
#
# Example 2:
#
# Input: words = ["cat","dog","catdog"]
# Output: ["catdog"]
#
# Constraints:
#
# 1 <= words.length <= 10^4
# 1 <= words[i].length <= 30
# words[i] consists of only lowercase English letters.
# All the strings of words are unique.
# 1 <= sum(words[i].length) <= 10^5


# DFS
from functools import cache


class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        w_set = set(words)

        @cache
        def dfs(w):
            for i in range(1, len(w)):
                prefix, suffix = w[:i], w[i:]
                if (prefix in w_set) and (suffix in w_set or dfs(suffix)):
                    return True
            return False

        return [w for w in words if dfs(w)]
