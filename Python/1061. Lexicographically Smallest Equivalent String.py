# You are given two strings of the same length s1 and s2 and a string baseStr.
# We say s1[i] and s2[i] are equivalent characters.
# - For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 'b' == 'd', and 'c' == 'e'.
# Equivalent characters follow the usual rules of any equivalence relation:
# - Reflexivity: 'a' == 'a'.
# - Symmetry: 'a' == 'b' implies 'b' == 'a'.
# - Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
# For example, given the equivalency information from s1 = "abc" and s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed", and "aab" is the lexicographically smallest equivalent string of baseStr.
# Return the lexicographically smallest equivalent string of baseStr by using the equivalency information from s1 and s2.
#
# Example 1:
#
# Input: s1 = "parker", s2 = "morris", baseStr = "parser"
# Output: "makkek"
# Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
# The characters in each group are equivalent and sorted in lexicographical order.
# So the answer is "makkek".
#
# Example 2:
#
# Input: s1 = "hello", s2 = "world", baseStr = "hold"
# Output: "hdld"
# Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
# So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".
#
# Example 3:
#
# Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
# Output: "aauaaaaada"
# Explanation: We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".
#
# Constraints:
#
# 1 <= s1.length, s2.length, baseStr <= 1000
# s1.length == s2.length
# s1, s2, and baseStr consist of lowercase English letters.


# Union Find
# Time: O(max(n, m)) where n is length of A, and m is length of S.
# space: O(1). Since we only need to store the 26 English characters.
class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        uf = UnionFind(26)
        for a, b in zip(s1, s2):
            if a != b:
                uf.union(self.ci(a), self.ci(b))
        return "".join(self.ic(uf.find(self.ci(c))) for c in baseStr)

    def ci(self, c):
        return ord(c) - 97

    def ic(self, i):
        return chr(i + 97)


class UnionFind:
    def __init__(self, size):
        self.root = [i for i in range(size)]

    # Path compression.
    def find(self, x):
        if x == self.root[x]:
            return x
        self.root[x] = self.find(self.root[x])
        return self.root[x]

    # Union by rank
    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)

        # Note below has some changes from the original Union Find.
        if rootX < rootY:
            self.root[rootY] = rootX
        else:
            self.root[rootX] = rootY
