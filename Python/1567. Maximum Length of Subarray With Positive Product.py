# Given an array of integers nums, find the maximum length of a subarray where the product of all its elements is positive.
# A subarray of an array is a consecutive sequence of zero or more values taken out of that array.
# Return the maximum length of a subarray with positive product.
#
# Example 1:
#
# Input: nums = [1,-2,-3,4]
# Output: 4
# Explanation: The array nums already has a positive product of 24.
#
# Example 2:
#
# Input: nums = [0,1,-2,-3,-4]
# Output: 3
# Explanation: The longest subarray with positive product is [1,-2,-3] which has a product of 6.
# Notice that we cannot include 0 in the subarray since that'll make the product 0 which is not positive.
#
# Example 3:
#
# Input: nums = [-1,-2,-3,0,1]
# Output: 2
# Explanation: The longest subarray with positive product is [-1,-2] or [-2,-3].
#
# Constraints:
#
# 1 <= nums.length <= 10^5
# -10^9 <= nums[i] <= 10^9


# 1) Dynamic Programming
# https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/discuss/819329/Python3GoJava-Dynamic-Programming-O(N)-time-O(1)-space
#
# Time O(n)
# Space O(n)
#
# pos[i], neg[i] represent longest consecutive numbers ending with nums[i] forming a positive/negative product
class Solution:
    def getMaxLen(self, nums: List[int]) -> int:
        n = len(nums)
        pos, neg = [0] * n, [0] * n
        if nums[0] > 0:
            pos[0] = 1
        if nums[0] < 0:
            neg[0] = 1
        res = pos[0]
        for i in range(1, n):
            if nums[i] > 0:
                pos[i] = 1 + pos[i - 1]
                neg[i] = 1 + neg[i - 1] if neg[i - 1] > 0 else 0
            elif nums[i] < 0:
                pos[i] = 1 + neg[i - 1] if neg[i - 1] > 0 else 0
                neg[i] = 1 + pos[i - 1]
            res = max(res, pos[i])
        return res


# 2) Dynamic Programming, similar to 1)
# Time O(n)
# Space O(1)
class Solution:
    def getMaxLen(self, nums: List[int]) -> int:
        n = len(nums)
        pos, neg = 0, 0
        if nums[0] > 0:
            pos = 1
        if nums[0] < 0:
            neg = 1
        res = pos
        for i in range(1, n):
            if nums[i] > 0:
                pos = 1 + pos
                neg = 1 + neg if neg > 0 else 0
            elif nums[i] < 0:
                pos = 1 + neg if neg > 0 else 0
                neg = 1 + pos
            else:
                pos, neg = 0, 0
            res = max(res, pos)
        return res
