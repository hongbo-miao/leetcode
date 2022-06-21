# Let's define a function countUniqueChars(s) that returns the number of unique characters on s.
# - For example, calling countUniqueChars(s) if s = "LEETCODE" then "L", "T", "C", "O", "D" are the unique characters since they appear only once in s, therefore countUniqueChars(s) = 5.
# Given a string s, return the sum of countUniqueChars(t) where t is a substring of s.
# Notice that some substrings can be repeated so in this case you have to count the repeated ones too.
#
# Example 1:
#
# Input: s = "ABC"
# Output: 10
# Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
# Every substring is composed with only unique letters.
# Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
#
# Example 2:
#
# Input: s = "ABA"
# Output: 8
# Explanation: The same as example 1, except countUniqueChars("ABA") = 1.
#
# Example 3:
#
# Input: s = "LEETCODE"
# Output: 92
#
# Constraints:
#
# 1 <= s.length <= 10^5
# s consists of uppercase English letters only.

# https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/discuss/128952/JavaC%2B%2BPython-One-pass-O(N)
# Time O(n)
# Space O(1)
#
# Intuition
# Let's think about how a character can be found as a unique character.
#
# Think about string "XAXAXXAX" and focus on making the second "A" a unique character.
# We can take "XA(XAXX)AX" and between "()" is our substring.
# We can see here, to make the second "A" counted as a uniq character, we need to:
# 1. insert "(" somewhere between the first and second A
# 2. insert ")" somewhere between the second and third A
# For step 1 we have "A(XA" and "AX(A", 2 possibility.
# For step 2 we have "A)XXA", "AX)XA" and "AXX)A", 3 possibilities.
#
# So there are in total 2 * 3 = 6 ways to make the second A a unique character in a substring.
# In other words, there are only 6 substring, in which this A contribute 1 point as unique string.
#
# Instead of counting all unique characters and struggling with all possible substrings,
# we can count for every char in S, how many ways to be found as a unique char.
# We count and sum, and it will be out answer.
#
# Explanation
# 1. index[26][2] record last two occurrence index for every upper characters.
# 2. Initialise all values in index to -1.
# 3. Loop on string S, for every character c, update its last two occurrence index to index[c].
# 4. Count when loop. For example, if "A" appears twice at index 3, 6, 9 seperately, we need to count:
#    - For the first "A": (6-3) * (3-(-1))"
#    - For the second "A": (9-6) * (6-3)"
#    - For the third "A": (N-9) * (9-6)"
#
#
# e.g.
#   ABCADAE
# A 0  3 5  (Use A as example)
# (0-(-1))*(3-0) = 1*3 = 3
# (3-0)*(5-3) = 3*2 = 6
# (7-5)*(5-3) = 2*2 = 4
#
# Logs
# {'A': (-1, -1), 'B': (-1, -1), 'C': (-1, -1), 'D': (-1, -1), 'E': (-1, -1), ...}
# c  k  j i
# A -1 -1 0
# res 0
# B -1 -1 1
# res 0
# C -1 -1 2
# res 0
# A -1 0 3
# res 3
# D -1 -1 4
# res 3
# A 0 3 5
# res 9
# E -1 -1 6
# res 9
# {'A': (3, 5), 'B': (-1, 1), 'C': (-1, 2), 'D': (-1, 4), 'E': (-1, 6), ...}
#
# ####
#
# c  k  j i
# A  3  5 7
# res 13
# B -1  1 7
# res 25
# C -1  2 7
# res 40
# D -1  4 7
# res 55
# E -1  6 7
# res 62
# ...
# Z -1 -1 7
# res 62
from string import ascii_uppercase


class Solution:
    def uniqueLetterString(self, s: str) -> int:
        index = {c: (-1, -1) for c in ascii_uppercase}
        print(index)
        res = 0
        for i, c in enumerate(s):
            k, j = index[c]
            print(c, k, j, i)
            res += (i - j) * (j - k)
            index[c] = (j, i)
            # print("res", res)
        print(index)
        # print("####")
        for c in index:
            k, j = index[c]
            print(c, k, j, len(s))
            res += (len(s) - j) * (j - k)
            # print("res", res)
        return res
