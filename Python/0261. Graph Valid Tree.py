# You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [a_i, b_i] indicates that there is an undirected edge between nodes a_i and b_i in the graph.
# Return true if the edges of the given graph make up a valid tree, and false otherwise.
#
# Example 1:
#
# Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
# Output: true
#
# Example 2:
#
# Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
# Output: false
#
# Constraints:
#
# 1 <= n <= 2000
# 0 <= edges.length <= 5000
# edges[i].length == 2
# 0 <= a_i, b_i < n
# a_i != b_i
# There are no self-loops or repeated edges.


# Union Find
#
# Time O(E⋅α(N))
#   E = number of edges
#   N = number of nodes. α(N) is the Inverse Ackermann Function
# Space O(N)
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        # Condition 1: The graph must contain n - 1 edges.
        if len(edges) != n - 1:
            return False

        # Condition 2: The graph must contain a single connected component.
        # Create a new UnionFind object with n nodes.
        uf = UnionFind(n)
        # Add each edge. Check if a merge happened, because if it didn't, there must be a cycle.
        for x, y in edges:
            if not uf.union(x, y):
                return False
        # If we got this far, there's no cycles!
        return True


class UnionFind:
    def __init__(self, size):
        self.root = [i for i in range(size)]
        self.rank = [1] * size

    def find(self, x):
        if x == self.root[x]:
            return x
        self.root[x] = self.find(self.root[x])
        return self.root[x]

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
            return True
        return False
