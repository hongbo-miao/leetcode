# Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
#
# Example 1:
#
# Input: head = [1,2,3,4]
# Output: [2,1,4,3]
#
# Example 2:
#
# Input: head = []
# Output: []
#
# Example 3:
#
# Input: head = [1]
# Output: [1]
#
# Constraints:
#
# The number of nodes in the list is in the range [0, 100].
# 0 <= Node.val <= 100


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


# https://leetcode.com/problems/swap-nodes-in-pairs/discuss/171788/Python-or-Dummynode
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        dummy = ListNode(None)
        dummy.next = head
        cur = dummy

        while cur.next and cur.next.next:
            first = cur.next
            sec = cur.next.next

            cur.next = sec
            first.next = sec.next
            sec.next = first
            cur = cur.next.next
        return dummy.next
