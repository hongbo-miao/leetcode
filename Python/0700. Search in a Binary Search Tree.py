# You are given the root of a binary search tree (BST) and an integer val.
# Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
#
# Example 1:
#
# Input: root = [4,2,7,1,3], val = 2
# Output: [2,1,3]
#
# Example 2:
#
# Input: root = [4,2,7,1,3], val = 5
# Output: []
#
# Constraints:
#
# The number of nodes in the tree is in the range [1, 5000].
# 1 <= Node.val <= 10^7
# root is a binary search tree.
# 1 <= val <= 10^7


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

# 1) Recursion
# Time O(H). H is tree height
# Space O(H)
class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if root is None:
            return None

        if root.val == val:
            return root
        elif root.val > val:
            return self.searchBST(root.left, val)
        else:
            return self.searchBST(root.right, val)


# 2) Iteration
# Time O(H)
# Space O(1)
class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        node = root
        while node:
            if node.val == val:
                return node
            elif node.val > val:
                node = node.left
            else:
                node = node.right
        return None
