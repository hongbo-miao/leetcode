# You are given two integer arrays nums and multipliers of size n and m respectively, where n >= m. The arrays are 1-indexed.
# You begin with a score of 0. You want to perform exactly m operations. On the ith operation (1-indexed), you will:
#
# - Choose one integer x from either the start or the end of the array nums.
# - Add multipliers[i] * x to your score.
# - Remove x from the array nums.
#
# Return the maximum score after performing m operations.
#
# Example 1:
#
# Input: nums = [1,2,3], multipliers = [3,2,1]
# Output: 14
# Explanation: An optimal solution is as follows:
# - Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
# - Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
# - Choose from the end, [1], adding 1 * 1 = 1 to the score.
# The total score is 9 + 4 + 1 = 14.
#
# Example 2:
#
# Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
# Output: 102
# Explanation: An optimal solution is as follows:
# - Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
# - Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
# - Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
# - Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
# - Choose from the end, [-2,7], adding 7 * 6 = 42 to the score.
# The total score is 50 + 15 - 9 + 4 + 42 = 102.
#
# Constraints:
#
# n == nums.length
# m == multipliers.length
# 1 <= m <= 10^3
# m <= n <= 10^5
# -1000 <= nums[i], multipliers[i] <= 1000


# 1) Dynamic Programming (Top-Down)
# We can easy to realise that this is a Dynamic Programming problem.
# In operation ith, we can choose to pick the left or the right side of nums.
# The naive dp has 3 params which is dp(l, r, i), time complexity = O(m^3), l and r can be picked up to m numbers.
# We can optimize to 2 params which is dp(l, i), time complexity = O(m^2) , we can compute params r base on l and i
#
# Time O(2 * m^2)
# Space O(m^2)
from functools import lru_cache


class Solution:
    def maximumScore(self, nums: List[int], multipliers: List[int]) -> int:
        # lru_cache from functools automatically memorizes the function
        @lru_cache(2000)
        def dp(i, l):
            # When i == m, that means we have no operations left. Therefore, we should return 0.
            if i == m:
                return 0

            r = n - 1 - (i - l)
            return max(
                dp(i + 1, l + 1) + multipliers[i] * nums[l],  # Pick the left side
                dp(i + 1, l) + multipliers[i] * nums[r],  # Pick the right side
            )

        n, m = len(nums), len(multipliers)
        return dp(0, 0)


# 2) Dynamic Programming (Bottom-Up), but the order in which we iterate needs to be precise.
# we need to iterate backwards starting from m (because the base case happens when i == m).
# We also need to initialize dp with one extra row so that we don't go out of bounds in the first iteration of the outer loop.
class Solution:
    def maximumScore(self, nums: List[int], multipliers: List[int]) -> int:
        n, m = len(nums), len(multipliers)
        dp = [[0] * (m + 1) for _ in range(m + 1)]

        for i in range(m - 1, -1, -1):
            for l in range(i, -1, -1):
                r = n - 1 - (i - l)
                dp[i][l] = max(
                    dp[i + 1][l + 1] + multipliers[i] * nums[l],  # Pick the left side
                    dp[i + 1][l] + multipliers[i] * nums[r],  # Pick the right side
                )
        return dp[0][0]
