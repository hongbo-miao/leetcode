# Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
#
# Example 1:
#
# Input: timePoints = ["23:59","00:00"]
# Output: 1
#
# Example 2:
#
# Input: timePoints = ["00:00","23:59","00:00"]
# Output: 0
#
# Constraints:
#
# 2 <= timePoints.length <= 2 * 10^4
# timePoints[i] is in the format "HH:MM".


# Time O(nlogn)
# Space O(n)
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        points = sorted(int(t[:2]) * 60 + int(t[-2:]) for t in timePoints)
        points.append(points[0] + 24 * 60)  # 00:00 is also 24:00
        # zip will ignore the last element of the first list
        # e.g. zip([0, 1439, 1440], [1439, 1440]) -> [(0, 1439), (1439, 1440)]
        return min(b - a for a, b in zip(points, points[1:]))
