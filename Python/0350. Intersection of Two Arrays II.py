# Given two arrays, write a function to compute their intersection.
#
# Example:
# Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].
#
# Note:
#   Each element in the result should appear as many times as it shows in both arrays.
#   The result can be in any order.
#
# Follow up:
#   What if the given array is already sorted? How would you optimize your algorithm?
#   What if nums1's size is small compared to nums2's size? Which algorithm is better?
#   What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

# 1)
from collections import Counter


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list((Counter(nums1) & Counter(nums2)).elements())


# 2)
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        res = []
        dic = {}
        for n in nums1:
            dic[n] = dic.get(n, 0) + 1
        for n in nums2:
            if n in dic and dic[n] > 0:
                res.append(n)
                dic[n] -= 1
        return res
