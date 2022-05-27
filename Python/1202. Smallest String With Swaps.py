# You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.
# You can swap the characters at any pair of indices in the given pairs any number of times.
# Return the lexicographically smallest string that s can be changed to after using the swaps.
#
# Example 1:
#
# Input: s = "dcab", pairs = [[0,3],[1,2]]
# Output: "bacd"
# Explaination:
# Swap s[0] and s[3], s = "bcad"
# Swap s[1] and s[2], s = "bacd"
#
# Example 2:
#
# Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
# Output: "abcd"
# Explaination:
# Swap s[0] and s[3], s = "bcad"
# Swap s[0] and s[2], s = "acbd"
# Swap s[1] and s[2], s = "abcd"
#
# Example 3:
#
# Input: s = "cba", pairs = [[0,1],[1,2]]
# Output: "abc"
# Explaination:
# Swap s[0] and s[1], s = "bca"
# Swap s[1] and s[2], s = "bac"
# Swap s[0] and s[1], s = "abc"
#
# Constraints:
#
# 1 <= s.length <= 10^5
# 0 <= pairs.length <= 10^5
# 0 <= pairs[i][0], pairs[i][1] < s.length
# s only contains lower case English letters.

# Union Find
#
# Note: The important point to note here is that if we have pairs like (a,
# b) and (b, c), then we can swap characters at indices a and c. Although we
# don't have the pair (a, c), we can still swap them by first swapping them
# with the character at index b. Thus, because we can swap the characters at
# these indices any number of times, we can rearrange the characters a, b,
# and c into any order.
from collections import defaultdict


class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n, m = len(s), len(pairs)
        uf = UnionFind(n)
        for u, v in pairs:
            uf.union(u, v)

        groups = uf.get_groups()
        res = ["-"] * n
        for group in groups:
            chars = [s[i] for i in group]
            chars.sort()
            group.sort()
            for i, c in zip(group, chars):
                res[i] = c
        return "".join(res)


class UnionFind:
    def __init__(self, size):
        self.root = [i for i in range(size)]
        # Use a rank array to record the height of each vertex,
        # i.e., the "rank" of each vertex.
        # The initial "rank" of each vertex is 1, because each of them is
        # a standalone vertex with no connection to other vertices.
        self.rank = [1] * size
        self.size = size

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
        if rootX != rootY:
            if self.rank[rootX] > self.rank[rootY]:
                self.root[rootY] = rootX
            elif self.rank[rootX] < self.rank[rootY]:
                self.root[rootX] = rootY
            else:
                self.root[rootY] = rootX
                self.rank[rootX] += 1

    def get_groups(self):
        groups = defaultdict(list)
        for u in range(self.size):
            groups[self.find(u)].append(u)
        return groups.values()
