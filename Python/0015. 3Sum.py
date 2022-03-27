# Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
# Notice that the solution set must not contain duplicate triplets.
#
# Example 1:
#
# Input: nums = [-1,0,1,2,-1,-4]
# Output: [[-1,-1,2],[-1,0,1]]
#
# Example 2:
#
# Input: nums = []
# Output: []
#
# Example 3:
#
# Input: nums = [0]
# Output: []
#
# Constraints:
#
# 0 <= nums.length <= 3000
# -10^5 <= nums[i] <= 10^5


# Three pointers
# https://www.youtube.com/watch?v=y-zBV7uUkyI
#
# Idea
# Select a first, move b to right, and move c to left
#
# Time O(n^2)
#
# Example
# -1, 0, 1, 2, -1, -4
#  a  b             c
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []

        nums.sort()
        res = []

        # Using len(nums) - 2 because of three pointers a, b, c
        for i in range(len(nums) - 2):
            a = nums[i]

            # Move a to next different one to avoid duplicate results
            if i - 1 >= 0 and a == nums[i - 1]:
                continue

            l = i + 1
            r = len(nums) - 1
            while l < r:
                b = nums[l]
                c = nums[r]
                sum = a + b + c

                if sum < 0:
                    l += 1
                elif sum > 0:
                    r -= 1
                else:
                    res.append([a, b, c])

                    # Move b to next different one
                    while l < r and nums[l] == b:
                        l += 1

                    # Move c to previous different one
                    while l < r and nums[r] == c:
                        r -= 1
        return res
