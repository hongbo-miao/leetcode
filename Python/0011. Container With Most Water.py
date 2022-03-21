# You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
# Find two lines that together with the x-axis form a container, such that the container contains the most water.
# Return the maximum amount of water a container can store.
# Notice that you may not slant the container.
#
# Example 1:
#
# Input: height = [1,8,6,2,5,4,8,3,7]
# Output: 49
# Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
#
# Example 2:
#
# Input: height = [1,1]
# Output: 1
#
# Constraints:
#
# n == height.length
# 2 <= n <= 10^5
# 0 <= height[i] <= 10^4


# 1) Brute force
# Time: O(n^2)
# Space: O(1)
class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        for l in range(len(height)):
            for r in range(l + 1, len(height)):
                max_area = max(max_area, min(height[l], height[r]) * (r - l))
        return max_area


# 2) Two pointers
# Time O(n)
# Space O(1)
#
# This is done since a relatively longer line obtained by moving the shorter line's pointer might overcome the reduction in area caused by the width reduction.
# Proof (https://leetcode.com/problems/container-with-most-water/discuss/6099/Yet-another-way-to-see-what-happens-in-the-O(n)-algorithm)
#
# Draw a matrix where the row is the first line, and the column is the second line. For example, say n=6.
#
# In the figures below, x means we don't need to compute the volume for that case:
# (1) On the diagonal, the two lines are overlapped;
# (2) The lower left triangle area of the matrix is symmetric to the upper right area.
#
# We start by computing the volume at (1,6), denoted by o.
# Now if the left line is shorter than the right line, then all the elements left to (1,6) on the first row have smaller volume, so we don't need to compute those cases (crossed by ---).
#
#   1 2 3 4 5 6
# 1 x ------- o
# 2 x x
# 3 x x x
# 4 x x x x
# 5 x x x x x
# 6 x x x x x x
#
# Next we move the left line and compute (2,6). Now if the right line is shorter, all cases below (2,6) are eliminated.
#
#   1 2 3 4 5 6
# 1 x ------- o
# 2 x x       o
# 3 x x x     |
# 4 x x x x   |
# 5 x x x x x |
# 6 x x x x x x
#
# And no matter how this o path goes, we end up only need to find the max value on this path, which contains n-1 cases.
#
#   1 2 3 4 5 6
# 1 x ------- o
# 2 x x - o o o
# 3 x x x o | |
# 4 x x x x | |
# 5 x x x x x |
# 6 x x x x x x
class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0

        l = 0
        r = len(height) - 1

        while l < r:
            max_area = max(max_area, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return max_area
