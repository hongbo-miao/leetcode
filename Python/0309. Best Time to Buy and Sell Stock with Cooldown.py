# You are given an array prices where prices[i] is the price of a given stock on the ith day.
# Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
# - After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
# Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
#
# Example 1:
#
# Input: prices = [1,2,3,0,2]
# Output: 3
# Explanation: transactions = [buy, sell, cooldown, buy, sell]
#
# Example 2:
#
# Input: prices = [1]
# Output: 0
#
# Constraints:
#
# 1 <= prices.length <= 5000
# 0 <= prices[i] <= 1000


# 1) Dynamic programming - state machine
# Check the state machine image at https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75928/Share-my-DP-solution-(By-State-Machine-Thinking)
# Time O(n)
# Space O(n)
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0

        s0 = [0] * len(prices)
        s1 = [0] * len(prices)
        s2 = [0] * len(prices)

        s0[0] = 0  # You don't have any stock if you just rest
        s1[0] = -prices[0]  # After buy, you should have -prices[0] profit
        s2[0] = -float("inf")

        for i in range(1, len(prices)):
            s0[i] = max(s0[i - 1], s2[i - 1])  # Stay at s0, or rest from s2
            s1[i] = max(s1[i - 1], s0[i - 1] - prices[i])  # Stay at s1, or buy from s0
            s2[i] = s1[i - 1] + prices[i]  # Only one way from s1
        return max(s0[-1], s2[-1])


# 2) Improved version of 1)
# Time O(n)
# Space O(1)
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0

        sold = 0
        hold = -float("inf")
        rest = 0

        for p in prices:
            hold = max(hold, rest - p)
            rest = max(rest, sold)
            sold = hold + p
        return max(sold, rest)
