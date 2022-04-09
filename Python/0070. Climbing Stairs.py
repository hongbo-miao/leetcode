# You are climbing a staircase. It takes n steps to reach the top.
# Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
#
# Example 1:
#
# Input: n = 2
# Output: 2
# Explanation: There are two ways to climb to the top.
# 1. 1 step + 1 step
# 2. 2 steps
#
# Example 2:
#
# Input: n = 3
# Output: 3
# Explanation: There are three ways to climb to the top.
# 1. 1 step + 1 step + 1 step
# 2. 1 step + 2 steps
# 3. 2 steps + 1 step
#
# Constraints:
#
# 1 <= n <= 45


# 1) Recursion (time limit exceeded)
# Time O(2^n) - O(branch ^ recursion depth)
# Space O(n) - O(recursion depth)
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1
        if n == 2:
            return 2
        return self.climbStairs(n - 2) + self.climbStairs(n - 1)


# 2) Recursion (memoization)
# Time O(n)
# Space O(n)
class Solution:
    def climbStairs(self, n: int) -> int:
        dic = [None] * (n + 1)

        def go(i):
            if i == 1:
                return 1
            if i == 2:
                return 2
            if dic[i] is not None:
                return dic[i]
            dic[i] = go(i - 2) + go(i - 1)
            return dic[i]

        return go(n)


# 3) Dynamic programming - Fibonacci
# Similar
# 70. Climbing Stairs
# 91. Decode Ways
#
# Time O(n)
# Space O(n)
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1
        if n == 2:
            return 2
        dp = [None] * (n + 1)
        dp[1] = 1
        dp[2] = 2
        for i in range(3, n + 1):
            dp[i] = dp[i - 2] + dp[i - 1]
        return dp[-1]


# 4) Dynamic programming - Fibonacci (optimization)
# Time O(n)
# Space O(1)
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1
        if n == 2:
            return 2
        a = 1
        b = 2
        for i in range(3, n + 1):
            c = a + b
            a = b
            b = c
        return c
