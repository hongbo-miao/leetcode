# A peak element is an element that is strictly greater than its neighbors.
# Given an integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
# You may imagine that nums[-1] = nums[n] = -∞.
# You must write an algorithm that runs in O(log n) time.
#
# Example 1:
#
# Input: nums = [1,2,3,1]
# Output: 2
# Explanation: 3 is a peak element and your function should return the index number 2.
#
# Example 2:
#
# Input: nums = [1,2,1,3,5,6,4]
# Output: 5
# Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
#
# Constraints:
#
# 1 <= nums.length <= 1000
# -2^31 <= nums[i] <= 2^31 - 1
# nums[i] != nums[i + 1] for all valid i.


# 1) Binary search
# Time O(log n). We reduce the search space in half at every step. Thus, the total search space will be consumed in log(n) steps. n refers to the size of nums array
# Space O(1)
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l = 0
        # Using r = len(nums) will cause later nums[m + 1] index out of range
        r = len(nums) - 1

        while l < r:
            m = (l + r) // 2
            if nums[m] < nums[m + 1]:
                l = m + 1
            else:
                r = m
        return l


# 2) Binary search, similar to 2)
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l = 0
        r = len(nums) - 1
        while l + 1 < r:
            m = (l + r) // 2
            if nums[m] < nums[m + 1]:
                l = m
            else:
                r = m
        return l if nums[l] > nums[r] else r
