# Given the root of a binary tree, return the inorder traversal of its nodes' values.
#
# Example 1:
#
# Input: root = [1,null,2,3]
# Output: [1,3,2]
#
# Example 2:
#
# Input: root = []
# Output: []
#
# Example 3:
#
# Input: root = [1]
# Output: [1]
#
# Constraints:
#
# The number of nodes in the tree is in the range [0, 100].
# -100 <= Node.val <= 100


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# 1) Recursion
# Time O(n), the time complexity is O(n) because the recursive function is T(n) = 2 * T(n / 2) + 1
# Space O(log n), n is number of nodes. The worst case space is O(n)
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []

        def go(node):
            if not node:
                return
            go(node.left)
            res.append(node.val)
            go(node.right)

        go(root)
        return res


class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        return (
            self.inorderTraversal(root.left)
            + [root.val]
            + self.inorderTraversal(root.right)
        )


# 2) Iteration using stack
# Time O(n)
# Space O(n)
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        st = []

        node = root
        while st or node:
            # Drill left
            while node:
                st.append(node)
                node = node.left

            # Print & go to right child
            node = st.pop()
            res.append(node.val)
            node = node.right
        return res
