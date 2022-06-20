# As the ruler of a kingdom, you have an army of wizards at your command.
# You are given a 0-indexed integer array strength, where strength[i] denotes the strength of the ith wizard. For a contiguous group of wizards (i.e. the wizards' strengths form a subarray of strength), the total strength is defined as the product of the following two values:
# - The strength of the weakest wizard in the group.
# - The total of all the individual strengths of the wizards in the group.
# Return the sum of the total strengths of all contiguous groups of wizards. Since the answer may be very large, return it modulo 109 + 7.
# strength subarray is a contiguous non-empty sequence of elements within an array.
#
# Example 1:
#
# Input: strength = [1,3,1,2]
# Output: 44
# Explanation: The following are all the contiguous groups of wizards:
# - [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
# - [3] from [1,3,1,2] has a total strength of min([3]) * sum([3]) = 3 * 3 = 9
# - [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
# - [2] from [1,3,1,2] has a total strength of min([2]) * sum([2]) = 2 * 2 = 4
# - [1,3] from [1,3,1,2] has a total strength of min([1,3]) * sum([1,3]) = 1 * 4 = 4
# - [3,1] from [1,3,1,2] has a total strength of min([3,1]) * sum([3,1]) = 1 * 4 = 4
# - [1,2] from [1,3,1,2] has a total strength of min([1,2]) * sum([1,2]) = 1 * 3 = 3
# - [1,3,1] from [1,3,1,2] has a total strength of min([1,3,1]) * sum([1,3,1]) = 1 * 5 = 5
# - [3,1,2] from [1,3,1,2] has a total strength of min([3,1,2]) * sum([3,1,2]) = 1 * 6 = 6
# - [1,3,1,2] from [1,3,1,2] has a total strength of min([1,3,1,2]) * sum([1,3,1,2]) = 1 * 7 = 7
# The sum of all the total strengths is 1 + 9 + 1 + 4 + 4 + 4 + 3 + 5 + 6 + 7 = 44.
#
# Example 2:
#
# Input: strength = [5,4,6]
# Output: 213
# Explanation: The following are all the contiguous groups of wizards:
# - [5] from [5,4,6] has a total strength of min([5]) * sum([5]) = 5 * 5 = 25
# - [4] from [5,4,6] has a total strength of min([4]) * sum([4]) = 4 * 4 = 16
# - [6] from [5,4,6] has a total strength of min([6]) * sum([6]) = 6 * 6 = 36
# - [5,4] from [5,4,6] has a total strength of min([5,4]) * sum([5,4]) = 4 * 9 = 36
# - [4,6] from [5,4,6] has a total strength of min([4,6]) * sum([4,6]) = 4 * 10 = 40
# - [5,4,6] from [5,4,6] has a total strength of min([5,4,6]) * sum([5,4,6]) = 4 * 15 = 60
# The sum of all the total strengths is 25 + 16 + 36 + 36 + 40 + 60 = 213.
#
# Constraints:
#
# 1 <= strength.length <= 10^5
# 1 <= strength[i] <= 10^9


# https://leetcode.com/problems/sum-of-total-strength-of-wizards/discuss/2061985/JavaC%2B%2BPython-One-Pass-Solution
# Time O(n)
# Space O(n)
#
# Key words
# Subarray + sum -> prefix sum
# Subarray + minimum -> mono stack
#
#
# Intuition
# Assume A[i] is the leftmost smallest element in a subarray,
# calculate each A[i] contribution
#
#
# Explanation
# 1. Find next small on the right
# 2. Find next small or equal on the left.
# 3. For each strength[i] as the minimum, find the possible subarray sums.
from itertools import accumulate


class Solution:
    def totalStrength(self, strength: List[int]) -> int:
        n = len(strength)

        # indices of next small on the right
        right = [n] * n
        st = []
        for i in range(n):
            print("stack[-1]", stack[-1], strength[stack[-1]], strength[i])
            while st and strength[st[-1]] > strength[i]:
                right[st.pop()] = i
            st.append(i)

        # indices of next small on the left
        left = [-1] * n
        st = []
        for i in range(n - 1, -1, -1):
            while st and strength[st[-1]] >= strength[i]:
                left[st.pop()] = i
            st.append(i)

        # for each strength[i] as minimum, calculate sum
        res = 0
        acc = list(accumulate(accumulate(strength), initial=0))
        for i in range(n):
            l, r = left[i], right[i]
            lacc = acc[i] - acc[max(l, 0)]
            racc = acc[r] - acc[i]
            ln, rn = i - l, r - i
            res += strength[i] * (racc * ln - lacc * rn)
        return res % 10 ** 9 + 7
