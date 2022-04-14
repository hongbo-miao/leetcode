# Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
#
# Example 1:
#
# Input: root = [3,9,20,null,null,15,7]
# Output: [[3],[20,9],[15,7]]
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
# -100 <= Node.val <= 100


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

# 1) DFS - preorder traversal
# Time O(n)
# Space O(n)
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res = []

        def go(node, lvl):
            if not node:
                return

            if len(res) == lvl:
                res.append([])

            if lvl % 2 == 0:
                res[lvl].append(node.val)
            else:
                res[lvl].insert(0, node.val)

            go(node.left, lvl + 1)
            go(node.right, lvl + 1)

        go(root, 0)
        return res


# 2) BFS - level-order traversal
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        res = []
        q = [root]
        lvl = 0

        while q:
            row = []
            for _ in range(len(q)):
                node = q.pop(0)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
                row.append(node.val)

            if lvl % 2 == 0:
                res.append(row)
            else:
                res.append(row[::-1])
            lvl += 1
        return res
