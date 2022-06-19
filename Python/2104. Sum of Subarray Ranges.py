# You are given an integer array nums. The range of a subarray of nums is the difference between the largest and smallest element in the subarray.
# Return the sum of all subarray ranges of nums.
# nums subarray is a contiguous non-empty sequence of elements within an array.
#
# Example 1:
#
# Input: nums = [1,2,3]
# Output: 4
# Explanation: The 6 subarrays of nums are the following:
# [1], range = largest - smallest = 1 - 1 = 0
# [2], range = 2 - 2 = 0
# [3], range = 3 - 3 = 0
# [1,2], range = 2 - 1 = 1
# [2,3], range = 3 - 2 = 1
# [1,2,3], range = 3 - 1 = 2
# So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
#
# Example 2:
#
# Input: nums = [1,3,3]
# Output: 4
# Explanation: The 6 subarrays of nums are the following:
# [1], range = largest - smallest = 1 - 1 = 0
# [3], range = 3 - 3 = 0
# [3], range = 3 - 3 = 0
# [1,3], range = 3 - 1 = 2
# [3,3], range = 3 - 3 = 0
# [1,3,3], range = 3 - 1 = 2
# So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
#
# Example 3:
#
# Input: nums = [4,-2,-3,4,1]
# Output: 59
# Explanation: The sum of all subarray ranges of nums is 59.
#
# Constraints:
#
# 1 <= nums.length <= 1000
# -10^9 <= nums[i] <= 10^9
#
# Follow-up: Could you find a solution with O(n) time complexity?


# 1) Two loops
# Time O(n^2)
# Space O(1)
class Solution:
    def subArrayRanges(self, nums: List[int]) -> int:
        res = 0
        for i in range(len(nums)):
            mi, ma = nums[i], nums[i]
            for j in range(i, len(nums)):
                mi = min(mi, nums[j])
                ma = max(ma, nums[j])
                res += ma - mi
        return res


# 2) Monotonic stack
# Similar to 907. Sum of Subarray Minimums
#
# https://leetcode.com/problems/sum-of-subarray-ranges/discuss/1624222/JavaC%2B%2BPython-O(n)-solution-detailed-explanation
# Time O(n)
# Space O(n)
class Solution:
    def subArrayRanges(self, nums: List[int]) -> int:
        arr = [-float("inf")] + nums + [-float("inf")]
        inc_st = []  # monotonic non-decreasing stack
        min_sum = 0
        for i, n in enumerate(arr):
            while inc_st and arr[inc_st[-1]] > n:
                j = inc_st.pop()
                # left length * right length * value
                min_sum += (j - inc_st[-1]) * (i - j) * arr[j]
            inc_st.append(i)

        arr = [float("inf")] + nums + [float("inf")]
        dec_st = []  # monotonic non-increasing stack
        max_sum = 0
        for i, n in enumerate(arr):
            while dec_st and arr[dec_st[-1]] < n:
                j = dec_st.pop()
                # left length * right length * value
                max_sum += (j - dec_st[-1]) * (i - j) * arr[j]
            dec_st.append(i)
        return max_sum - min_sum
