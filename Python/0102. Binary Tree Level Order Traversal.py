# Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
#
# Example 1:
#
# Input: root = [3,9,20,null,null,15,7]
# Output: [[3],[9,20],[15,7]]
#
# Example 2:
#
# Input: root = [1]
# Output: [[1]]
#
# Example 3:
#
# Input: root = []
# Output: []
#
# Constraints:
#
# The number of nodes in the tree is in the range [0, 2000].
# -1000 <= Node.val <= 1000


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# 1) DFS - preorder traversal
# Similar
# 102. Binary Tree Level Order Traversal
# 103. Binary Tree Zigzag Level Order Traversal
# 1161. Maximum Level Sum of a Binary Tree
#
# Time O(n)
# Space O(n)
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res = []

        def go(node, lvl):
            if not node:
                return

            if len(res) == lvl:
                res.append([])
            res[lvl].append(node.val)

            go(node.left, lvl + 1)
            go(node.right, lvl + 1)

        go(root, 0)
        return res


# 2) BFS - level-order traversal
# Similar
# 102. Binary Tree Level Order Traversal
# 116. Populating Next Right Pointers in Each Node
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        res = []
        q = [root]

        while q:
            nodes = q.copy()
            q = []
            row = []

            while nodes:
                node = nodes.pop(0)
                row.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(row)
        return res
