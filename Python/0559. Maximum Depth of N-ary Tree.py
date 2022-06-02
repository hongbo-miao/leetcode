# Given a n-ary tree, find its maximum depth.
# The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
# Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).
#
# Example 1:
#
# Input: root = [1,null,3,2,4,null,5,6]
# Output: 3
#
# Example 2:
#
# Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
# Output: 5
#
# Constraints:
#
# The total number of nodes is in the range [0, 104].
# The depth of the n-ary tree is less than or equal to 1000.


"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""


# 1) Recursion
# Time O(n)
# Space O(n)
class Solution:
    def maxDepth(self, root: "Node") -> int:
        if not root:
            return 0
        if not root.children:
            return 1
        return max(self.maxDepth(v) for v in root.children) + 1


# 2) Iteration
class Solution:
    def maxDepth(self, root: "Node") -> int:
        if not root:
            return 0

        st = [(root, 1)]
        depth = 0
        while st:
            node, d = st.pop()
            if node:
                depth = max(depth, d)
                for v in node.children:
                    st.append((v, d + 1))
        return depth
