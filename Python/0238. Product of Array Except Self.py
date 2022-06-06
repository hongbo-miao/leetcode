# Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
# The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
# You must write an algorithm that runs in O(n) time and without using the division operation.
#
# Example 1:
#
# Input: nums = [1,2,3,4]
# Output: [24,12,8,6]
#
# Example 2:
#
# Input: nums = [-1,1,0,-3,3]
# Output: [0,0,9,0,0]
#
# Constraints:
# 2 <= nums.length <= 10^5
# -30 <= nums[i] <= 30
# The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
#
# Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)


# 1) Left and Right product lists
# Time O(n)
# Space O(n)
#
# Idea
# The trick is to construct the arrays (in the case for 4 elements)
# [             1,       a[0],  a[0]*a[1],  a[0]*a[1]*a[2]]
# [a[1]*a[2]*a[3],  a[2]*a[3],       a[3],               1]
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)

        l = [1] * n
        p = 1
        for i in range(n):
            l[i] = p
            p *= nums[i]

        r = [1] * n
        p = 1
        for i in range(n - 1, -1, -1):
            r[i] = p
            p *= nums[i]

        return [l[i] * r[i] for i in range(n)]


# 2) Left and Right product lists, similar to 1), but less clear
# Time O(n)
# Space O(1)
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        p = 1
        for i in range(n - 1, -1, -1):
            res[i] *= p
            p *= nums[i]
        return res
