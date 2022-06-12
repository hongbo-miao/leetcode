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


# https://leetcode.com/problems/smallest-rotation-with-highest-score/solution/
#
# Time O(N)
# Space O(N)
#
# Intuition
# Say N = 10 and A[2] = 5. Then there are 5 rotations that are bad for this number: rotation indexes 0, 1, 2, 8, 9 - these rotations will cause this number to not get 1 point later.
# In general, for each number in the array, we can map out what rotation indexes will be bad for this number. It will always be a region of one interval, possibly two if the interval wraps around (eg. 8, 9, 0, 1, 2 wraps around, to become [8, 9] and [0, 1, 2].)
# At the end of plotting these intervals, we need to know which rotation index has the least intervals overlapping it - this one is the answer.
#
# Algorithm
# First, an element like A[2] = 5 will not get score in (up to) 5 posiitons: when the 5 is at final index 0, 1, 2, 3, or 4. When we shift by 2, we'll get final index 0. If we shift 5-1 = 4 before this, this element will end up at final index 4. In general (modulo N), a shift of i - A[i] + 1 to i will be the rotation indexes that will make A[i] not score a point.
# If we are trying to plot an interval like [2, 3, 4], then instead of doing bad[2]--; bad[3]--; bad[4]--;, what we will do instead is keep track of the cumulative total: bad[2]--; bad[5]++. For "wrap-around" intervals like [8, 9, 0, 1, 2], we will keep track of this as two separate intervals: bad[8]--, bad[10]++, bad[0]--, bad[3]++. (Actually, because of our implementation, we don't need to remember the bad[10]++ part.)
# At the end, we want to find a rotation index with the least intervals overlapping. We'll maintain a cumulative total cur representing how many intervals are currently overlapping our current rotation index, then update it as we step through each rotation index.
class Solution:
    def bestRotation(self, nums: List[int]) -> int:
        N = len(nums)
        bad = [0] * N
        for i, x in enumerate(nums):
            left, right = (i - x + 1) % N, (i + 1) % N
            bad[left] -= 1
            bad[right] += 1
            if left > right:
                bad[0] -= 1

        best = -N
        res = cur = 0
        for i, score in enumerate(bad):
            cur += score
            if cur > best:
                best = cur
                res = i
        return res
