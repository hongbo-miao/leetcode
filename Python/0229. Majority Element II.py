# Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
#
# Example 1:
#
# Input: nums = [3,2,3]
# Output: [3]
#
# Example 2:
#
# Input: nums = [1]
# Output: [1]
#
# Example 3:
#
# Input: nums = [1,2]
# Output: [1,2]
#
# Constraints:
#
# 1 <= nums.length <= 5 * 10^4
# -10^9 <= nums[i] <= 10^9
#
# Follow up: Could you solve the problem in linear time and in O(1) space?

# Notion

# Boyer-Moore Voting Algorithm
# Time O(N) where N is the size of nums.
#   We first go through nums looking for first and second potential candidates.
#   We then count the number of occurrences for these two potential candidates in nums.
#   Therefore, our runtime is O(N) + O(N) = O(2N) ≈ O(N).
# Space O(1) since we only have four variables for holding two potential candidates and two counters.
#   Even the returning array is at most 2 elements.
class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        if not nums:
            return []

        # 1st pass
        count1, count2 = 0, 0
        n1, n2 = None, None  # potential candidates
        for n in nums:
            if n1 == n:
                count1 += 1
            elif n2 == n:
                count2 += 1
            elif count1 == 0:
                n1 = n
                count1 += 1
            elif count2 == 0:
                n2 = n
                count2 += 1
            else:
                count1 -= 1
                count2 -= 1

        # 2nd pass
        res = []
        for n in [n1, n2]:
            if nums.count(n) > len(nums) // 3:
                res.append(n)
        return res
