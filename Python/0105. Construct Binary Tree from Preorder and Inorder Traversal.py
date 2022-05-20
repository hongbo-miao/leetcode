# Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.
#
# Example 1:
#
# Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
# Output: [3,9,20,null,null,15,7]
#
# Example 2:
#
# Input: preorder = [-1], inorder = [-1]
# Output: [-1]
#
# Constraints:
#
# 1 <= preorder.length <= 3000
# inorder.length == preorder.length
# -3000 <= preorder[i], inorder[i] <= 3000
# preorder and inorder consist of unique values.
# Each value of inorder also appears in preorder.
# preorder is guaranteed to be the preorder traversal of the tree.
# inorder is guaranteed to be the inorder traversal of the tree.


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# preorder: (3) 9 20 15 7
# inorder: 9 (3) 15 20 7
#     3
#    / \
#   9  20
#     /  \
#    15   7


# Similar
# 105. Construct Binary Tree from Preorder and Inorder Traversal
# 106. Construct Binary Tree from Inorder and Postorder Traversal
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return None
        root = TreeNode(preorder[0])
        root_idx = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1 : root_idx + 1], inorder[:root_idx])
        root.right = self.buildTree(preorder[root_idx + 1 :], inorder[root_idx + 1 :])
        return root


class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return None

        def build(l, r):
            if l > r:
                return None
            val = preorder.pop(0)
            i = inorder.index(val)

            node = TreeNode(val)
            node.left = build(l, i - 1)
            node.right = build(i + 1, r)
            return node

        return build(0, len(inorder) - 1)
