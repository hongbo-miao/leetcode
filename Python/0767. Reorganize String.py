# Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.
# If possible, output any possible result.  If not possible, return the empty string.
#
# Example 1:
#
# Input: S = "aab"
# Output: "aba"
#
# Example 2:
#
# Input: S = "aaab"
# Output: ""
#
# Note:
#
# S will consist of lowercase letters and have length in range [1, 500].


"""
Priority queue
"""
# So at max we need the top 2 highest counts.
# so pre_count, pre_c is to store the previous count and c which is (count and value)
#
# e.g. "aab"
# If you take the counts and put that in heap it becomes [(-2, 'a'), (-1, 'b')]
# Now you need a way to alternate the top 2 picks (just so their adj characters are different)
# You already know pre_count and pre_c is to store the prev counts, so initially they are 0 and "" (0 counts and no string)
#
# 1st iteration:
#
# 1. count, c = heapq.heappop(pq) -> Taking out the top value which is (-2, 'a')
# 2. res += c => add that to result string; result string becomes "a"
# 3. count += 1 => since we took 1 a out of 2 a we increment the count so now the heap value of a becomes (-1, 'a')
# 4. pre_count, pre_c = count, c => capture the a and updated count 1 to pre_count and pre_c
#
# 2nd iteration:
# Now the heap only has (-1, 'b') (why? heappoped (-2, a) in 1st iteration
# Now perform 1, 2 from 1st iteration => result string becomes "ab"
# Now check your prev pre_count and pre_c since there is a remaining count of -1 for pre_count which means the prev top element is not exhausted yet, so push it back to heap heapq.heappush(pq, (pre_count, pre_c))
#
# 3 iteration:
# Same as 1st iteration.
#
# Since you dont have any values in the heap you check if the res string is == S, why ? (if your input is like 'aaa' then the heap approach will give you 'aaa' which is same as S)

"""
Priority queue
"""
import heapq
from collections import Counter


class Solution:
    def reorganizeString(self, S: str) -> str:
        q = [(-count, c) for c, count in Counter(S).items()]
        heapq.heapify(q)

        res = ""
        pre_count, pre_c = 0, ""
        while q:
            count, c = heapq.heappop(q)
            res += c
            if pre_count < 0:  # if c still has left
                heapq.heappush(q, (pre_count, pre_c))
            count += 1
            pre_count, pre_c = count, c

        if len(res) != len(S):
            return ""
        return res
