# Your car starts at position 0 and speed +1 on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions 'A' (accelerate) and 'R' (reverse):
#
# - When you get an instruction 'A', your car does the following:
#   - position += speed
#   - speed *= 2
# - When you get an instruction 'R', your car does the following:
#   - If your speed is positive then speed = -1
#   - otherwise speed = 1
# Your position stays the same.
#
# For example, after commands "AAR", your car goes to positions 0 --> 1 --> 3 --> 3, and your speed goes to 1 --> 2 --> 4 --> -1.
# Given a target position target, return the length of the shortest sequence of instructions to get there.
#
# Example 1:
#
# Input: target = 3
# Output: 2
# Explanation:
# The shortest instruction sequence is "AA".
# Your position goes from 0 --> 1 --> 3.
#
# Example 2:
#
# Input: target = 6
# Output: 5
# Explanation:
# The shortest instruction sequence is "AAARA".
# Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
#
# Constraints:
#
# 1 <= target <= 10^4


# https://leetcode.com/problems/race-car/discuss/1512080/Greedy-Approach-oror-Normal-conditions-oror-94-faster-oror-Well-Coded
# Idea:
# The key point is move close to that point and then start reversing the gear based on conditions.
# If you are still before to the target and speed is reverse(i.e. deaccelerating) or if you are ahead of target and speed is positive (i.e. accelerating) then reverse the speed.
#
# There are two strategies to get to the target distance:
# 1. We go pass it, then come back.
#    For example, the target is 2, we accelerate twice to 3, then reverse and come back (the new target is then 3 - 2 = 1.
# 2. We get super close to it, then reverse accelerate a few times, then reverse back to the target
#    For example, the target is 2, we accelerate once to 1, then reverse to accelerate 0 times, and reverse again. The new target will be 1
class Solution:
    def racecar(self, target: int) -> int:
        q = []
        q.append((0, 0, 1))  # (step, pos, speed)
        while q:
            step, pos, speed = q.pop(0)
            if pos == target:
                return step

            q.append((step + 1, pos + speed, speed * 2))

            # If you are back to the target and speed is reverse
            # or if you are ahead of target and speed is positive then reverse the speed
            if (pos + speed < target and speed < 0) or (
                pos + speed > target and speed > 0
            ):
                reversed_speed = -1 if speed > 0 else 1
                q.append((step + 1, pos, reversed_speed))
        return -1
