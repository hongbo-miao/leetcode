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
            count, c = heapq.heappop(q)
            st = []
            res.append(c)

            for _ in range(k - 1):
                if len(res) == len(s):
                    return "".join(res)
                if not q:
                    return ""
                count2, c2 = heapq.heappop(q)
                res.append(c2)
                if count2 + 1 < 0:  # if c2 still has left
                    st.append((count2 + 1, c2))

            while st:
                heapq.heappush(q, st.pop())
            heapq.heappush(q, (count + 1, c))

        return "".join(res)
