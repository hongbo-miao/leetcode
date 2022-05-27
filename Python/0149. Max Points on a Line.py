# Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.
#
# Example 1:
#
# Input: points = [[1,1],[2,2],[3,3]]
# Output: 3
#
# Example 2:
#
# Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
# Output: 4
#
# Constraints:
#
# 1 <= points.length <= 300
# points[i].length == 2
# -10^4 <= xi, yi <= 10^4
# All the points are unique.


class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        if len(points) <= 2:
            return len(points)

        m = 0
        for i, p1 in enumerate(points):
            slopes = {}
            for p2 in points[i + 1 :]:
                slope = self.get_slope(p1, p2)
                slopes[slope] = slopes.get(slope, 0) + 1
                m = max(slopes[slope], m)
        return m + 1

    def get_slope(self, p1, p2):
        x1, y1 = p1
        x2, y2 = p2
        if x1 - x2 == 0:
            return float("inf")
        return (y1 - y2) / (x1 - x2)
