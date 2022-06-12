# You are given an array points, an integer angle, and your location, where location = [pos_x, pos_y] and points[i] = [x_i, y_i] both denote integral coordinates on the X-Y plane.
# Initially, you are facing directly east from your position. You cannot move from your position, but you can rotate. In other words, pos_x and pos_y cannot be changed. Your field of view in degrees is represented by angle, determining how wide you can see from any given view direction. Let d be the amount in degrees that you rotate counterclockwise. Then, your field of view is the inclusive range of angles [d - angle/2, d + angle/2].
#
# You can see some set of points if, for each point, the angle formed by the point, your position, and the immediate east direction from your position is in your field of view.
# There can be multiple points at one coordinate. There may be points at your location, and you can always see these points regardless of your rotation. Points do not obstruct your vision to other points.
# Return the maximum number of points you can see.
#
# Example 1:
#
# Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
# Output: 3
# Explanation: The shaded region represents your field of view. All points can be made visible in your field of view, including [3,3] even though [2,2] is in front and in the same line of sight.
#
# Example 2:
#
# Input: points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]
# Output: 4
# Explanation: All points can be made visible in your field of view, including the one at your location.
#
# Example 3:
#
# Input: points = [[1,0],[2,1]], angle = 13, location = [1,1]
# Output: 1
# Explanation: You can only see one of the two points, as shown above.
#
# Constraints:
#
# 1 <= points.length <= 10^5
# points[i].length == 2
# location.length == 2
# 0 <= angle < 360
# 0 <= pos_x, pos_y, x_i, y_i <= 100

# Sliding Window
import math


class Solution:
    def visiblePoints(
        self, points: List[List[int]], angle: int, location: List[int]
    ) -> int:
        radians = []
        extra = 0
        x0, y0 = location

        for x, y in points:
            if x == x0 and y == y0:
                extra += 1
                continue
            # atan2 returns (-pi, pi] as radian
            radians.append(math.atan2(y - y0, x - x0))

        radians.sort()

        # Duplicate the radian with +2pi to handle turn-around case
        radians = radians + [x + 2 * math.pi for x in radians]

        # Convert angle to radian
        radian = angle * math.pi / 180

        mx = 0
        l = 0
        for r in range(len(radians)):
            while radians[r] - radians[l] > radian:
                l += 1
            mx = max(mx, r - l + 1)
        return mx + extra
