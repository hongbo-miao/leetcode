# Given two strings s and t , write a function to determine if t is an anagram of s.
#
# Example 1:
#
# Input: s = "anagram", t = "nagaram"
# Output: true
#
# Example 2:
#
# Input: s = "rat", t = "car"
# Output: false
#
# Note:
# You may assume the string contains only lowercase alphabets.
#
# Follow up:
# What if the inputs contain unicode characters? How would you adapt your solution to such case?


# 1) Sorting
# Time O(n log n)
# Space O(1). Space depends on the sorting implementation which, usually, costs O(1) auxiliary space if heapsort is used.
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)


# 2) Hashmap
# Time O(n)
# Space O(n)
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        dic = {}
        for c in s:
            dic[c] = dic.get(c, 0) + 1
        for c in t:
            if c in dic and dic[c] > 0:
                dic[c] -= 1
            else:
                return False
        return True


# 3) Hashmap, similar to 2)
# Time O(n)
# Space O(n)
import collections


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        dic = collections.Counter(s)
        for c in t:
            if c in dic and dic[c] > 0:
                dic[c] -= 1
            else:
                return False
        return True
