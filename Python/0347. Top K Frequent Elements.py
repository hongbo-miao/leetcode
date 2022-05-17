# Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
#
# Example 1:
#
# Input: nums = [1,1,1,2,2,3], k = 2
# Output: [1,2]
#
# Example 2:
#
# Input: nums = [1], k = 1
# Output: [1]
#
# Constraints:
#
# 1 <= nums.length <= 10^5
# k is in the range [1, the number of unique elements in the array].
# It is guaranteed that the answer is unique.
#
#
# Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

# 1)
import collections


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        c = collections.Counter(nums)
        return [k for k, _ in c.most_common(k)]


# 2) Bucket sorting
# Time O(n)
# Space O(n) array -> O(k) hashtable
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        dic = {}
        for n in nums:
            dic[n] = dic.get(n, 0) + 1

        bucket = [[] for _ in range(len(nums) + 1)]
        for n, freq in dic.items():
            bucket[freq].append(n)

        res = []
        for i in range(len(bucket) - 1, -1, -1):
            if bucket[i] is None:
                continue
            res.extend(bucket[i])  # Note extend() flattens the list
            if len(res) == k:
                return res
        return res
