# Given a non-empty array of integers, every element appears twice except for one. Find that single one.
#
# Note:
#
# Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
#
# Example 1:
#
# Input: [2,2,1]
# Output: 1
#
# Example 2:
#
# Input: [4,1,2,1,2]
# Output: 4


# 1)
# Time O(n)
# Space O(n)
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return 2 * sum(set(nums)) - sum(nums)


# 2)
# Time O(n)
# Space O(1)
from functools import reduce


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return reduce(lambda x, y: x ^ y, nums)


# 3)
# Time O(n)
# Space O(1)
from operator import xor
from functools import reduce


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return reduce(xor, nums)
