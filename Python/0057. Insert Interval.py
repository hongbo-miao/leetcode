# You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
# Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
# Return intervals after the insertion.
#
# Example 1:
#
# Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
# Output: [[1,5],[6,9]]
#
# Example 2:
#
# Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
# Output: [[1,2],[3,10],[12,16]]
# Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
#
# Constraints:
#
# 0 <= intervals.length <= 10^4
# intervals[i].length == 2
# 0 <= start_i <= end_i <= 10^5
# intervals is sorted by start_i in ascending order.
# newInterval.length == 2
# 0 <= start <= end <= 10^5


# Greedy
# Time O(n)
# Space O(n)
class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        # init data
        new_start, new_end = newInterval
        i = 0
        n = len(intervals)
        res = []

        # add all intervals starting before newInterval
        while i < n and intervals[i][0] < new_start:
            res.append(intervals[i])
            i += 1

        # add newInterval
        # if there is no overlap, just add the interval
        if not res or res[-1][1] < new_start:
            res.append(newInterval)
        # if there is an overlap, merge with the last interval
        else:
            res[-1][1] = max(res[-1][1], new_end)

        # add next intervals, merge with newInterval if needed
        while i < n:
            interval = intervals[i]
            start, end = interval
            i += 1
            # if there is no overlap, just add an interval
            if res[-1][1] < start:
                res.append(interval)
            # if there is an overlap, merge with the last interval
            else:
                res[-1][1] = max(res[-1][1], end)
        return res
