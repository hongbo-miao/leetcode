# Given an integer array nums and an integer k, return the kth largest element in the array.
# Note that it is the kth largest element in the sorted order, not the kth distinct element.
#
# Example 1:
#
# Input: nums = [3,2,1,5,6,4], k = 2
# Output: 5
#
# Example 2:
#
# Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
# Output: 4
#
# Constraints:
#
# 1 <= k <= nums.length <= 10^4
# -10^4 <= nums[i] <= 10^4


# 1) Sorting
# Time O(n log n)
# Space O(1)
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return sorted(nums)[-k]


# 2)
# Time O(n)
# Space O(1)
#
# https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/60294/Solution-explained
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick_sort(l, r, k):
            # Quick sort idea
            # put nums that are <= pivot to the left
            # put nums that are > pivot to the right
            p = l
            for i in range(l, r):
                if nums[i] < nums[r]:
                    nums[i], nums[p] = nums[p], nums[i]
                    p += 1
            nums[p], nums[r] = nums[r], nums[p]
            # pivot is too small, so it must be on the right
            if p < k:
                return quick_sort(p + 1, r, k)
            # pivot is too big, so it must be on the left
            elif p > k:
                return quick_sort(l, p - 1, k)
            else:
                return nums[p]

        return quick_sort(0, len(nums) - 1, len(nums) - k)
