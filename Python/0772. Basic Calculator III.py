# Implement a basic calculator to evaluate a simple expression string.
# The expression string contains only non-negative integers, '+', '-', '*', '/' operators, and open '(' and closing parentheses ')'. The integer division should truncate toward zero.
# You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].
# Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
#
# Example 1:
#
# Input: s = "1+1"
# Output: 2
#
# Example 2:
#
# Input: s = "6-4/2"
# Output: 4
#
# Example 3:
#
# Input: s = "2*(5+5*2)/3+(6/2+8)"
# Output: 21
#
# Constraints:
#
# 1 <= s <= 10^4
# s consists of digits, '+', '-', '*', '/', '(', and ')'.
# s is a valid expression.


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
