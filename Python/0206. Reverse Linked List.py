# Given the head of a singly linked list, reverse the list, and return the reversed list.
#
# Example 1:
#
# Input: head = [1,2,3,4,5]
# Output: [5,4,3,2,1]
#
# Example 2:
#
# Input: head = [1,2]
# Output: [2,1]
#
# Example 3:
#
# Input: head = []
# Output: []
#
# Constraints:
#
# The number of nodes in the list is the range [0, 5000].
# -5000 <= Node.val <= 5000
#
# Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# 1) Iteration
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        cur = head
        while head.next:
            p = head.next
            head.next = p.next
            p.next = cur
            cur = p
        return cur


# 2) Recursion
# https://leetcode.com/problems/reverse-linked-list/solution/
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head
