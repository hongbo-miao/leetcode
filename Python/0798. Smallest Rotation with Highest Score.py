# You are given an array nums. You can rotate it by a non-negative integer k so that the array becomes [nums[k], nums[k + 1], ... nums[nums.length - 1], nums[0], nums[1], ..., nums[k-1]]. Afterward, any entries that are less than or equal to their index are worth one point.
# For example, if we have nums = [2,4,1,3,0], and we rotate by k = 2, it becomes [1,3,0,2,4]. This is worth 3 points because 1 > 0 [no points], 3 > 1 [no points], 0 <= 2 [one point], 2 <= 3 [one point], 4 <= 4 [one point].
# Return the rotation index k that corresponds to the highest score we can achieve if we rotated nums by it. If there are multiple answers, return the smallest such index k.
#
# Example 1:
#
# Input: nums = [2,3,1,4,0]
# Output: 3
# Explanation: Scores for each k are listed below:
# k = 0,  nums = [2,3,1,4,0],    score 2
# k = 1,  nums = [3,1,4,0,2],    score 3
# k = 2,  nums = [1,4,0,2,3],    score 3
# k = 3,  nums = [4,0,2,3,1],    score 4
# k = 4,  nums = [0,2,3,1,4],    score 3
# So we should choose k = 3, which has the highest score.
#
# Example 2:
#
# Input: nums = [1,3,0,2,4]
# Output: 0
# Explanation: nums will always have 3 points no matter how it shifts.
# So we will choose the smallest k, which is 0.
#
# Constraints:
#
# 1 <= nums.length <= 10^5
# 0 <= nums[i] < nums.length


# https://leetcode.com/problems/smallest-rotation-with-highest-score/discuss/118725/C%2B%2BJavaPython-Solution-with-Explanation
# Assume that the input array is [2, 3, 1, 4, 0] so that the expected output is 3.
#
# Initialize the change array with [1] * N, where N = len(A).
#
# index  = `[0, 1, 2, 3, 4]`
#  nums  = `[2, 3, 1, 4, 0]`
# change = `[1, 1, 1, 1, 1]`
# For the first loop, the idea is to find the index of K that starts losing points. The constraint is that any entries that are less than or equal to their index are worth 1 point. So i - A[i] + 1 comes, and % N is to guarantee the indices within the change's array range.
#
# With change[(i - A[i] + 1) % N] -= 1:
#
# + i = 0:
#
#     + change[(0 - 2 + 1) % 5] -= 1 => change[4] = 1 - 1 = 0
#
#           index  = `[0, 1, 2, 3, 4]`
#            nums  = `[2, 3, 1, 4, 0]`
#           change = `[1, 1, 1, 1, 0]` # update after i = 0.
#
# + i = 1:
#
#     + change[(1 - 3 + 1) % 5] -= 1 => change[4] = 0 - 1 = -1
#
#           index  = `[0, 1, 2, 3, 4]`
#            nums  = `[2, 3, 1, 4, 0]`
#           change = `[1, 1, 1, 1, -1]` # update after i = 1.
#
# + i = 2:
#
#     + change[(2 - 1 + 1) % 5] -= 1 => change[2] = 1 - 1 = 0
#
#           index  = `[0, 1, 2, 3, 4]`
#            nums  = `[2, 3, 1, 4, 0]`
#           change = `[1, 1, 0, 1, -1]` # update after i = 2.
#
# + i = 3:
#
#     + change[(3 - 4 + 1) % 5] -= 1 => change[0] = 1 - 1 = 0
#
#           index  = `[0, 1, 2, 3, 4]`
#            nums  = `[2, 3, 1, 4, 0]`
#           change = `[0, 1, 0, 1, -1]` # update after i = 3.
#
# + i = 4:
#
#     + change[(4 - 0 + 1) % 5] -= 1 => change[0] = 0 - 1 = -1
#
#           index   = `[0, 1, 2, 3, 4]`
#            nums   = `[2, 3, 1, 4, 0]`
#           change = `[-1, 1, 0, 1, -1]` # update after i = 4.
# Now you can see that the change array becomes [-1, 1, 0, 1, -1].
#
# The second for loop actually calculate total changes in k step moving left via k - 1, so you could think of
# totalChange[k] = totalChange[k - 1] + change[k], as an equivalent as change[k] += change[k - 1]
# After the second loop, the change array is:
# (old) change = `[-1, 1, 0, 1, -1]`
#       index  = `[0,  1, 2, 3, 4]`
#       change = `[-1, 0, 0, 1, 0]`
# Return the index of the max value of the change array, which is 3.
#
# Time O(N)
# Space O(N)
class Solution:
    def bestRotation(self, nums: List[int]) -> int:
        N = len(nums)
        change = [1] * N
        for i in range(N):
            change[(i - nums[i] + 1) % N] -= 1
        for i in range(1, N):
            change[i] += change[i - 1]
        return change.index(max(change))
