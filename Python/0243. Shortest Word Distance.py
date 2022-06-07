# Given an array of strings wordsDict and two different strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.
#
# Example 1:
#
# Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
# Output: 3
#
# Example 2:
#
# Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
# Output: 1
#
# Constraints:
#
# 1 <= wordsDict.length <= 3 * 10^4
# 1 <= wordsDict[i].length <= 10
# wordsDict[i] consists of lowercase English letters.
# word1 and word2 are in wordsDict.
# word1 != word2


# Time O(N⋅M)
#   N is the number of words in the input list
#   M is the total length of two input words
# Space O(1), since no additional space is allocated
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        min_dist = len(wordsDict)
        i1, i2 = -1, -1
        for i in range(len(wordsDict)):
            if wordsDict[i] == word1:
                i1 = i
            elif wordsDict[i] == word2:
                i2 = i
            if i1 != -1 and i2 != -1:
                min_dist = min(min_dist, abs(i1 - i2))
        return min_dist
