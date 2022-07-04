# Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.
# The closest is defined as the absolute difference minimized between two integers.
#
# Example 1:
#
# Input: n = "123"
# Output: "121"
#
# Example 2:
#
# Input: n = "1"
# Output: "0"
# Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
#
# Constraints:
#
# 1 <= n.length <= 18
# n consists of only digits.
# n does not have leading zeros.
# n is representing an integer in the range [1, 10^18 - 1].


# https://leetcode.com/problems/find-the-closest-palindrome/discuss/147949/Thinking-Process
class Solution:
    def nearestPalindromic(self, n: str) -> str:
        # <= 10 or equal to 100, 1000, 10000, ...
        if int(n) <= 10 or (int(n) % 10 == 0 and int(n[1:]) == 0):
            return str(int(n) - 1)
        # 11 or 101, 1001, 10001, 100001, ...
        elif int(n) == 11 or (int(n) % 10 == 1 and n[0] == "1" and int(n[1:-1]) == 0):
            return str(int(n) - 2)
        # 99, 999, 9999, 99999, ...
        elif n[0] == "9" and n[0] * len(n) == n:
            return str(int(n) + 2)
        else:

            def build_palindrome(base: str, is_even_length=True) -> str:
                """
                Build a palindrome using the given base.

                e.g.
                build_palindrome("123", True) = "123321"
                build_palindrome("123", False) = "12321"
                """
                if is_even_length:
                    return base + "".join(reversed(base))
                else:
                    return base[:-1] + base[-1] + "".join(reversed(base[:-1]))

            is_n_even = len(n) % 2 == 0
            palindrome_base = (
                int(n[0 : len(n) // 2]) if is_n_even else int(n[0 : len(n) // 2 + 1])
            )

            is_n_palindrome = build_palindrome(str(palindrome_base), is_n_even) == n
            base_candidates = (
                [palindrome_base - 1, palindrome_base + 1]
                if is_n_palindrome
                # Maintains increasing order
                else [palindrome_base - 1, palindrome_base, palindrome_base + 1]
            )
            # print(f"base_candidates: {base_candidates}")

            min_diff = float("inf")
            for base_candidate in base_candidates:
                candidate = int(build_palindrome(str(base_candidate), is_n_even))
                # print(f"candidate: {candidate} diff: {abs(candidate - int(n))}")
                if abs(candidate - int(n)) < min_diff:
                    min_diff = abs(candidate - int(n))
                    min_base_candidate = str(base_candidate)

            return build_palindrome(min_base_candidate, is_n_even)
