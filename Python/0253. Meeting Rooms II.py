# Given an array of meeting time intervals where intervals[i] = [start_i, end_i], return the minimum number of conference rooms required.
#
# Example 1:
#
# Input: intervals = [[0,30],[5,10],[15,20]]
# Output: 2
#
# Example 2:
#
# Input: intervals = [[7,10],[2,4]]
# Output: 1
#
# Constraints:
#
# 1 <= intervals.length <= 10^4
# 0 <= start_i < end_i <= 10^6


# Priority Queues
# Time O(nlogn)
#   Sorting O(log n)
#   For priority queue, insert and delete are both O(log n)
# Space O(n)
import heapq


class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        # Sort the meetings based on start time
        intervals.sort(key=lambda x: x[0])

        heap = []  # stores the end time of intervals

        for i in intervals:
            # Two intervals can use the same room
            if heap and heap[0] <= i[0]:
                # Method 1
                # heapq.heappop(heap)
                # heapq.heappush(heap, i[1])

                # Method 2
                heapq.heapreplace(heap, i[1])
            else:
                # A new room is allocated
                heapq.heappush(heap, i[1])

        return len(heap)
