# You are given two 0-indexed arrays of strings startWords and targetWords. Each string consists of lowercase English letters only.
# For each string in targetWords, check if it is possible to choose a string from startWords and perform a conversion operation on it to be equal to that from targetWords.
# The conversion operation is described in the following two steps:
# 1. Append any lowercase letter that is not present in the string to its end.
#   - For example, if the string is "abc", the letters 'd', 'e', or 'y' can be added to it, but not 'a'. If 'd' is added, the resulting string will be "abcd".
# 2. Rearrange the letters of the new string in any arbitrary order.
#   - For example, "abcd" can be rearranged to "acbd", "bacd", "cbda", and so on. Note that it can also be rearranged to "abcd" itself.
# Return the number of strings in targetWords that can be obtained by performing the operations on any string of startWords.
# Note that you will only be verifying if the string in targetWords can be obtained from a string in startWords by performing the operations. The strings in startWords do not actually change during this process.
#
# Example 1:
#
# Input: startWords = ["ant","act","tack"], targetWords = ["tack","act","acti"]
# Output: 2
# Explanation:
# - In order to form targetWords[0] = "tack", we use startWords[1] = "act", append 'k' to it, and rearrange "actk" to "tack".
# - There is no string in startWords that can be used to obtain targetWords[1] = "act".
#   Note that "act" does exist in startWords, but we must append one letter to the string before rearranging it.
# - In order to form targetWords[2] = "acti", we use startWords[1] = "act", append 'i' to it, and rearrange "acti" to "acti" itself.
#
# Example 2:
#
# Input: startWords = ["ab","a"], targetWords = ["abc","abcd"]
# Output: 1
# Explanation:
# - In order to form targetWords[0] = "abc", we use startWords[0] = "ab", add 'c' to it, and rearrange it to "abc".
# - There is no string in startWords that can be used to obtain targetWords[1] = "abcd".
#
# Constraints:
#
# 1 <= startWords.length, targetWords.length <= 5 * 104
# 1 <= startWords[i].length, targetWords[j].length <= 26
# Each string of startWords and targetWords consists of lowercase English letters only.
# No letter occurs more than once in any string of startWords or targetWords.


# Bitmask
# https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/discuss/1676852/Python3-bitmask
#
# Idea
# for each word in startWords
#   seen.add(bitmask of word)
# for each word in targetWords
#   for each character c in word
#     if bitmask(word with c removed) present in seen
#       consider word to be found
#
# ord(c) - 97 is returning an index according to the character.
#   "a" returns 0
#   "b" returns 1
# 1 << ord(c) - 97 means shifting the 1 by ord(c) - 97 positions.
#   "a" returns binary 1
#   "b" returns binary 10
#   "c" returns binary 100
# ^ is XOR
class Solution:
    def wordCount(self, startWords: List[str], targetWords: List[str]) -> int:
        seen = set()
        for w in startWords:
            m = 0
            for c in w:
                m ^= 1 << ord(c) - 97
            seen.add(m)

        res = 0
        for w in targetWords:
            m = 0
            for c in w:
                m ^= 1 << ord(c) - 97

            for c in w:
                # word with c removed, 1 ^ 1 -> 0
                if m ^ (1 << ord(c) - 97) in seen:
                    res += 1
                    # Break because for each target word, we only count one match
                    # startWords = ["act", "atz"], targetWords = ["actz"] -> 1 instead of 2
                    break
        return res
