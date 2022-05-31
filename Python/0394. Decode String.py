# Given an encoded string, return its decoded string.
# The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
# You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].
# The test cases are generated so that the length of the output will never exceed 105.
#
# Example 1:
#
# Input: s = "3[a]2[bc]"
# Output: "aaabcbc"
#
# Example 2:
#
# Input: s = "3[a2[c]]"
# Output: "accaccacc"
#
# Example 3:
#
# Input: s = "2[abc]3[cd]ef"
# Output: "abcabccdcdcdef"
#
# Constraints:
#
# 1 <= s.length <= 30
# s consists of lowercase English letters, digits, and square brackets '[]'.
# s is guaranteed to be a valid input.
# All the integers in s are in the range [1, 300].


# Stack
#
# e.g. 10[a]2[bc]
# n  curN  1
# n  curN  10
# [  st    ['', 10]
# s  curS  a
# ]  curS  aaaaaaaaaa
# n  curN  2
# [  st    ['aaaaaaaaaa', 2]
# s  curS  b
# s  curS  bc
# ]  curS  aaaaaaaaaabcbc
class Solution:
    def decodeString(self, s: str) -> str:
        st = []
        curN = 0
        curS = ""
        for c in s:
            if c == "[":
                st.append(curS)
                st.append(curN)
                curS = ""
                curN = 0
                # print("[ st", st)
            elif c == "]":
                n = st.pop()
                prevS = st.pop()
                curS = prevS + n * curS
                # print("] curS", curS)
            elif c.isdigit():
                curN = curN * 10 + int(c)
                # print("n curN", curN)
            else:
                curS += c
                # print("s curS", curS)
        return curS
