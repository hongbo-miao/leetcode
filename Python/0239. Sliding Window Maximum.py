# You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
# Return the max sliding window.
#
# Example 1:
#
# Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
# Output: [3,3,5,5,6,7]
# Explanation:
# Window position                Max
# ---------------               -----
# [1  3  -1] -3  5  3  6  7       3
#  1 [3  -1  -3] 5  3  6  7       3
#  1  3 [-1  -3  5] 3  6  7       5
#  1  3  -1 [-3  5  3] 6  7       5
#  1  3  -1  -3 [5  3  6] 7       6
#  1  3  -1  -3  5 [3  6  7]      7
#
# Example 2:
#
# Input: nums = [1], k = 1
# Output: [1]
#
# Constraints:
#
# 1 <= nums.length <= 10^5
# -10^4 <= nums[i] <= 10^4
# 1 <= k <= nums.length

# Notion

# 1) Monotonic Queue
# https://www.youtube.com/watch?v=2SXqBsTR6a8
#
# Time O(n)
# Space O(k)
#
# Using monotonic queue to push an element in the queue will pop all elements smaller than it.
#
# e.g. nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
#
# i  Window position             Monotonic queue  max
# 0                              [1]              -
# 1                              [3]              -
# 2  [1  3  -1] -3  5  3  6  7   [3, -1]          3
# 3   1 [3  -1  -3] 5  3  6  7   [3, -1, -3]      3
# 4   1  3 [-1  -3  5] 3  6  7   [5]              5
# 5   1  3  -1 [-3  5  3] 6  7   [5, 3]           5
# 6   1  3  -1  -3 [5  3  6] 7   [6]              6
# 7   1  3  -1  -3  5 [3  6  7]  [7]              7
#

# e.g. nums = [1, 3, -1, 8, 5, 3, 6, 7], k = 3
#
# i  Window position            Monotonic queue  max
# 0                             [1]              -
# 1                             [3]              -
# 2  [1  3  -1] 8  5  3  6  7   [3, -1]          3
# 3   1 [3  -1  8] 5  3  6  7   [8]              8
# 4   1  3 [-1  8  5] 3  6  7   [8, 5]           5
# 5   1  3  -1 [8  5  3] 6  7   [8, 5, 3]        5
# 6   1  3  -1  8 [5  3  6] 7   [6]              6
# 7   1  3  -1  8  5 [3  6  7]  [7]              7


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        res = []
        q = []
        for i in range(len(nums)):
            while q and nums[i] > q[-1]:
                q.pop()
            q.append(nums[i])

            # When i + 1 >= k, the window kas k nums now
            if i + 1 >= k:
                res.append(q[0])

                # If the biggest element in q is about to exit window, remove it from q
                if nums[i - k + 1] == q[0]:
                    q.pop(0)
        return res
