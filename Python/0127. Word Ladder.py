# A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s_1 -> s_2 -> ... -> s_k such that:
# - Every adjacent pair of words differs by a single letter.
# - Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
# - s_k == endWord
# Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
#
# Example 1:
#
# Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
# Output: 5
# Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
#
# Example 2:
#
# Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
# Output: 0
# Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
#
# Constraints:
#
# 1 <= beginWord.length <= 10
# endWord.length == beginWord.length
# 1 <= wordList.length <= 5000
# wordList[i].length == beginWord.length
# beginWord, endWord, and wordList[i] consist of lowercase English letters.
# beginWord != endWord
# All the words in wordList are unique.


# 1) BFS
# Time O(M * N), where M is the length of words and N is the total number of words in the input word list. Finding
#   out all the transformations takes M iterations for each of the N words. Also, breadth first search in the worst
#   case might go to each of the N words.
#
# Space O(M * N), to store all M transformations for each of the N words, in the all_combo_dict dictionary. Visited
# dictionary is of N size. Queue for BFS in worst case would need space for all N words.
from string import ascii_lowercase


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0
        wordList = set(wordList)
        step = 1
        q = [beginWord]
        while q:
            q2 = q.copy()
            q = []
            while q2:
                w = q2.pop(0)
                if w == endWord:
                    return step
                for i in range(len(w)):
                    # string.ascii_lowercase == "abcdefghijklmnopqrstuvwxyz"
                    for c in ascii_lowercase:
                        w2 = w[:i] + c + w[i + 1 :]
                        if w2 in wordList:
                            q.append(w2)
                            wordList.remove(w2)
            step += 1
        return 0


# 2) Bidirectional BFS
# https://leetcode.com/problems/word-ladder/solution/
#
# Time O(M * N), where M is the length of words and NN is the total number of words in the input word list. Similar
#   to one directional, bidirectional also takes M*N for finding out all the transformations. But the search time
#   reduces to half, since the two parallel searches meet somewhere in the middle.
#
# Space O(M * N), to store all MM transformations for each of the N words, in the all_combo_dict dictionary, same
#   as one directional. But bidirectional reduces the search space. It narrows down because of meeting in the middle.
