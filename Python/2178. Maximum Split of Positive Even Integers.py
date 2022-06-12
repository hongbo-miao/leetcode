# You are given an integer finalSum. Split it into a sum of a maximum number of unique positive even integers.
#
# For example, given finalSum = 12, the following splits are valid (unique positive even integers summing up to finalSum): (12), (2 + 10), (2 + 4 + 6), and (4 + 8). Among them, (2 + 4 + 6) contains the maximum number of integers. Note that finalSum cannot be split into (2 + 2 + 4 + 4) as all the numbers should be unique.
# Return a res of integers that represent a valid split containing a maximum number of integers. If no valid split exists for finalSum, return an empty res. You may return the integers in any order.
#
# Example 1:
#
# Input: finalSum = 12
# Output: [2,4,6]
# Explanation: The following are valid splits: (12), (2 + 10), (2 + 4 + 6), and (4 + 8).
# (2 + 4 + 6) has the maximum number of integers, which is 3. Thus, we return [2,4,6].
# Note that [2,6,4], [6,2,4], etc. are also accepted.
#
# Example 2:
#
# Input: finalSum = 7
# Output: []
# Explanation: There are no valid splits for the given finalSum.
# Thus, we return an empty array.
#
# Example 3:
#
# Input: finalSum = 28
# Output: [6,8,2,12]
# Explanation: The following are valid splits: (2 + 26), (6 + 8 + 2 + 12), and (4 + 24).
# (6 + 8 + 2 + 12) has the maximum number of integers, which is 4. Thus, we return [6,8,2,12].
# Note that [10,2,4,12], [6,2,4,16], etc. are also accepted.
#
# Constraints:
#
# 1 <= finalSum <= 10^10


# https://leetcode.com/problems/maximum-split-of-positive-even-integers/discuss/1783191/C%2B%2B-or-Easy-Simulation-or-O(MaximumNumbers)-Time-or-O(1)-Space
# 1. finalSum is odd, can't represent an odd number as a sum of even numbers
# 2. finalSum is even
#    Now to make the largest we have to take smallest numbers first like 2,4,6,8... and so on.
#    but wait what happen if we are doing in this manner and the total sum is greater than desired , no worries , we wll do this step untill our sum is less than or equal to given number , and just add the remaining difference to last number in the res.
#
#    Take n =14
#    n = 2 , finalSum = 0 , res = [] (finalSum + 2 <= 14 , so push it) , finalSum + n = 2 , res = [2]
#    n = 4 , finalSum = 2 , res = [2] (finalSum + 4 <= 14 , so push it) , finalSum + n = 6 , res = [2,4]
#    n = 6 , finalSum = 6 , res = [2,4] (finalSum + 6 <= 14 , so push it) , finalSum + n = 12 , res = [2,4,6]
#    n = 8 , finalSum = 12 , res = [2,4,6] (finalSum + 8 > 14 , so don't push it , break the loop)
#    Now we have finalSum = 12 , and we want 14 , so simply add difference (which is 14-12 = 2 ) in the last element of res
#    so res = [2,4,6+(14-12)] = [2,4,8]
#
# res       n
# [2]       12
# [2, 4]    8
# [2, 4, 6] 2
# [2, 4, 8]
class Solution:
    def maximumEvenSplit(self, finalSum: int) -> List[int]:
        # finalSum is odd, can't represent an odd number as a sum of even numbers
        if finalSum % 2 == 1:
            return []

        # finalSum is even
        res = []
        n = 2
        while n <= finalSum:
            res.append(n)
            finalSum -= n
            n += 2
        res[-1] += finalSum
        return res
