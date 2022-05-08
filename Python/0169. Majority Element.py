# Given an array nums of size n, return the majority element.
# The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
#
# Example 1:
#
# Input: nums = [3,2,3]
# Output: 3
#
# Example 2:
#
# Input: nums = [2,2,1,1,1,2,2]
# Output: 2
#
# Constraints:
#
# n == nums.length
# 1 <= n <= 5 * 10^4
# -10^9 <= nums[i] <= 10^9
#
# Follow-up: Could you solve the problem in linear time and in O(1) space?


# 1) Sorting
# Time O(n log n)
# Space O(1)
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        nums.sort()
        return nums[len(nums) // 2]


# 2) Hashmap
# Time O(n)
# Space O(n)
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        dic = {}
        for n in nums:
            dic[n] = dic.get(n, 0) + 1
            if dic[n] > len(nums) / 2:
                return n
