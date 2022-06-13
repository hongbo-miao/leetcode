# Given a list of strings dict where all the strings are of the same length.
# Return true if there are 2 strings that only differ by 1 character in the same index, otherwise return false.
#
# Example 1:
#
# Input: dict = ["abcd","acbd", "aacd"]
# Output: true
# Explanation: Strings "abcd" and "aacd" differ only by one character in the index 1.
#
# Example 2:
#
# Input: dict = ["ab","cd","yz"]
# Output: false
#
# Example 3:
#
# Input: dict = ["abcd","cccc","abyd","abab"]
# Output: true
#
# Constraints:
#
# The number of characters in dict <= 10^5
# dict[i].length == dict[j].length
# dict[i] should be unique.
# dict[i] contains only lowercase English letters.
#
# Follow up: Could you solve this problem in O(n * m) where n is the length of dict and m is the length of each string.


# Hashset
# Note the outer loop is for the length of the word, and the inner loop is for the length of the dict.
# This can save space and time.
#
# e.g. ["abcd","acbd", "aacd"]
# ?bcd
# ?cbd
# ?acd
# a?cd
# a?bd
# a?cd
class Solution:
    def differByOne(self, dict: List[str]) -> bool:
        m, n = len(dict), len(dict[0])
        for j in range(n):
            seen = set()
            for i in range(m):
                mask_w = dict[i][:j] + "?" + dict[i][j + 1 :]
                # print(w)
                if mask_w in seen:
                    return True
                seen.add(mask_w)
        return False
