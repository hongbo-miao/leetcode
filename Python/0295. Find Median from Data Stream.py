# The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
#
# - For example, for arr = [2,3,4], the median is 3.
# - For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
#
# Implement the MedianFinder class:
#
# - MedianFinder() initializes the MedianFinder object.
# - void addNum(int num) adds the integer num from the data stream to the data structure.
# - double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
#
# Example 1:
#
# Input
# ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
# [[], [1], [2], [], [3], []]
# Output
# [null, null, null, 1.5, null, 2.0]
#
# Explanation
# MedianFinder medianFinder = new MedianFinder();
# medianFinder.addNum(1);    // arr = [1]
# medianFinder.addNum(2);    // arr = [1, 2]
# medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
# medianFinder.addNum(3);    // arr[1, 2, 3]
# medianFinder.findMedian(); // return 2.0
#
# Constraints:
#
# -10^5 <= num <= 10^5
# There will be at least one element in the data structure before calling findMedian.
# At most 5 * 104 calls will be made to addNum and findMedian.
#
# Follow up:
#
# If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
# If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()

# Notion

# 1) Priority Queue
# https://www.youtube.com/watch?v=60xnYZ21Ir0
from heapq import heappush, heappushpop


class MedianFinder:
    def __init__(self):
        self.small = []  # the smaller half of the list, max heap (invert min heap)
        self.large = []  # the larger half of the list, min heap

    # Time O(log n)
    def addNum(self, num):
        if len(self.small) == len(self.large):
            heappush(self.small, -heappushpop(self.large, num))
        else:
            heappush(self.large, -heappushpop(self.small, -num))

    # Time O(1)
    def findMedian(self):
        if len(self.small) == len(self.large):
            return float(self.large[0] - self.small[0]) / 2
        else:
            return -float(self.small[0])


# 2) Binary search
class MedianFinder:
    def __init__(self):
        self.nums = []

    # Time O(log n)
    def addNum(self, num):
        l = 0
        r = len(self.nums) - 1

        while l <= r:
            m = (l + r) // 2
            if self.nums[m] < num:
                l = m + 1
            else:
                r = m - 1
        self.nums.insert(l, num)

    # Time O(1)
    def findMedian(self):
        if len(self.nums) % 2 == 0:
            m = len(self.nums) // 2
            return (self.nums[m - 1] + self.nums[m]) / 2
        else:
            m = len(self.nums) // 2
            return self.nums[m]
