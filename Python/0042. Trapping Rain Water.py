# Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
#
# Example 1:
#
# Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
# Output: 6
# Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
#
# Example 2:
#
# Input: height = [4,2,0,3,2,5]
# Output: 9
#
# Constraints:
#
# n == height.length
# 1 <= n <= 2 * 10^4
# 0 <= height[i] <= 10^5


# Two Pointers
# Time O(n)
# Space O(1)
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0

        l = 0
        r = len(height) - 1
        l_max = height[l]
        r_max = height[r]
        res = 0

        while l < r:
            if height[l] <= height[r]:
                l_max = max(l_max, height[l])
                res += l_max - height[l]
                l += 1
            else:
                r_max = max(r_max, height[r])
                res += r_max - height[r]
                r -= 1
        return res
