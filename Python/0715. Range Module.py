# A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.
# A half-open interval [left, right) denotes all the real numbers x where left <= x < right.
# Implement the RangeModule class:
#
# RangeModule() Initializes the object of the data structure.
# void addRange(int left, int right) Adds the half-open interval [left, right), tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval [left, right) that are not already tracked.
# boolean queryRange(int left, int right) Returns true if every real number in the interval [left, right) is currently being tracked, and false otherwise.
# void removeRange(int left, int right) Stops tracking every real number currently being tracked in the half-open interval [left, right).
#
# Example 1:
#
# Input
# ["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
# [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
# Output
# [null, null, null, true, false, true]
#
# Explanation
# RangeModule rangeModule = new RangeModule();
# rangeModule.addRange(10, 20);
# rangeModule.removeRange(14, 16);
# rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
# rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
# rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
#
# Constraints:
#
# 1 <= left < right <= 10^9
# At most 10^4 calls will be made to addRange, queryRange, and removeRange.


# Binary Search
# https://leetcode.com/problems/range-module/discuss/244194/Python-solution-using-bisect_left-bisect_right-with-explanation
# You'll notice self.track is always an array with even number of elements.
# 1. Let's say we have [1,3,9,11], which denotes intervals [1,3), [9,11).
#    Say we want to add [4,6) to the ranges, bisect_left([1,3,9,11], 4) will return 2, which is an even index.
#    This means the 4 does not overlap with any of the intervals [1,3) and [9,11).
#    Therefore we would need to add the interval to the final result.
# 2. On the other hand, if we were to add the interval [3, 6).
#    bisect_left([1,3,9,11), 3) will return 1.
#    This means 3 is overlapping with an existing interval and we do not have to add it to the final result.
#
#
# 1. addRange
#    e.g. track = [1,3,9,11] meaning [1,3), [9,11). Add [4,6)
#      i = bisect_left([1,3,9,11], 4) = 2
#      j = bisect_left([1,3,9,11], 6) = 2
#    subtract = [2,2]
#    After track[i:j] = subtrack
#    track = [1,3,4,6,9,11] meaning [1,3), [4,6), [9,11)
#
#    e.g. track = [1,3,9,11] meaning [1,3), [9,11). Add [2,10)
#      i = bisect_left([1,3,9,11], 2) = 1
#      j = bisect_left([1,3,9,11], 10) = 3
#    subtract = []
#    After track[i:j] = subtrack
#    track = [1,11] meaning [1,11)
#
#    e.g. track = [1,3,9,11] meaning [1,3), [9,11). Add [4,10)
#      i = bisect_left([1,3,9,11], 4) = 2
#      j = bisect_left([1,3,9,11], 10) = 3
#    subtract = [4]
#    After track[i:j] = subtrack
#    track = [1,3,4,11] meaning [1,3), [4,11)
#
#    e.g. track = [1,3,9,11] meaning [1,3), [9,11). Add [2,8)
#      i = bisect_left([1,3,9,11], 2) = 1
#      j = bisect_left([1,3,9,11], 8) = 2
#    subtract = [8]
#    After track[i:j] = subtrack
#    track = [1,8,9,11] meaning [1,8), [9,11)
#
# 2. removeRange
#    Similar to addRange
#
# 3. queryRange
#    [10, 14), [16, 20)
#    [11, 12) -> i = 1, j = 1 True
#    [15, 16) -> i = 2, j = 2 False
#    [13, 15) -> i = 1, j = 2 False
#    [15, 17) -> i = 2, j = 3 False
import bisect


class RangeModule:
    def __init__(self):
        self.track = []

    def addRange(self, left: int, right: int) -> None:
        i = bisect.bisect_left(self.track, left)
        j = bisect.bisect_right(self.track, right)
        subtrack = []
        if i % 2 == 0:
            subtrack.append(left)
        if j % 2 == 0:
            subtrack.append(right)
        self.track[i:j] = subtrack

    def queryRange(self, left: int, right: int) -> bool:
        i = bisect.bisect_right(self.track, left)  # Note bisect_right
        j = bisect.bisect_left(self.track, right)  # Note bisect_left
        return i == j and i % 2 == 1

    def removeRange(self, left: int, right: int) -> None:
        i = bisect.bisect_left(self.track, left)
        j = bisect.bisect_right(self.track, right)
        subtrack = []
        if i % 2 == 1:
            subtrack.append(left)
        if j % 2 == 1:
            subtrack.append(right)
        self.track[i:j] = subtrack
