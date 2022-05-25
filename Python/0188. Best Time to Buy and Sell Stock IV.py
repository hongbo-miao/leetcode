# You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
# Find the maximum profit you can achieve. You may complete at most k transactions.
# Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
#
# Example 1:
#
# Input: k = 2, prices = [2,4,1]
# Output: 2
# Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
#
# Example 2:
#
# Input: k = 2, prices = [3,2,6,5,0,3]
# Output: 7
# Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
#
#
# Constraints:
#
# 0 <= k <= 100
# 0 <= prices.length <= 1000
# 0 <= prices[i] <= 1000


# 1) Dynamic Programming (Top-Down)
# https://leetcode.com/explore/learn/card/dynamic-programming/632/common-patterns-in-dp-problems/4116/
from functools import lru_cache


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        @lru_cache(None)
        def dp(i, transactions_remaining, holding):
            # Base case
            if transactions_remaining == 0 or i == len(prices):
                return 0

            do_nothing = dp(i + 1, transactions_remaining, holding)
            do_something = 0

            if holding:
                # Sell stock
                do_something = prices[i] + dp(i + 1, transactions_remaining - 1, 0)
            else:
                # Buy stock
                do_something = -prices[i] + dp(i + 1, transactions_remaining, 1)

            # Recurrence relation
            return max(do_nothing, do_something)

        return dp(0, k, 0)


# 2) Dynamic Programming (Bottom-Up)
# https://leetcode.com/explore/learn/card/dynamic-programming/632/common-patterns-in-dp-problems/4116/
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        dp = [[[0] * 2 for _ in range(k + 1)] for __ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            for transactions_remaining in range(1, k + 1):
                for holding in range(2):
                    do_nothing = dp[i + 1][transactions_remaining][holding]
                    if holding:
                        # Sell stock
                        do_something = (
                            prices[i] + dp[i + 1][transactions_remaining - 1][0]
                        )
                    else:
                        # Buy stock
                        do_something = -prices[i] + dp[i + 1][transactions_remaining][1]

                    # Recurrence relation
                    dp[i][transactions_remaining][holding] = max(
                        do_nothing, do_something
                    )

        return dp[0][k][0]
