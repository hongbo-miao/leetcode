# Given the head of a singly linked list, return true if it is a palindrome.
#
# Example 1:
#
# Input: head = [1,2,2,1]
# Output: true
#
# Example 2:
#
# Input: head = [1,2]
# Output: false
#
# Constraints:
#
# The number of nodes in the list is in the range [1, 105].
# 0 <= Node.val <= 9
#
# Follow up: Could you do it in O(n) time and O(1) space?


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# 1) Stack
# Time O(n)
# Space O(n)
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head:
            return True
        st = []
        old_head = head
        while head:
            st.append(head.val)
            head = head.next
        while old_head:
            if old_head.val != st.pop():
                return False
            old_head = old_head.next
        return True


# 2) Reverse the 2nd half list
# Time O(n)
# Space O(1)
#
# This can be solved by reversing the 2nd half and compare the two halves. Let's start with an example [1, 2, 2, 1].
# In the beginning, set two pointers fast and slow starting at the head.
#
# 1 -> 2 -> 2 -> 1 -> null
# s,f
# (1) Move: fast pointer goes to the end, and slow goes to the middle.
#
# 1 -> 2 -> 2 -> 1 -> null
#           s          f
# (2) Reverse: the right half is reversed, and slow pointer becomes the head2.
#
# 1 -> 2    null <- 2 <- 1
# h                      h2
# (3) Compare: run the two pointers head and head2 together and compare.
#
# 1 -> 2    null <- 2 <- 1
#      h            h2
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head:
            return True

        # Find the middle (or middle + 1) node
        fast = slow = head
        while (
            fast and fast.next
        ):  # Note here cannot be while fast.next and fast.next.next
            fast = fast.next.next
            slow = slow.next

        # Reverse the second half
        head2 = self.reverse_list(slow)

        # Compare the first half second reversed half
        while head2:
            if head2.val != head.val:
                return False
            head2 = head2.next
            head = head.next
        return True

    def reverse_list(self, head):
        cur = head
        while head.next:
            p = head.next
            head.next = p.next
            p.next = cur
            cur = p
        return cur
