# Given the root of a binary tree, return the postorder traversal of its nodes' values.
#
# Example 1:
#
# Input: root = [1,null,2,3]
# Output: [3,2,1]
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
# The number of the nodes in the tree is in the range [0, 100].
# -100 <= Node.val <= 100


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# 1) Recursion
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []

        def go(node):
            if not node:
                return
            go(node.left)
            go(node.right)
            res.append(node.val)

        go(root)
        return res


class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        return (
            self.postorderTraversal(root.left)
            + self.postorderTraversal(root.right)
            + [root.val]
        )


# 2) Iteration
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        st = [root]

        while st:
            node = st.pop()
            res.insert(0, node.val)
            if node.left:
                st.append(node.left)
            if node.right:
                st.append(node.right)
        return res
