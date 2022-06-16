# You are given an integer length and an array updates where updates[i] = [startIdxi, endIdxi, inci].
# You have an array res of length length with all zeros, and you have some operation to apply on res. In the ith operation, you should increment all the elements res[startIdxi], res[startIdxi + 1], ..., res[endIdxi] by inci.
# Return res after applying all the updates.
#
# Example 1:
#
# Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
# Output: [-2,0,3,5,3]
#
# Example 2:
#
# Input: length = 10, updates = [[2,4,6],[5,6,8],[1,9,-4]]
# Output: [0,-4,2,2,2,4,4,-4,-4,-4]
#
# Constraints:
#
# 1 <= length <= 10^5
# 0 <= updates.length <= 10^4
# 0 <= startIdxi <= endIdxi < length
# -1000 <= inci <= 1000


# 1) Naive Approach (Time Limit Exceeded)
# Time O(nk)
# Space O(1)
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        res = [0] * length
        for l, r, n in updates:
            for i in range(l, r + 1):
                res[i] += n
        return res


# 2) Range Caching
# https://leetcode.com/problems/range-addition/discuss/1339761/Detailed-explanation-or-Python
# Time O(n+k). Each of the kk update operations is done in constant O(1) time.
#   The final cumulative sum transformation takes O(n) time always.
# Space O(1). No extra space required.
#
# e.g.
# Step 1: The value of ans will be:
# [0, 2, 0, 0, -2] (we updated index 1 and 4)
# Step 2: The value of ans will be:
# [0, 2, 2, 2, 0]
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        res = [0] * length
        for l, r, n in updates:
            res[l] += n
            if r + 1 < length:
                res[r + 1] -= n
        for i in range(1, length):
            res[i] += res[i - 1]
        return res
