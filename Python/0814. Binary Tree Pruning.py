# Given the root of a binary tree, return the same tree where every subtree (of the given tree) not containing a 1 has been removed.
# A subtree of a node node is node plus every node that is a descendant of node.
#
# Example 1:
#
# Input: root = [1,null,0,0,1]
# Output: [1,null,0,null,1]
# Explanation:
# Only the red nodes satisfy the property "every subtree not containing a 1".
# The diagram on the right represents the answer.
#
# Example 2:
#
# Input: root = [1,0,1,0,0,0,1]
# Output: [1,null,1,null,1]
#
# Example 3:
#
# Input: root = [1,1,0,1,1,0,1,0]
# Output: [1,1,0,1,1,null,1]
#
# Constraints:
#
# The number of nodes in the tree is in the range [1, 200].
# Node.val is either 0 or 1.


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

# Recursion
# Time O(N), where N is the number of nodes in the tree. We process each node once.
# Space O(N), the recursion call stack can be as large as the height H of the tree.
#   In the worst case scenario, H=N, when the tree is skewed.
class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return None
        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)
        if root.val == 0 and root.left is None and root.right is None:
            return None
        return root
