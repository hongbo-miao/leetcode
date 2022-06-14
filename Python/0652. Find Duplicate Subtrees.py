# Given the root of a binary tree, return all duplicate subtrees.
# For each kind of duplicate subtrees, you only need to return the root node of any one of them.
# Two trees are duplicate if they have the same structure with the same node values.
#
# Example 1:
#
# Input: root = [1,2,3,4,null,2,4,null,null,4]
# Output: [[2,4],[4]]
#
# Example 2:
#
# Input: root = [2,1,1]
# Output: [[1]]
#
# Example 3:
#
# Input: root = [2,2,2,3,null,3,null]
# Output: [[2,3],[3]]
#
# Constraints:
#
# The number of the nodes in the tree will be in the range [1, 10^4]
# -200 <= Node.val <= 200


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# var findDuplicateSubtrees = function(root) {
#   const map = new Map(), res = []
#   dfs(root, map, res)
#   return res
# };
#
# function dfs(root, map, res){
#   if(!root) return '#'
#   const subtree = `${root.val}.${dfs(root.left,map,res)}.${dfs(root.right, map,res)}`
#   map.set(subtree,(map.get(subtree)||0) + 1)
#   if(map.get(subtree) === 2){
#     res.push(root)
#   }
#   return subtree
# }

# Recursion
from collections import Counter


class Solution:
    def findDuplicateSubtrees(
        self, root: Optional[TreeNode]
    ) -> List[Optional[TreeNode]]:
        seen = Counter()
        res = []

        def go(node):
            if not node:
                return None
            sub = tuple([go(node.left), node.val, go(node.right)])
            if seen[sub] == 1:
                res.append(node)
            seen[sub] += 1
            return sub

        go(root)
        return res
