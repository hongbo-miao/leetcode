# Given a string s which represents an expression, evaluate this expression and return its value.
# The integer division should truncate toward zero.
# You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].
# Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().
#
# Example 1:
#
# Input: s = "3+2*
# # 2"
# Output: 7
# Example 2:
#
# Input: s = " 3/2 "
# Output: 1
#
# Example 3:
#
# Input: s = " 3+5 / 2 "
# Output: 5
#
# Constraints:
#
# 1 <= s.length <= 3 * 10^5
# s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
# s represents a valid expression.
# All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].
# The answer is guaranteed to fit in a 32-bit integer.


# https://leetcode.com/problems/basic-calculator-ii/discuss/658480/Python-Basic-Calculator-I-II-III-easy-solution-detailed-explanation
# The idea is to use both stack and recursion (which can be seen as 2 stack, because recursion use implicit stack). First, let us consider, that we do not have any brackets. Then let us keep the stack of monomial, consider the example s = 1*2 - 3\4*5 + 6. Then we want our stack to be equal to [1*2, -3\4*5, 6], let us do it step by step:
# 1. Put 1 into stack, we have stack = [1].
# 2. We can see that operation is equal to *, so we pop the last element from our stack and put new element: 1*2, now stack = [1*2].
# 3. Now, operation is equal to -, so we put -3 to stack and we have stack = [1*2, -3] now
# 4. Now, operation is equal to \, so we pop the last element from stack and put -3\4 instead, stack = [1*2, -3\4]
# 5. Now, operation is equal to *, so we pop last element from stack and put -3\4*5 instead, stack = [1*2, -3\4*5].
# 6. Finally, operation is equal to +, so we put 6 to stack: stack = [1*2, -3\4*5, 6]
# Now, all we need to do is to return sum of all elements in stack.
class Solution:
    def calculate(self, s):
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
