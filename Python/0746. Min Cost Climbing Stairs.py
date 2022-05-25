# You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
# You can either start from the step with index 0, or the step with index 1.
# Return the minimum cost to reach the top of the floor.
#
# Example 1:
#
# Input: cost = [10,15,20]
# Output: 15
# Explanation: You will start at index 1.
# - Pay 15 and climb two steps to reach the top.
# The total cost is 15.
#
# Example 2:
#
# Input: cost = [1,100,1,1,1,100,1,1,100,1]
# Output: 6
# Explanation: You will start at index 0.
# - Pay 1 and climb two steps to reach index 2.
# - Pay 1 and climb two steps to reach index 4.
# - Pay 1 and climb two steps to reach index 6.
# - Pay 1 and climb one step to reach index 7.
# - Pay 1 and climb two steps to reach index 9.
# - Pay 1 and climb one step to reach the top.
# The total cost is 6.
#
# Constraints:
#
# 2 <= cost.length <= 1000
# 0 <= cost[i] <= 999


# 1) Dynamic Programming
# Time O(n)
# Space O(n)
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        if len(cost) == 1:
            return cost[0]

        dp = [0] * len(cost)
        dp[0] = cost[0]
        dp[1] = cost[1]
        for i in range(2, len(cost)):
            dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
        return min(dp[-1], dp[-2])


# 2) Dynamic Programming
# Time O(n)
# Space O(1)
#
# Algorithm
#
# 1. Initialize two variables, downOne and downTwo, that represent the
# minimum cost to reach one step and two steps below the current step,
# respectively. We will start iteration from step 2, which means these
# variables will initially represent the minimum cost to reach steps 0 and 1,
# so we will initialize each of them to 0.
# 2. Iterate over the array, again with 1 extra iteration at the end to treat
# the top floor as the final "step". At each iteration, simulate moving 1
# step up. This means downOne will now refer to the current step, so apply
# our recurrence relation to update downOne. downTwo will be whatever downOne
# was prior to the update, so let's use a temporary variable to help with the
# update.
# 3. In the end, since we treated the top floor as a step, downOne will refer
# to the minimum cost to reach the top floor. Return downOne.
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        if len(cost) == 1:
            return cost[0]

        down_one = down_two = 0
        for i in range(2, len(cost) + 1):
            down_one, down_two = (
                min(down_one + cost[i - 1], down_two + cost[i - 2]),
                down_one,
            )
        return down_one
