# Write a function that takes a string as input and returns the string reversed.
#
# Example:
# Given s = "hello", return "olleh".


class Solution:
    def reverseString1(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """

        # Cheating
        s.reverse()

    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        s[:] = s[::-1]
