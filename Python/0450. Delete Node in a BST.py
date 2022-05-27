# Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.
# Basically, the deletion can be divided into two stages:
# 1. Search for a node to remove.
# 2. If the node is found, delete the node.
#
# Example 1:
#
# Input: root = [5,3,6,2,4,null,7], key = 3
# Output: [5,4,6,2,null,null,7]
# Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
# One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
# Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.
#
# Example 2:
#
# Input: root = [5,3,6,2,4,null,7], key = 0
# Output: [5,3,6,2,4,null,7]
# Explanation: The tree does not contain a node with value = 0.
#
# Example 3:
#
# Input: root = [], key = 0
# Output: []
#
# Constraints:
#
# The number of nodes in the tree is in the range [0, 104].
# -10^5 <= Node.val <= 10^5
# Each node has a unique value.
# root is a valid binary search tree.
# -10^5 <= key <= 10^5
#
# Follow up: Could you solve it with time complexity O(height of tree)?


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# Time O(H). H = logN for the balanced tree.
# Space O(H). H = logN for the balanced tree.
class Solution:
    # One step right and then always left
    def successor(self, root):
        root = root.right
        while root.left:
            root = root.left
        return root.val

    # One step left and then always right
    def predecessor(self, root):
        root = root.left
        while root.right:
            root = root.right
        return root.val

    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        if not root:
            return None

        # Delete from the right subtree
        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        # Delete from the left subtree
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        # Delete the current node
        else:
            # the node is a leaf
            if not (root.left or root.right):
                root = None
            # The node is not a leaf and has a right child
            elif root.right:
                root.val = self.successor(root)
                root.right = self.deleteNode(root.right, root.val)
            # The node is not a leaf, has no right child, and has a left child
            else:
                root.val = self.predecessor(root)
                root.left = self.deleteNode(root.left, root.val)
        return root
