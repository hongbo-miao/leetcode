# Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
#
# Example 1:
#
# Input: root = [1,2,2,3,4,4,3]
# Output: true
#
# Example 2:
#
# Input: root = [1,2,2,null,3,null,3]
# Output: false
#
# Constraints:
#
# The number of nodes in the tree is in the range [1, 1000].
# -100 <= Node.val <= 100


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# Recursion
# Time O(n). Since traversing the entire input tree once, the total run time is O(n)
# Space O(n). The number of recursive calls is bound by the height of the tree. In the worst case, the tree is linear and the height is in O(n)
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        def isMirror(l: Optional[TreeNode], r: Optional[TreeNode]) -> bool:
            if not l and not r:
                return True
            if not l or not r:
                return False
            if l.val != r.val:
                return False
            return isMirror(l.left, r.right) and isMirror(l.right, r.left)

        return isMirror(root.left, root.right)
