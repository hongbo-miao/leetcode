# Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
# A subarray is a contiguous non-empty sequence of elements within an array.
#
# Example 1:
#
# Input: nums = [1,1,1], k = 2
# Output: 2
#
# Example 2:
#
# Input: nums = [1,2,3], k = 3
# Output: 2
#
# Constraints:
#
# 1 <= nums.length <= 2 * 10^4
# -1000 <= nums[i] <= 1000
# -10^7 <= k <= 10^7

# Notion

# 1) Prefix Sum (Time Limit Exceeded)
# Time O(n^2)
# Space O(1)
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        count = 0
        for i in range(len(nums)):
            sum = 0
            for j in range(i, len(nums)):
                sum += nums[j]
                if sum == k:
                    count += 1
        return count


# 2) Hashmap + Prefix Sum
# Time O(n)
# Space O(n)
#
# Idea
# Using a hashmap to store number of a prefix sum occurs so far
# Let sum = sum[0] + sum[1] + ... + sum[i]
# Check how many prefix sum (j's) equals to sum - k
# If nums[0] + ... + nums[j] = sum - k
# then there same number of j's that nums[j+1] + ... + nums[i] = k
import collections


class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        dic = collections.defaultdict(int)
        dic[0] = 1
        count = 0
        sum = 0
        for n in nums:
            sum += n
            count += dic[sum - k]
            dic[sum] += 1
        return count
