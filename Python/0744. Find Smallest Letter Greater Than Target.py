# Given a characters array letters that is sorted in non-decreasing order and a character target, return the smallest character in the array that is larger than target.
# Note that the letters wrap around.
# For example, if target == 'z' and letters == ['a', 'b'], the answer is 'a'.
#
# Example 1:
#
# Input: letters = ["c","f","j"], target = "a"
# Output: "c"
#
# Example 2:
#
# Input: letters = ["c","f","j"], target = "c"
# Output: "f"
#
# Example 3:
#
# Input: letters = ["c","f","j"], target = "d"
# Output: "f"
#
# Constraints:
#
# 2 <= letters.length <= 10^4
# letters[i] is a lowercase English letter.
# letters is sorted in non-decreasing order.
# letters contains at least two different characters.
# target is a lowercase English letter.


# 1) Linear Scan
# Time O(n)
# Space O(1)
class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        for c in letters:
            if c > target:
                return c
        return letters[0]


# 2) Binary Search
# Time O(log n)
# Space O(1)
class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        if target >= letters[-1]:
            return letters[0]
        l, r = 0, len(letters) - 1
        while l < r:
            m = (l + r) // 2
            # Note use "<=" to find the upper bound, e.g. (["c","f","j"], "c") -> "f"
            if letters[m] <= target:
                l = m + 1
            else:
                r = m
        return letters[l]


# 3) Binary Search, similar to 2)
import bisect


class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        if target >= letters[-1]:
            return letters[0]
        i = bisect.bisect_right(letters, target)
        return letters[i]
