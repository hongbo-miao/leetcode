# Given a binary array data, return the minimum number of swaps required to group all 1’s present in the array together in any place in the array.
#
# Example 1:
#
# Input: data = [1,0,1,0,1]
# Output: 1
# Explanation: There are 3 ways to group all 1's together:
# [1,1,1,0,0] using 1 swap.
# [0,1,1,1,0] using 2 swaps.
# [0,0,1,1,1] using 1 swap.
# The minimum is 1.
#
# Example 2:
#
# Input: data = [0,0,0,1,0]
# Output: 0
# Explanation: Since there is only one 1 in the array, no swaps are needed.
#
# Example 3:
#
# Input: data = [1,0,1,0,1,0,0,1,1,0,1]
# Output: 3
# Explanation: One possible solution that uses 3 swaps is [0,0,0,0,0,1,1,1,1,1,1].
#
# Constraints:
#
# 1 <= data.length <= 10^5
# data[i] is either 0 or 1.


# Notion

# Sliding Window
# Time O(n)
# Space O(1)
#
# Maintain a sliding window of width, which is the number of 1's in data.
# Find the window which contains the most 1s.
# Then we can swap the rest of 0s in this window.
class Solution:
    def minSwaps(self, data: List[int]) -> int:
        width = sum(data)
        count_one = max_one = 0
        l = r = 0
        while r < len(data):
            count_one += data[r]
            r += 1
            if r - l > width:
                # Update the number of 1's by removing the oldest element
                count_one -= data[l]
                l += 1
            max_one = max(max_one, count_one)
        return width - max_one
