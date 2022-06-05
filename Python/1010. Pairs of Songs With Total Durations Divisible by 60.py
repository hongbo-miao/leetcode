# You are given a list of songs where the ith song has a duration of time[i] seconds.
# Return the number of pairs of songs for which their total duration in seconds is divisible by 60. Formally, we want the number of indices i, j such that i < j with (time[i] + time[j]) % 60 == 0.
#
# Example 1:
#
# Input: time = [30,20,150,100,40]
# Output: 3
# Explanation: Three pairs have a total duration divisible by 60:
# (time[0] = 30, time[2] = 150): total duration 180
# (time[1] = 20, time[3] = 100): total duration 120
# (time[1] = 20, time[4] = 40): total duration 60
#
# Example 2:
#
# Input: time = [60,60,60]
# Output: 3
# Explanation: All three pairs have a total duration of 120, which is divisible by 60.
#
# Constraints:
#
# 1 <= time.length <= 6 * 10^4
# 1 <= time[i] <= 500


# https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/discuss/256726/JavaPython-3-O(n)-code-w-comment-similar-to-Two-Sum
# Similar to Two Sum
# Let target in Two Sum be 60 and each item in time % 60, then the two problems are very similar to each other.
# Any multiple of 60 will complement itself. Maps multiple of 60 to 0, theOther is 0, correspondingly.
from collections import defaultdict


class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        dic = defaultdict(int)
        res = 0
        for t in time:
            diff = -t % 60
            res += dic[diff]
            dic[t % 60] += 1
        return res
