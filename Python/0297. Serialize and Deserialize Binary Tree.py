# Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
# Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
# Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
#
# Example 1:
#
# Input: root = [1,2,3,null,null,4,5]
# Output: [1,2,3,null,null,4,5]
#
# Example 2:
#
# Input: root = []
# Output: []
#
# Constraints:
#
# The number of nodes in the tree is in the range [0, 10^4].
# -1000 <= Node.val <= 1000


# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


# DFS
# Time O(n)
# Space O(n)
#
# e.g.
#    1
#   / \
#  2   3
#     / \
#    4   5
#
# data = [1, 2, null, null, 3, 4, null, null, 5, null, null]

# 1) Old version, not pass the tests anymore
class Codec:
    def serialize(self, root):
        if not root:
            return "x"
        return root.val, self.serialize(root.left), self.serialize(root.right)

    def deserialize(self, data):
        if data[0] == "x":
            return None
        node = TreeNode(data[0])
        node.left = self.deserialize(data[1])
        node.right = self.deserialize(data[2])
        return node


# 2) New version
class Codec:
    def serialize(self, root):
        if not root:
            return "x"
        return ",".join(
            [str(root.val), self.serialize(root.left), self.serialize(root.right)]
        )

    def deserialize(self, data):
        # The reason I use self.data in the deserialize is, data stream will be consumed as we build left side of Tree
        # by the time when the right side is building up, we need to hold what is left over.
        # Therefore, self.data is a global value, right side will use what is left over after tree is partially built
        self.data = data
        if self.data[0] == "x":
            return None
        node = TreeNode(self.data[: self.data.find(",")])
        node.left = self.deserialize(self.data[self.data.find(",") + 1 :])
        node.right = self.deserialize(self.data[self.data.find(",") + 1 :])
        return node
