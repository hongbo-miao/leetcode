# There is an integer array nums sorted in ascending order (with distinct values).
# Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
# Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
# You must write an algorithm with O(log n) runtime complexity.
#
# Example 1:
#
# Input: nums = [4,5,6,7,0,1,2], target = 0
# Output: 4
#
# Example 2:
#
# Input: nums = [4,5,6,7,0,1,2], target = 3
# Output: -1
#
# Example 3:
#
# Input: nums = [1], target = 0
# Output: -1
#
# Constraints:
#
# 1 <= nums.length <= 5000
# -10^4 <= nums[i] <= 10^4
# All values of nums are unique.
# nums is an ascending array that is possibly rotated.
# -10^4 <= target <= 10^4


# 1) Binary search
# https://leetcode.com/problems/search-in-rotated-sorted-array/discuss/273622/Javascript-Simple-O(log-N)-Binary-Search-Solution
#
# Time O(log n)
# Space O(1)
#
# e.g. [1, 2, 3, 4, 5, 6, 7]
#
# When you divide the rotated array into two halves, using mid index, at least one of them should remain sorted ALWAYS.
#
# [3, 4, 5] [6, 7, 1, 2] the left side remains sorted
# [6, 7, 1] [2, 3, 4, 5] the right side remains sorted
# [1, 2, 3] [4, 5, 6, 7] Both sides remain sorted.
#
# If you know one side is sorted, the rest of logic becomes very simple.
# If one side is sorted, check if the target is in the boundary, otherwise it's on the other side.
#
# IF smallest <= target <= biggest
#   then target is here
# ELSE
#   then target is on the other side
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l = 0
        r = len(nums) - 1
        while l <= r:
            m = (l + r) // 2
            if nums[m] == target:
                return m

            # When dividing the rotated array into two halves, one must be sorted
            # Check if the left side is sorted
            if nums[l] <= nums[m]:
                if nums[l] <= target <= nums[m]:
                    r = m - 1  # target is in the left
                else:
                    l = m + 1  # target is in the right
            else:
                if nums[m] <= target <= nums[r]:
                    l = m + 1  # target is in the right
                else:
                    r = m - 1  # target is in the left
        return -1


# 2) Binary search, similar to 1)
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l = 0
        r = len(nums) - 1
        while l + 1 < r:
            m = (l + r) // 2
            if nums[m] == target:
                return m
            if nums[l] < nums[m]:  # e.g. 4, 5, 6, 7
                if nums[l] <= target <= nums[m]:
                    r = m
                else:
                    l = m
            else:  # e.g. 7, 0, 1, 2
                if nums[m] <= target <= nums[r]:
                    l = m
                else:
                    r = m
        if nums[l] == target:
            return l
        if nums[r] == target:
            return r
        return -1
