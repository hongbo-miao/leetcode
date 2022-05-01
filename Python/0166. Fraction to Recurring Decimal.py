# Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
# If the fractional part is repeating, enclose the repeating part in parentheses.
# If multiple answers are possible, return any of them.
# It is guaranteed that the length of the answer string is less than 104 for all the given inputs.
#
# Example 1:
#
# Input: numerator = 1, denominator = 2
# Output: "0.5"
#
# Example 2:
#
# Input: numerator = 2, denominator = 1
# Output: "2"
#
# Example 3:
#
# Input: numerator = 4, denominator = 333
# Output: "0.(012)"
#
# Constraints:
#
# -2^31 <= numerator, denominator <= 2^31 - 1
# denominator != 0


# e.g. numerator = 4, denominator = 333
# dic {}
# n 4
# dic {4: 2}
# n 40
# dic {4: 2, 40: 3}
# n 67
# dic {4: 2, 40: 3, 67: 4}
# n 4
class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0:
            return "0"

        s = ""
        if (numerator < 0) ^ (denominator < 0):
            s += "-"

        n, d = abs(numerator), abs(denominator)

        s += str(n // d)
        n %= d

        if n == 0:
            return s

        s += "."

        dic = {}
        while n != 0:
            if n in dic:
                i = dic[n]  # repeat starting index
                s = s[:i] + "(" + s[i:] + ")"
                break

            dic[n] = len(s)

            n *= 10
            s += str(n // d)
            n %= d

        return s
