# Given an unsorted integer array nums, return the smallest missing positive integer.
# You must implement an algorithm that runs in O(n) time and uses constant extra space.
#
# Example 1:
#
# Input: nums = [1,2,0]
# Output: 3
#
# Example 2:
#
# Input: nums = [3,4,-1,1]
# Output: 2
#
# Example 3:
#
# Input: nums = [7,8,9,11,12]
# Output: 1
#
# Constraints:
#
# 1 <= nums.length <= 5 * 10^5
# -2^31 <= nums[i] <= 2^31 - 1

# 1) Sorting
# Time O(n log n)
# Space O(1)
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        nums.sort()
        i = 1
        for n in nums:
            if n == i:
                i += 1
        return i


# 2) Set
# Time O(n)
# Space O(n)
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        unqiue = set(nums)
        i = 1
        while i in unqiue:
            i += 1
        return i


# 3)
# Time O(n)
# Space O(1)
#
# Put each number in its right place.
# When we find n, then swap it with nums[n - 1].
# At last, the first place where its number is not right, return the place + 1.
#
# e.g. [3, 4, -1, 1]
#
# i = 0
# nums = [-1, 4, 3, 1]
# i = 0
# i++
# i = 1
# nums = [-1, 1, 3, 4]
# i = 1
# nums = [1, -1, 3, 4]
# i = 1
# i++
# i = 2
# i++
# i = 3
# i++
# i = 4
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        i = 0
        while i < len(nums):
            if 0 < nums[i] <= len(nums) and nums[i] != nums[nums[i] - 1]:
                # Note the other order nums[i], nums[nums[i] - 1] = nums[nums[i] - 1], nums[i] will cause time out.
                # Because if change the value of nums[i] first, then [nums[i] - 1] changes.
                nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]
            else:
                i += 1
        for i in range(len(nums)):
            if nums[i] != i + 1:
                return i + 1
        return len(nums) + 1


# 4)
# Time O(n)
# Space O(1)
# https://leetcode.com/problems/first-missing-positive/discuss/17080/Python-O(1)-space-O(n)-time-solution-with-explanation
