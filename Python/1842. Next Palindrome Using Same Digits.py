# You are given a numeric string num, representing a very large palindrome.
# Return the smallest palindrome larger than num that can be created by rearranging its digits. If no such palindrome exists, return an empty string "".
# A palindrome is a number that reads the same backward as forward.
#
# Example 1:
#
# Input: num = "1221"
# Output: "2112"
# Explanation: The next palindrome larger than "1221" is "2112".
#
# Example 2:
#
# Input: num = "32123"
# Output: ""
# Explanation: No palindromes larger than "32123" can be made by rearranging the digits.
#
# Example 3:
#
# Input: num = "45544554"
# Output: "54455445"
# Explanation: The next palindrome larger than "45544554" is "54455445".
#
# Constraints:
#
# 1 <= num.length <= 10^5
# num is a palindrome.


# https://leetcode.com/problems/next-palindrome-using-same-digits/discuss/1642071/Python3-Straightforward-O(N)-solution
# 1. Find the next permutation that is greater than the first half of the palindrome, say greaterHalf
# 2. Add it to the mid item if there is one and to reversed of greaterHalf
class Solution:
    def nextPalindrome(self, num: str) -> str:
        num_list = list(num)
        m = len(num) // 2
        midStr = "" if (len(num) % 2 == 0) else num_list[m]

        left_greater = self.get_next_larger(num_list[:m])
        if not left_greater:
            return ""

        return "".join(left_greater) + midStr + "".join(reversed(left_greater))

    def get_next_larger(self, sList):
        i = len(sList) - 2
        while i >= 0 and sList[i] >= sList[i + 1]:
            i -= 1
        if i < 0:
            return []

        j = len(sList) - 1
        while j >= 0 and sList[i] >= sList[j]:
            j -= 1

        sList[i], sList[j] = sList[j], sList[i]
        sList[i + 1 :] = reversed(sList[i + 1 :])
        return sList
