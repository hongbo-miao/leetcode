# Given an integer array nums, return the length of the longest strictly increasing subsequence.
# A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
#
# Example 1:
#
# Input: nums = [10,9,2,5,3,7,101,18]
# Output: 4
# Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
#
# Example 2:
#
# Input: nums = [0,1,0,3,2,3]
# Output: 4
#
# Example 3:
#
# Input: nums = [7,7,7,7,7,7,7]
# Output: 1
#
# Constraints:
#
# 1 <= nums.length <= 2500
# -10^4 <= nums[i] <= 10^4
#
# Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

# Notion

# 1) Dynamic programming
# Similar
# 279. Perfect Squares
# 300. Longest Increasing Subsequence
# 322. Coin Change
#
# Time O(n^2)
# Space O(n)
#
# Example
# nums: [10,9,2,5,3,7,101,18]
# dp:   [ 1,1,1,2,2,3,  4, 4]
# res:  4
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:
            return 0

        # dp[i] is the length of the longest strictly increasing subsequence (LIS) ending with nums[i]
        dp = [1] * len(nums)
        for i in range(1, len(nums)):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)


# 2) Dynamic programming with binary search
# https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation
#
# Time O(n log n)
# Space O(n)
