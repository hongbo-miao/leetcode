# You are given an array of points in the X-Y plane points where points[i] = [xi, yi].
# Return the minimum area of a rectangle formed from these points, with sides parallel to the X and Y axes. If there is not any such rectangle, return 0.
#
# Example 1:
#
# Input: points = [[1,1],[1,3],[3,1],[3,3],[2,2]]
# Output: 4
#
# Example 2:
#
# Input: points = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
# Output: 2
#
# Constraints:
#
# 1 <= points.length <= 500
# points[i].length == 2
# 0 <= xi, yi <= 4 * 10^4
# All the given points are unique.


# Count by Diagonal
# Time O(n^2)
# Space O(n)
# For each pair of points in the array, consider them to be the long diagonal of a potential rectangle.
# We can check if all 4 points are there using a set.
# For example, if the points are (1, 1) and (5, 5), we check if we also have (1, 5) and (5, 1). If we do, we have a candidate rectangle.
class Solution:
    def minAreaRect(self, points: List[List[int]]) -> int:
        mi = float("inf")
        se = set()
        for x, y in points:
            se.add((x, y))

        for x1, y1 in points:
            for x2, y2 in points:
                if x1 > x2 and y1 > y2:  # Skip looking at same point
                    if (x1, y2) in se and (x2, y1) in se:
                        mi = min(mi, abs(x1 - x2) * abs(y1 - y2))
        return 0 if mi == float("inf") else mi
