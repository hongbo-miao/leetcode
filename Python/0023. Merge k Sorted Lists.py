# You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
# Merge all the linked-lists into one sorted linked-list and return it.
#
# Example 1:
#
# Input: lists = [[1,4,5],[1,3,4],[2,6]]
# Output: [1,1,2,3,4,4,5,6]
# Explanation: The linked-lists are:
# [
#   1->4->5,
#   1->3->4,
#   2->6
# ]
# merging them into one sorted list:
# 1->1->2->3->4->4->5->6
#
# Example 2:
#
# Input: lists = []
# Output: []
#
# Example 3:
#
# Input: lists = [[]]
# Output: []
#
# Constraints:
#
# k == lists.length
# 0 <= k <= 10^4
# 0 <= lists[i].length <= 500
# -10^4 <= lists[i][j] <= 10^4
# lists[i] is sorted in ascending order.
# The sum of lists[i].length will not exceed 10^4.


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# 1) Merge lists one by one
# Time O(k * n) where k is the number of linked lists.
# - We can merge two sorted linked list in O(n) time, where n is the total number of nodes in two lists.
#
# Space O(1)
# - We can merge two sorted linked list in O(1) space.
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None
        if len(lists) == 1:
            return lists[0]

        m = len(lists) // 2
        return self.mergeTwoLists(
            self.mergeKLists(lists[:m]),
            self.mergeKLists(lists[m:]),
        )

    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if not list1:
            return list2
        if not list2:
            return list1

        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2


# 2) Merge with divide and conquer
# This approach walks alongside the one above but is improved a lot. We don't need to traverse most nodes many
# times repeatedly
# - Pair up k lists and merge each pair.
# - After the first pairing, k lists are merged into k/2 lists with average 2N/k length, then k/4, k/8 and so on.
# - Repeat this procedure until we get the final sorted linked list.
# Thus, we'll traverse almost n nodes per pairing and merging, and repeat this procedure about log k times.
#
# l0 l1 l2 l3 l4 l5
#   l0    l2    l4
#      l0       l4
#           l0
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None
        interval = 1
        while interval < len(lists):
            for i in range(0, len(lists) - interval, interval * 2):
                lists[i] = self.mergeTwoLists(lists[i], lists[i + interval])
            interval *= 2
        return lists[0]

    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if not list1:
            return list2
        if not list2:
            return list1

        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2
