# Given the root of a binary tree, return its maximum depth.
# A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
#
# Example 1:
#
# Input: root = [3,9,20,null,null,15,7]
# Output: 3
#
# Example 2:
#
# Input: root = [1,null,2]
# Output: 2
#
# Constraints:
#
# The number of nodes in the tree is in the range [0, 104].
# -100 <= Node.val <= 100


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# 1) DFS (top-down)
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        max_depth = 0

        def go(node, depth):
            if not node:
                return

            nonlocal max_depth
            max_depth = max(max_depth, depth)
            go(node.left, depth + 1)
            go(node.right, depth + 1)

        go(root, max_depth + 1)
        return max_depth


# 2) DFS (bottom-up)
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        l = self.maxDepth(root.left)
        r = self.maxDepth(root.right)
        return max(l, r) + 1
