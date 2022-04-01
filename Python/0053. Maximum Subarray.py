# Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
#
# A subarray is a contiguous part of an array.
#
# Example 1:
#
# Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
# Output: 6
# Explanation: [4,-1,2,1] has the largest sum = 6.
#
# Example 2:
#
# Input: nums = [1]
# Output: 1
#
# Example 3:
#
# Input: nums = [5,4,-1,7,8]
# Output: 23
#
# Constraints:
#
# 1 <= nums.length <= 105
# -10^4 <= nums[i] <= 10^4


# 1) Brute Force (Time Limit Exceeded)
# Time: O(n^3)
# Space: O(1)
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        m = nums[0]
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                m = max(m, sum(nums[i : j + 1]))
        return m


# 2) Dynamic programming - Kadane's algorithm
# Similar
# 152. Maximum Product Subarray
#
# Time O(n)
# Space O(1)
#
# Idea
# Suppose we've solved the problem for A[1 .. i - 1]; how can we extend that to A[1 .. i]?
#
# Example
# 5 -12 10
#
# 5
# 5
#    -7
#     5
#       10 (recalculate from nums[i])
#       10
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        if not nums:
            return 0
        cur_m = nums[0]
        m = nums[0]
        for i in range(1, len(nums)):
            cur_m = max(nums[i], cur_m + nums[i])
            m = max(m, cur_m)
        return m
