# You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.
# You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1] (inclusive) and returns it. The probability of picking an index i is w[i] / sum(w).
# For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).
#
# Example 1:
#
# Input
# ["Solution","pickIndex"]
# [[[1]],[]]
# Output
# [null,0]
#
# Explanation
# Solution solution = new Solution([1]);
# solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.
#
# Example 2:
#
# Input
# ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
# [[[1,3]],[],[],[],[],[]]
# Output
# [null,1,1,1,1,0]
#
# Explanation
# Solution solution = new Solution([1, 3]);
# solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.
# solution.pickIndex(); // return 1
# solution.pickIndex(); // return 1
# solution.pickIndex(); // return 1
# solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.
#
# Since this is a randomization problem, multiple answers are allowed.
# All of the following outputs can be considered correct:
# [null,1,1,1,1,0]
# [null,1,1,1,1,1]
# [null,1,1,1,0,0]
# [null,1,1,1,0,1]
# [null,1,0,1,0,0]
# ......
# and so on.
#
# Constraints:
#
# 1 <= w.length <= 10^4
# 1 <= w[i] <= 10^5
# pickIndex will be called at most 104 times.


# Notion

# 1) Prefix Sums with Linear Search (Time Limit Exceeded)
import random


class Solution:
    # Time O(n)
    # Space O(n)
    def __init__(self, w: List[int]):
        self.prefix_sums = []
        prefix_sum = 0
        for weight in w:
            prefix_sum += weight
            self.prefix_sums.append(prefix_sum)
        self.total_sum = prefix_sum

    # Time O(n)
    # Space O(1)
    def pickIndex(self) -> int:
        target = self.total_sum * random.random()
        # run a linear search to find the target zone
        for i, prefix_sum in enumerate(self.prefix_sums):
            if target < prefix_sum:
                return i


# 2) Prefix Sums with Binary Search
import random


class Solution:
    # Time O(n)
    # Space O(n)
    def __init__(self, w: List[int]):
        self.prefix_sums = []
        prefix_sum = 0
        for weight in w:
            prefix_sum += weight
            self.prefix_sums.append(prefix_sum)
        self.total_sum = prefix_sum

    # Time O(log n)
    # Space O(1)
    def pickIndex(self) -> int:
        target = self.total_sum * random.random()
        # run a binary search to find the target zone
        l, r = 0, len(self.prefix_sums)
        while l < r:
            m = (l + r) // 2
            if self.prefix_sums[m] < target:
                l = m + 1
            else:
                r = m
        return l


# 3) Prefix Sums with Binary Search
import random
import bisect


class Solution:
    # Time O(n)
    # Space O(n)
    def __init__(self, w: List[int]):
        self.prefix_sums = []
        prefix_sum = 0
        for weight in w:
            prefix_sum += weight
            self.prefix_sums.append(prefix_sum)
        self.total_sum = prefix_sum

    # Time O(log n)
    # Space O(1)
    def pickIndex(self) -> int:
        target = self.total_sum * random.random()
        return bisect.bisect_left(self.prefix_sums, target)
