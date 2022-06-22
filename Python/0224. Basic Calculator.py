# Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.
# Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
#
# Example 1:
#
# Input: s = "1 + 1"
# Output: 2
#
# Example 2:
#
# Input: s = " 2-1 + 2 "
# Output: 3
#
# Example 3:
#
# Input: s = "(1+(4+5+2)-3)+(6+8)"
# Output: 23
#
# Constraints:
#
# 1 <= s.length <= 3 * 10^5
# s consists of digits, '+', '-', '(', ')', and ' '.
# s represents a valid expression.
# '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
# '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
# There will be no two consecutive operators in the input.
# Every number and running calculation will fit in a signed 32-bit integer.


# Copy from 772. Basic Calculator III
class Solution:
    def calculate(self, s: str) -> int:
        i = 0
        n = 0
        st = []
        sign = "+"

        while i < len(s):
            if s[i].isdigit():
                n = n * 10 + int(s[i])  # e.g. '14' -> 1 * 10 + 4
            elif s[i] in "+-*/":
                self.compute(sign, n, st)
                n = 0
                sign = s[i]
            elif s[i] == "(":  # For BC I and BC III
                n, j = self.calculate(s[i + 1 :])
                i = i + j
            elif s[i] == ")":  # For BC I and BC III
                self.compute(sign, n, st)
                return sum(st), i + 1
            i += 1

        self.compute(sign, n, st)
        return sum(st)

    def compute(self, op, n, st):
        if op == "+":
            st.append(n)
        if op == "-":
            st.append(-n)
        if op == "*":
            st.append(st.pop() * n)  # for BC II and BC III
        if op == "/":
            st.append(int(st.pop() / n))  # for BC II and BC III
