# Given the head of a linked list, remove the nth node from the end of the list and return its head.
#
# Example 1:
#
# Input: head = [1,2,3,4,5], n = 2
# Output: [1,2,3,5]
#
# Example 2:
#
# Input: head = [1], n = 1
# Output: []
#
# Example 3:
#
# Input: head = [1,2], n = 1
# Output: [1]
#
# Constraints:
#
# The number of nodes in the list is sz.
# 1 <= sz <= 30
# 0 <= Node.val <= 100
# 1 <= n <= sz
#
# Follow up: Could you do this in one pass?


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Two pointers slow and fast
# Time O(n)
# Space O(1)
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        pre_head = ListNode(None)
        pre_head.next = head

        slow = pre_head
        fast = head

        # Move fast first so that the gap between slow and fast becomes n
        for _ in range(n):
            fast = fast.next

        while fast:
            slow = slow.next
            fast = fast.next

        # Remove the node
        slow.next = slow.next.next
        return pre_head.next
