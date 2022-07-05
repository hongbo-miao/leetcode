# Given an array of points where points[i] = [x_i, y_i] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
#
# The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
#
# You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
#
#
#
# Example 1:
#
#
# Input: points = [[1,3],[-2,2]], k = 1
# Output: [[-2,2]]
# Explanation:
# The distance between (1, 3) and the origin is sqrt(10).
# The distance between (-2, 2) and the origin is sqrt(8).
# Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
# We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
# Example 2:
#
# Input: points = [[3,3],[5,-1],[-2,4]], k = 2
# Output: [[3,3],[-2,4]]
# Explanation: The answer [[-2,4],[3,3]] would also be accepted.
#
#
# Constraints:
#
# 1 <= k <= points.length <= 10^4
# -10^4 < x_i, y_i < 10^4

# 1) Min Heap
# Time O(N * logK)
# Space O(K)
import heapq


class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        return heapq.nsmallest(k, points, lambda p: p[0] ** 2 + p[1] ** 2)


# 2) Min Heap, similar to 1)
# Time O(N * logK)
# Space O(K)
import heapq


class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        heap = []

        for x, y in points:
            dist = -(x ** 2 + y ** 2)
            if len(heap) == k:
                heapq.heappushpop(heap, (dist, x, y))
            else:
                heapq.heappush(heap, (dist, x, y))

        return [(x, y) for (_, x, y) in heap]
