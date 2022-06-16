# Given a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively.
# Substrings that occur multiple times are counted the number of times they occur.
#
# Example 1:
#
# Input: s = "00110011"
# Output: 6
# Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
# Notice that some of these substrings repeat and are counted the number of times they occur.
# Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.
#
# Example 2:
#
# Input: s = "10101"
# Output: 4
# Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.
#
# Constraints:
#
# 1 <= s.length <= 10^5
# s[i] is either '0' or '1'.


# 1) Group By Character
# Time O(N)
# Space O(N)
#
# e.g. "00110011"
# B groups [2]
# A groups [2, 1]
# B groups [2, 2]
# A groups [2, 2, 1]
# B groups [2, 2, 2]
# A groups [2, 2, 2, 1]
# B groups [2, 2, 2, 2]
class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        groups = [1]
        for i in range(1, len(s)):
            if s[i - 1] != s[i]:
                groups.append(1)
                # print("A groups", groups)
            else:
                groups[-1] += 1
                # print("B groups", groups)

        res = 0
        for i in range(1, len(groups)):
            res += min(groups[i - 1], groups[i])
        return res


# 2) Linear Scan. Optimized 1)
# We can amend our Approach #1 to calculate the answer on the fly.
# Instead of storing groups, we will remember only pre = groups[-2] and cur = groups[-1].
# Then, the answer is the sum of min(pre, cur) over each different final (pre, cur) we see.
class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        res = 0
        pre, cur = 0, 1
        for i in range(1, len(s)):
            if s[i - 1] != s[i]:
                res += min(pre, cur)
                pre, cur = cur, 1
            else:
                cur += 1
        return res + min(pre, cur)
