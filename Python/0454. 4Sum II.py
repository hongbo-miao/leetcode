# Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:
#
# 0 <= i, j, k, l < n
# nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
#
# Example 1:
#
# Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
# Output: 2
# Explanation:
# The two tuples are:
# 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
# 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
#
# Example 2:
#
# Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
# Output: 1
#
# Constraints:
#
# n == nums1.length
# n == nums2.length
# n == nums3.length
# n == nums4.length
# 1 <= n <= 200
# -2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28


class Solution:
    def fourSumCount(
        self, nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]
    ) -> int:
        dic = {}
        for i in nums1:
            for j in nums2:
                dic[i + j] = dic.get(i + j, 0) + 1

        count = 0
        for i in nums3:
            for j in nums4:
                if -(i + j) in dic:
                    count += dic[-(i + j)]
        return count
