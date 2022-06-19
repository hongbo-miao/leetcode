# Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.
#
# Example 1:
#
# Input: arr = [3,1,2,4]
# Output: 17
# Explanation:
# Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
# Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
# Sum is 17.
#
# Example 2:
#
# Input: arr = [11,81,94,43,3]
# Output: 444
#
# Constraints:
#
# 1 <= arr.length <= 3 * 10^4
# 1 <= arr[i] <= 3 * 10^4


# Monotonic stack
# Time O(n)
# Space O(n)
#
# https://leetcode.com/problems/sum-of-subarray-minimums/discuss/1580616/Python3-O(n)-solution-using-stack-with-explanation
# Idea
# Taking arr = [3,1,2,4] as an example,
# 3 occurs 1 * 1 = 1 times
# 1 occurs 2 * 3 = 6 times
# 2 occurs 1 * 2 = 2 times
# 4 occurs 1 * 1 = 1 times
# So (1 * 1) * 3 + (2 * 3) * 1 + (1 * 2) * 2 + (1 * 1) * 4 = 17
#
# e.g.
# idx   0   1  2  3  4    5
#    [-inf, 3, 1, 2, 4, -inf]
#
# Logs
# 0
# 1
# st j i   [0] 1 2
# l r val   1 1 3
# 2
# 3
# 4
# st j i   [0, 2, 3] 4 5
# l r val   1 1 4
# st j i   [0, 2] 3 5
# l r val   1 2 2
# st j i   [0] 2 5
# l r val   2 3 1
# 5
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        arr = [-float("inf")] + arr + [-float("inf")]
        inc_st = []  # monotonic non-decreasing stack
        min_sum = 0
        for i, n in enumerate(arr):
            while inc_st and arr[inc_st[-1]] > n:
                j = inc_st.pop()
                # print("st j i", inc_st, j, i)
                # print("l r val", j - inc_st[-1], i - j, arr[j])
                # left length * right length * value
                min_sum += (j - inc_st[-1]) * (i - j) * arr[j]
            inc_st.append(i)
        return min_sum % (10 ** 9 + 7)
