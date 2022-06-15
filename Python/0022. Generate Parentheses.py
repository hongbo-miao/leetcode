# Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
#
# Example 1:
#
# Input: n = 3
# Output: ["((()))","(()())","(())()","()(())","()()()"]
#
# Example 2:
#
# Input: n = 1
# Output: ["()"]
#
# Constraints:
# 1 <= n <= 8

# 1) Backtracking
# The complexity analysis rests on understanding how many elements there are in generateParenthesis(n). It turns out
# this is the n-th Catalan number 1 / n+1 (2n n), which is bounded asymptotically by 4^n / (n * sqrt(n))
# Time O(4^n / sqrt(n)). Each valid sequence has at most n steps during the backtracking procedure.
# Space O(4^n / sqrt(n)). As described above, and using O(n) space to store the sequence.
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def go(l, r, s):
            if len(s) == 2 * n:
                res.append(s)
                return
            if l < n:
                go(l + 1, r, s + "(")
            if r < l:
                go(l, r + 1, s + ")")

        go(0, 0, "")
        return res


# 2) Backtracking, similar to 1)
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def go(l, r, s):
            if l == 0 and r == 0:
                res.append(s)
                return
            if l > 0:
                go(l - 1, r, s + "(")
            if r > l:
                go(l, r - 1, s + ")")

        go(n, n, "")
        return res
