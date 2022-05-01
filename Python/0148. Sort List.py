# Given the head of a linked list, return the list after sorting it in ascending order.
#
# Example 1:
#
# Input: head = [4,2,1,3]
# Output: [1,2,3,4]
#
# Example 2:
#
# Input: head = [-1,5,3,4,0]
# Output: [-1,0,3,4,5]
#
# Example 3:
#
# Input: head = []
# Output: []
#
# Constraints:
#
# The number of nodes in the list is in the range [0, 5 * 10^4].
# -10^5 <= Node.val <= 10^5
#
# Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Merge sort
# Time O(n log n)
# Space O(n)
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return head

        left, right = self.split(head)
        l1 = self.sortList(head)
        l2 = self.sortList(right)
        return self.merge(l1, l2)

    # Similar
    # 141. Linked List Cycle
    def split(self, head):
        slow = head
        fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None
        return head, mid

    # Similar
    # 21. Merge Two Sorted Lists
    def merge(self, l1, l2):
        l = ListNode(None)
        pre_head = l

        while l1 and l2:
            if l1.val < l2.val:
                l.next = l1
                l1 = l1.next
            else:
                l.next = l2
                l2 = l2.next
            l = l.next
        l.next = l1 or l2
        return pre_head.next
