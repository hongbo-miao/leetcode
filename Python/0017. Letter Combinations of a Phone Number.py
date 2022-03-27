# Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
# A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
#
# Example 1:
#
# Input: digits = "23"
# Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
#
# Example 2:
#
# Input: digits = ""
# Output: []
#
# Example 3:
#
# Input: digits = "2"
# Output: ["a","b","c"]
#
# Constraints:
#
# 0 <= digits.length <= 4
# digits[i] is a digit in the range ['2', '9'].


# Backtracking
# Time O(3^N * 4^M)
#   N is the number of digits in the input that maps to 3 letters (e.g. 2, 3, 4, 5, 6, 8)
#   M is the number of digits in the input that maps to 4 letters (e.g. 7, 9)
#
# Space O(3^N * 4^M) since one has to keep O(3^N * 4^M) solutions.
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        dic = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }
        res = []

        def go(i: int, s: str):
            if i == len(digits):
                res.append(s)
                return
            for c in dic[digits[i]]:
                go(i + 1, s + c)

        go(0, "")
        return res
