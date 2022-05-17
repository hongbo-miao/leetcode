# You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
#
# Example 1:
#
# Input: nums = [5,2,6,1]
# Output: [2,1,1,0]
# Explanation:
# To the right of 5 there are 2 smaller elements (2 and 1).
# To the right of 2 there is only 1 smaller element (1).
# To the right of 6 there is 1 smaller element (1).
# To the right of 1 there is 0 smaller element.
#
# Example 2:
#
# Input: nums = [-1]
# Output: [0]
#
# Example 3:
#
# Input: nums = [-1,-1]
# Output: [0,0]
#
# Constraints:
#
# 1 <= nums.length <= 10^5
# -10^4 <= nums[i] <= 10^4


# 1) Binary Search
# Traverse from the back to the beginning of the array, maintain a sorted array of numbers that have been visited.
# Use binary search to find the first element in the sorted array which is larger or equal to target number.
# For example, [5,2,3,6,1], when we reach 2, we have a sorted array [1,3,6], binary search returns 1,
# which is the index where 2 should be inserted and is also the number smaller than 2.
# Then we insert 2 into the sorted array to form [1,2,3,6].
class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        if not nums:
            return []
        if len(nums) == 1:
            return [0]
        res = [0] * len(nums)
        sorted = []
        for i in range(len(nums) - 1, -1, -1):
            idx = self.lower_bound(sorted, nums[i])
            res[i] = idx
            sorted.insert(idx, nums[i])
        return res

    def lower_bound(self, nums: List[int], target: int) -> int:
        l = 0
        r = len(nums)
        while l < r:
            m = (l + r) // 2
            if nums[m] < target:  # Note <
                l = m + 1
            else:
                r = m
        return l


# 2) Binary Search, similar to 1)
import bisect


class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        if not nums:
            return []
        if len(nums) == 1:
            return [0]
        res = [0] * len(nums)
        sorted = []
        for i in range(len(nums) - 1, -1, -1):
            idx = bisect.bisect_left(sorted, nums[i])
            res[i] = idx
            sorted.insert(idx, nums[i])
        return res
