# Given a non-empty string s and an integer k, rearrange the string such that the same characters are at least distance k from each other.
#
# All input strings are given in lowercase letters. If it is not possible to rearrange the string, return an empty string "".
#
# Example 1:
#
# Input: s = "aabbcc", k = 3
# Output: "abcabc"
# Explanation: The same letters are at least distance 3 from each other.
#
# Example 2:
#
# Input: s = "aaabc", k = 3
# Output: ""
# Explanation: It is not possible to rearrange the string.
#
# Example 3:
#
# Input: s = "aaadbbcc", k = 2
# Output: "abacabcd"
# Explanation: The same letters are at least distance 2 from each other.


"""
Priority queue
"""

import heapq
from collections import Counter


class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        q = [(-count, c) for c, count in Counter(s).items()]
        heapq.heapify(q)
        res = []
        while len(res) < len(s):
            if not q: return ""
            freq, char = heapq.heappop(q)
            stack = []
            res.append(char)
            for j in range(k - 1):
                if len(res) == len(s): return "".join(res)
                if not q: return ""
                fre, nex = heapq.heappop(q)
                res.append(nex)
                if fre < -1:
                    stack.append((fre + 1, nex))
            while stack:
                heapq.heappush(q, stack.pop())
            heapq.heappush(q, (freq + 1, char))
        return "".join(res)
