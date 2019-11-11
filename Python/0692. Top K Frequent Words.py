# Given a non-empty list of words, return the k most frequent elements.
# Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.
#
# Example 1:
# Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
# Output: ["i", "love"]
# Explanation: "i" and "love" are the two most frequent words.
#     Note that "i" comes before "love" due to a lower alphabetical order.
#
# Example 2:
# Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
# Output: ["the", "is", "sunny", "day"]
# Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
#     with the number of occurrence being 4, 3, 2 and 1 respectively.
#
# Note:
# You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
# Input words contain only lowercase letters.
#
# Follow up:
# Try to solve it in O(n log k) time and O(n) extra space.

"""
Priority Queue
"""
# https://leetcode.com/problems/top-k-frequent-words/solution/
#
# Time O(N + klogN): heapq.heapify operation and counting operations are O(N), and each of k heapq.heappop operations are O(logN).
# Space O(N), the space used to store our count.
import heapq
from collections import Counter


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        count = Counter(words)
        q = [(-freq, word) for word, freq in count.items()]
        heapq.heapify(q)
        return [heapq.heappop(q)[1] for _ in range(k)]
