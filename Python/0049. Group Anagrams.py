# Given an array of strings strs, group the anagrams together. You can return the answer in any order.
#
# An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
#
# Example 1:
#
# Input: strs = ["eat","tea","tan","ate","nat","bat"]
# Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
#
# Example 2:
#
# Input: strs = [""]
# Output: [[""]]
#
# Example 3:
#
# Input: strs = ["a"]
# Output: [["a"]]
#
#
# Constraints:
#
# 1 <= strs.length <= 10^4
# 0 <= strs[i].length <= 100
# strs[i] consists of lowercase English letters.


# 1) Categorize by sorted strings
# Time O(NK log K), where N is the length of strs, and K is the maximum length of a string in strs
#   The outer loop has complexity O(N) as we iterate through each string. Then, we sort each string in O(K log K) time
# Space O(NK), the total information content stored in groups.
from collections import defaultdict


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        dic = defaultdict(list)
        for w in strs:
            # sorted("cab") -> ['a', 'b', 'c']
            # "".join(sorted("cab")) -> "abc"
            s = "".join(sorted(w))
            dic[s].append(w)
        return dic.values()


# 2) Categorize by character counts
# Time O(NK), where N is the length of strs, and K is the maximum length of a string in strs. Counting each string
#   is linear in the size of the string, and we count every string.
# Space O(NK), the total information content stored in ans.
#
# Two strings are anagrams if and only if their character counts (respective number of occurrences of each character)
# are the same.
#
# We can transform each string s into a character count, count, consisting of 26 non-negative integers representing
# the number of a's, b's, c's, etc. We use these counts as the basis for our hashmap.
