# You are painting a fence of n posts with k different colors. You must paint the posts following these rules:
#
# Every post must be painted exactly one color.
# There cannot be three or more consecutive posts with the same color.
# Given the two integers n and k, return the number of ways you can paint the fence.
#
# Example 1:
#
# Input: n = 3, k = 2
# Output: 6
# Explanation: All the possibilities are shown.
# Note that painting all the posts red or all the posts green is invalid because there cannot be three posts in a row with the same color.
#
# Example 2:
#
# Input: n = 1, k = 1
# Output: 1
#
# Example 3:
#
# Input: n = 7, k = 2
# Output: 42
#
# Constraints:
#
# 1 <= n <= 50
# 1 <= k <= 10^5
# The testcases are generated such that the answer is in the range [0, 2^31 - 1] for the given n and k.


# 1) Dynamic Programming (Top-Down)
# Time O(n)
# Space O(n)
#
# https://leetcode.com/problems/paint-fence/discuss/178010/The-only-solution-you-need-to-read
# Part 1
# If you are painting the ith post, how many ways can you paint it to make it different from the i-1 th post? k-1
# total_ways(i-1) * (k - 1)
#
# Part 2
# If you are painting the ith post, how many ways can you paint it to make it the same as the i-1th post
# total_ways_same(i) = total_ways_diff(i-1) * 1 = total_ways(i-2) * (k-1)
# total_ways_diff(i-1) is all the cases where the i-1th and i-2th are different.
#
# So in summary, total_ways(i) = (total_ways(i - 1) + total_ways(i - 2)) * (k - 1)
class Solution:
    def numWays(self, n: int, k: int) -> int:
        def total_ways(i):
            if i == 1:
                return k
            if i == 2:
                return k * k

            if i in memo:
                return memo[i]

            memo[i] = (total_ways(i - 1) + total_ways(i - 2)) * (k - 1)
            return memo[i]

        memo = {}
        return total_ways(n)


# 2) Dynamic Programming (Top-Down). Similar to 1)
# Time O(n)
# Space O(n)
from functools import cache


class Solution:
    def numWays(self, n: int, k: int) -> int:
        @cache
        def total_ways(i):
            if i == 1:
                return k
            if i == 2:
                return k * k
            return (total_ways(i - 1) + total_ways(i - 2)) * (k - 1)

        return total_ways(n)


# 3) Dynamic Programming (Bottom-Up)
# Time O(n)
# Space O(n)
class Solution:
    def numWays(self, n: int, k: int) -> int:
        # Base cases for the problem to avoid index out of bound issues
        if n == 1:
            return k
        if n == 2:
            return k * k

        total_ways = [0] * (n + 1)
        total_ways[1] = k
        total_ways[2] = k * k

        for i in range(3, n + 1):
            total_ways[i] = (k - 1) * (total_ways[i - 1] + total_ways[i - 2])

        return total_ways[n]


# 3) Dynamic Programming (Bottom-Up), constant space
# Time O(n)
# Space O(1)
class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 1:
            return k

        two_posts_back = k
        one_post_back = k * k

        for i in range(3, n + 1):
            two_posts_back, one_post_back = one_post_back, (k - 1) * (
                one_post_back + two_posts_back
            )
        return one_post_back
