# Write a function to find the longest common prefix string amongst an array of strings.
# If there is no common prefix, return an empty string "".
#
# Example 1:
#
# Input: strs = ["flower","flow","flight"]
# Output: "fl"

# Example 2:
#
# Input: strs = ["dog","racecar","car"]
# Output: ""
# Explanation: There is no common prefix among the input strings.
#
# Constraints:
#
# 1 <= strs.length <= 200
# 0 <= strs[i].length <= 200
# strs[i] consists of only lower-case English letters.


# 1) Vertical scanning
# Time O(S), where S is the sum of all characters in all strings
#   In the worst case there will be nn equal strings with length m and the algorithm performs S = m * n character comparisons
#   In the best case there are at most n * minLen comparisons where minLen is the length of the shortest string in the array
# Space O(1)
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs:
            return ""
        str0 = strs[0]
        for i, c in enumerate(str0):
            for s in strs[1:]:
                if i >= len(s) or c != s[i]:
                    return str0[:i]
        return str0


# 2) Vertical scanning, similar to 1)
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs:
            return ""
        min_s = min(strs, key=len)
        for i, c in enumerate(min_s):
            for s in strs:
                if c != s[i]:
                    return min_s[:i]
        return min_s
