# Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
#
# Example 1:
#
# Input: nums = [1,2,3]
# Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
#
# Example 2:
#
# Input: nums = [0,1]
# Output: [[0,1],[1,0]]
#
# Example 3:
#
# Input: nums = [1]
# Output: [[1]]
#
# Constraints:
#
# 1 <= nums.length <= 6
# -10 <= nums[i] <= 10
# All the integers of nums are unique.


# Backtracking
# Similar
# 78. Subsets
#
# Time O(∑(k = 1 to N) P(N, k)) where P(N, k) = N! / (N - k)! = N (N - 1) ... (N - k + 1) is so-called
#   k-permutations_of_n, or partial permutation.
#   Let's do a rough estimation of the result: N! <= ∑(k = 1 to N) (N! / (N - k)!) = ∑(k = 1 to N) P(N, k) <= N * N!,
#   i.e. the algorithm performs better than O(N * N!) and a bit slower than N!.
# Space O(N!) since one has to keep N! solutions.
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []

        def go(cur, rest):
            if not rest:
                res.append(cur)
            for i in range(len(rest)):
                go(cur + [rest[i]], rest[:i] + rest[i + 1 :])

        go([], nums)
        return res
