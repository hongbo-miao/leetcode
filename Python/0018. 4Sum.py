# Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
#
# 0 <= a, b, c, d < n
# a, b, c, and d are distinct.
# nums[a] + nums[b] + nums[c] + nums[d] == target
# You may return the answer in any order.
#
# Example 1:
#
# Input: nums = [1,0,-1,0,-2,2], target = 0
# Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
#
# Example 2:
#
# Input: nums = [2,2,2,2,2], target = 8
# Output: [[2,2,2,2]]
#
# Constraints:
#
# 1 <= nums.length <= 200
# -10^9 <= nums[i] <= 10^9
# -10^9 <= target <= 10^9

# Notion

# 1) Two Pointers
# Time O(n^{k - 1}), or O(n^3) for 4Sum. We have k - 2 loops, and twoSum is O(n).
#   Note that for k > 2k>2, sorting the array does not change the overall time complexity.
# Space O(n). We need O(k) space for the recursion. k can be the same as nn in the worst case for the generalized algorithm.
#   Note that, for the purpose of complexity analysis, we ignore the memory required for the output.
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        def kSum(nums: List[int], target: int, k: int) -> List[List[int]]:
            res = []

            # If we have run out of numbers to add, return res.
            if not nums:
                return res

            # There are k remaining values to add to the sum.
            # The average of these values is at least target // k.
            average_value = target // k

            # We cannot obtain a sum of target
            # if the smallest value in nums is greater than target // k
            # or if the largest value in nums is smaller than target // k.
            if nums[0] > average_value or nums[-1] < average_value:
                return res

            if k == 2:
                return twoSum(nums, target)

            for i in range(len(nums)):
                if i == 0 or nums[i - 1] != nums[i]:
                    for subset in kSum(nums[i + 1 :], target - nums[i], k - 1):
                        res.append([nums[i]] + subset)
            return res

        def twoSum(nums: List[int], target: int) -> List[List[int]]:
            res = []
            l, r = 0, len(nums) - 1
            while l < r:
                sm = nums[l] + nums[r]
                if sm < target or (l > 0 and nums[l] == nums[l - 1]):
                    l += 1
                elif sm > target or (r < len(nums) - 1 and nums[r] == nums[r + 1]):
                    r -= 1
                else:
                    res.append([nums[l], nums[r]])
                    l += 1
                    r -= 1
            return res

        nums.sort()
        return kSum(nums, target, 4)


# 2) Hash Set
# Time O(n^{k - 1}), or O(n^3) for 4Sum. We have k - 2 loops iterating over nn elements, and twoSum is O(n).
#   Note that for k > 2, sorting the array does not change the overall time complexity.
# Space O(n) for the hash set. The space needed for the recursion will not exceed O(n).
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        def kSum(nums: List[int], target: int, k: int) -> List[List[int]]:
            res = []

            # If we have run out of numbers to add, return res.
            if not nums:
                return res

            # There are k remaining values to add to the sum.
            # The average of these values is at least target // k.
            average_value = target // k

            # We cannot obtain a sum of target
            # if the smallest value in nums is greater than target // k
            # or if the largest value in nums is smaller than target // k.
            if nums[0] > average_value or nums[-1] < average_value:
                return res

            if k == 2:
                return twoSum(nums, target)

            for i in range(len(nums)):
                if i == 0 or nums[i - 1] != nums[i]:
                    for subset in kSum(nums[i + 1 :], target - nums[i], k - 1):
                        res.append([nums[i]] + subset)

            return res

        def twoSum(nums: List[int], target: int) -> List[List[int]]:
            res = []
            s = set()
            for i in range(len(nums)):
                if len(res) == 0 or res[-1][1] != nums[i]:
                    if target - nums[i] in s:
                        res.append([target - nums[i], nums[i]])
                s.add(nums[i])
            return res

        nums.sort()
        return kSum(nums, target, 4)
