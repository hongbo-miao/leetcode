# Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
# Return the sum of the three integers.
# You may assume that each input would have exactly one solution.
#
# Example 1:
#
# Input: nums = [-1,2,1,-4], target = 1
# Output: 2
# Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
#
# Example 2:
#
# Input: nums = [0,0,0], target = 1
# Output: 0
#
# Constraints:
#
# 3 <= nums.length <= 1000
# -1000 <= nums[i] <= 1000
# -10^4 <= target <= 10^4


# 3 pointers
# Time Complexity: O(n^2). We have outer and inner loops, each going through nn elements.
#   Sorting the array takes O(nlogn), so overall complexity is O(nlogn + n^2).
#   This is asymptotically equivalent to O(n^2).
# Space from O(logn) to O(n), depending on the implementation of the sorting algorithm.
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        diff = float("inf")
        nums.sort()
        for i in range(len(nums)):
            l, r = i + 1, len(nums) - 1
            while l < r:
                sum = nums[i] + nums[l] + nums[r]
                if abs(target - sum) < abs(diff):
                    diff = target - sum
                if sum < target:
                    l += 1
                else:
                    r -= 1
            if diff == 0:
                break
        return target - diff
