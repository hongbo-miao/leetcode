# Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
# The overall run time complexity should be O(log (m+n)).
#
# Example 1:
#
# Input: nums1 = [1,3], nums2 = [2]
# Output: 2.00000
# Explanation: merged array = [1,2,3] and median is 2.
#
# Example 2:
#
# Input: nums1 = [1,2], nums2 = [3,4]
# Output: 2.50000
# Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
#
# Constraints:
#
# nums1.length == m
# nums2.length == n
# 0 <= m <= 1000
# 0 <= n <= 1000
# 1 <= m + n <= 2000
# -10^6 <= nums1[i], nums2[i] <= 10^6

# 1) Sorting
# Time O((m + n)log(m + n))
# Space O(m + n)
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        nums = nums1 + nums2
        nums.sort()
        if len(nums) % 2 == 1:
            return nums[len(nums) // 2]
        else:
            return (nums[len(nums) // 2 - 1] + nums[len(nums) // 2]) / 2


# 2) Binary Search (Notion)
# https://zxi.mytechroad.com/blog/algorithms/binary-search/leetcode-4-median-of-two-sorted-arrays/
#
# Time O(log(m + n))
# Space O(1)
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        n1 = len(nums1)
        n2 = len(nums2)
        if n1 > n2:
            return self.findMedianSortedArrays(nums2, nums1)

        k = (n1 + n2 + 1) // 2
        l = 0
        r = n1
        while l < r:
            m1 = (l + r) // 2
            m2 = k - m1
            if nums1[m1] < nums2[m2 - 1]:
                l = m1 + 1
            else:
                r = m1
        m1 = l
        m2 = k - l
        c1 = max(
            -float("inf") if m1 == 0 else nums1[m1 - 1],
            -float("inf") if m2 == 0 else nums2[m2 - 1],
        )
        if (n1 + n2) % 2 == 1:
            return c1
        c2 = min(
            float("inf") if m1 == n1 else nums1[m1],
            float("inf") if m2 == n2 else nums2[m2],
        )
        return (c1 + c2) / 2
