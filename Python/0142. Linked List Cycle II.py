# Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
# There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.
# Do not modify the linked list.
#
# Example 1:
#
# Input: head = [3,2,0,-4], pos = 1
# Output: tail connects to node index 1
# Explanation: There is a cycle in the linked list, where tail connects to the second node.
#
# Example 2:
#
# Input: head = [1,2], pos = 0
# Output: tail connects to node index 0
# Explanation: There is a cycle in the linked list, where tail connects to the first node.
#
# Example 3:
#
# Input: head = [1], pos = -1
# Output: no cycle
# Explanation: There is no cycle in the linked list.
#
# Constraints:
#
# The number of the nodes in the list is in the range [0, 10^4].
# -10^5 <= Node.val <= 10^5
# pos is -1 or a valid index in the linked-list.
#
# Follow up: Can you solve it using O(1) (i.e. constant) memory?


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# 1) Hashset
# Time O(n)
# Space O(n)
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        seen = set()
        node = head
        while node is not None:
            if node in seen:
                return node
            else:
                seen.add(node)
                node = node.next
        return None


# 2) Two pointers slow and fast (Floyd's Tortoise and Hare)
# Time O(n)
# Space O(1)
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None

        def get_intersect(head):
            slow = head
            fast = head
            while fast.next and fast.next.next:
                slow = slow.next
                fast = fast.next.next
                if slow == fast:
                    return slow
            return None

        intersect = get_intersect(head)
        if not intersect:
            return None

        slow = head
        fast = intersect
        while slow != fast:
            slow = slow.next
            fast = fast.next
        return slow
