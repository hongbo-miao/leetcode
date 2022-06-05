# Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
# Notice that the solution set must not contain duplicate triplets.
#
# Example 1:
#
# Input: nums = [-1,0,1,2,-1,-4]
# Output: [[-1,-1,2],[-1,0,1]]
#
# Example 2:
#
# Input: nums = []
# Output: []
#
# Example 3:
#
# Input: nums = [0]
# Output: []
#
# Constraints:
#
# 0 <= nums.length <= 3000
# -10^5 <= nums[i] <= 10^5


# 1) 3 pointers
# https://www.youtube.com/watch?v=y-zBV7uUkyI
#
# Idea
# Select a first, move b to right, and move c to left
#
# Time O(n^2)
#
# Example
# -1, 0, 1, 2, -1, -4
#  a  b             c
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []

        nums.sort()
        res = []

        # Using len(nums) - 2 because of three pointers a, b, c
        for i in range(len(nums) - 2):
            a = nums[i]

            # Move a to next different one to avoid duplicate results
            if i - 1 >= 0 and a == nums[i - 1]:
                continue

            l = i + 1
            r = len(nums) - 1
            while l < r:
                b = nums[l]
                c = nums[r]
                sum = a + b + c

                if sum < 0:
                    l += 1
                elif sum > 0:
                    r -= 1
                else:
                    res.append([a, b, c])

                    # Move b to next different one
                    while l < r and nums[l] == b:
                        l += 1

                    # Move c to previous different one
                    while l < r and nums[r] == c:
                        r -= 1
        return res


# 2) 3 pointers, similar to 1)
# Time O(n^2). twoSumII is O(n), and we call it n times.
#   Sorting the array takes O(nlogn), so overall complexity is O(nlogn+n^2
#   This is asymptotically equivalent to (n^2).
# Space O(logn) to O(n), depending on the implementation of the sorting algorithm.
#   For the purpose of complexity analysis, we ignore the memory required for the output.
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        for i in range(len(nums)):
            if nums[i] > 0:
                break
            if i == 0 or nums[i - 1] != nums[i]:
                self.twoSum(nums, i, res)
        return res

    def twoSum(self, nums: List[int], target: int, res: List[List[int]]):
        l, r = target + 1, len(nums) - 1
        while l < r:
            sum = nums[target] + nums[l] + nums[r]
            if sum < 0:
                l += 1
            elif sum > 0:
                r -= 1
            else:
                res.append([nums[target], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1


# 3) Hashset
# Time O(n^2). twoSum is O(n), and we call it nn times.
#   Sorting the array takes O(nlogn), so overall complexity is O(nlogn + n^2)
#   This is asymptotically equivalent to O(n^2).
# Space O(n) for the hashset.
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        for i in range(len(nums)):
            if nums[i] > 0:
                break
            if i == 0 or nums[i - 1] != nums[i]:
                self.twoSum(nums, i, res)
        return res

    def twoSum(self, nums: List[int], target: int, res: List[List[int]]):
        seen = set()
        j = target + 1
        while j < len(nums):
            diff = -nums[target] - nums[j]
            if diff in seen:
                res.append([nums[target], nums[j], diff])
                while j + 1 < len(nums) and nums[j] == nums[j + 1]:
                    j += 1
            seen.add(nums[j])
            j += 1


# 4) kSum
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
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
        return kSum(nums, 0, 3)
