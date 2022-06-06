# Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
#
# Example 1:
#
# Input: nums = [-4,-1,0,3,10]
# Output: [0,1,9,16,100]
# Explanation: After squaring, the array becomes [16,1,0,9,100].
# After sorting, it becomes [0,1,9,16,100].
#
# Example 2:
#
# Input: nums = [-7,-3,2,3,11]
# Output: [4,9,9,49,121]
#
# Constraints:
#
# 1 <= nums.length <= 10^4
# -10^4 <= nums[i] <= 10^4
# nums is sorted in non-decreasing order.
#
# Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?

# 1) Sorting
# Time O(nlogn)
# Space O(n), space used for the sorting
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        return sorted(n * n for n in nums)


# 2) Two Pointer
# Time O(n)
# Space O(n)
#
# Intuition
# Since the array A is sorted, loosely speaking it has some negative elements with squares in decreasing order, then some non-negative elements with squares in increasing order.
# For example, with [-3, -2, -1, 4, 5, 6], we have the negative part [-3, -2, -1] with squares [9, 4, 1], and the positive part [4, 5, 6] with squares [16, 25, 36].
# Our strategy is to iterate over the negative part in reverse, and the positive part in the forward direction.
#
# Algorithm
# We can use two pointers to read the positive and negative parts of the array - one pointer r in the positive direction, and another l in the negative direction.
# Now that we are reading two increasing arrays (the squares of the elements), we can merge these arrays together using a two-pointer technique.
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        l = 0
        r = n - 1
        for i in range(n - 1, -1, -1):
            if abs(nums[l]) < abs(nums[r]):
                square = nums[r]
                r -= 1
            else:
                square = nums[l]
                l += 1
            res[i] = square * square
        return res
