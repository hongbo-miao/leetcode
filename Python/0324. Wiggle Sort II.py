# Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....
# You may assume the input array always has a valid answer.
#
# Example 1:
#
# Input: nums = [1,5,1,1,6,4]
# Output: [1,6,1,5,1,4]
# Explanation: [1,4,1,5,1,6] is also accepted.
#
# Example 2:
#
# Input: nums = [1,3,2,2,3,1]
# Output: [2,3,1,3,1,2]
#
# Constraints:
#
# 1 <= nums.length <= 5 * 10^4
# 0 <= nums[i] <= 5000
# It is guaranteed that there will be an answer for the given input nums.
#
# Follow Up: Can you do it in O(n) time and/or in-place with O(1) extra space?


# 1)
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        nums.sort()
        l = len(nums)
        m = l // 2
        k = m - 1 if l % 2 == 0 else m  # middle index

        copy = nums[:]
        j = l - 1
        for i in range(0, l, 2):
            nums[i] = copy[k]
            if i < l - 1:
                nums[i + 1] = copy[j]
            k -= 1
            j -= 1


# 2)
# https://leetcode.com/problems/wiggle-sort-ii/discuss/77682/Step-by-step-explanation-of-index-mapping-in-Java
