# There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.
# You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.
# Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.
# A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.
#
# Example 1:
#
# Input: words = ["wrt","wrf","er","ett","rftt"]
# Output: "wertf"
#
# Example 2:
#
# Input: words = ["z","x"]
# Output: "zx"
#
# Example 3:
#
# Input: words = ["z","x","z"]
# Output: ""
# Explanation: The order is invalid, so return "".
#
# Constraints:
#
# 1 <= words.length <= 100
# 1 <= words[i].length <= 100
# words[i] consists of only lowercase English letters.


# Topological Sorting
from collections import defaultdict


class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Build graph
        graph = defaultdict(set)
        in_degree = defaultdict(int)
        for w in words:
            for c in w:
                in_degree[c] = 0
                graph[c] = set()

        for i in range(len(words) - 1):
            w1 = words[i]
            w2 = words[i + 1]
            min_len = min(len(w1), len(w2))
            for j in range(min_len):
                c1 = w1[j]
                c2 = w2[j]
                if c1 != c2:
                    if c2 not in graph[c1]:
                        graph[c1].add(c2)
                        in_degree[c2] += 1
                    break
                # ["abc","ab"] should return "" instead of "abc"
                elif j == min_len - 1 and len(w1) > len(w2):
                    return ""

        # BFS
        q = []
        for c in in_degree:
            if in_degree[c] == 0:
                q.append(c)

        s = ""
        while q:
            c1 = q.pop(0)
            s += c1
            for c2 in graph[c1]:
                in_degree[c2] -= 1
                if in_degree[c2] == 0:
                    q.append(c2)
        if len(s) != len(graph):
            return ""
        return s
