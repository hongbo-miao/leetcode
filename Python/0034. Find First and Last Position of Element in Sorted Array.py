# Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
# If target is not found in the array, return [-1, -1].
# You must write an algorithm with O(log n) runtime complexity.
#
# Example 1:
#
# Input: nums = [5,7,7,8,8,10], target = 8
# Output: [3,4]
#
# Example 2:
#
# Input: nums = [5,7,7,8,8,10], target = 6
# Output: [-1,-1]
#
# Example 3:
#
# Input: nums = [], target = 0
# Output: [-1,-1]
#
# Constraints:
#
# 0 <= nums.length <= 10^5
# -10^9 <= nums[i] <= 10^9
# nums is a non-decreasing array.
# -10^9 <= target <= 10^9


# 1) Brute force / Linear scan
# Time O(n)
# Space O(1)


# 2) Binary search
# Time O(log n)
# Space O(1)
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        l = Solution.lower_bound(nums, target)
        r = Solution.upper_bound(nums, target) - 1
        if l <= r:
            return [l, r]
        return [-1, -1]

    @staticmethod
    def lower_bound(nums: List[int], target: int) -> int:
        l = 0
        r = len(nums)
        while l < r:
            m = (l + r) // 2
            if nums[m] < target:
                l = m + 1
            else:
                r = m
        return l

    @staticmethod
    def upper_bound(nums: List[int], target: int) -> int:
        l = 0
        r = len(nums)
        while l < r:
            m = (l + r) // 2
            if nums[m] <= target:
                l = m + 1
            else:
                r = m
        return l


# 3) Binary search, similar to 2)
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        l = Solution.lower_bound(nums, target)
        r = Solution.lower_bound(nums, target + 1) - 1
        if l <= r:
            return [l, r]
        return [-1, -1]

    @staticmethod
    def lower_bound(nums: List[int], target: int) -> int:
        l = 0
        r = len(nums)
        while l < r:
            m = (l + r) // 2
            if nums[m] < target:
                l = m + 1
            else:
                r = m
        return l
