# You are given an array of strings products and a string searchWord.
# Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
# Return a list of lists of the suggested products after each character of searchWord is typed.
#
# Example 1:
#
# Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
# Output: [
# ["mobile","moneypot","monitor"],
# ["mobile","moneypot","monitor"],
# ["mouse","mousepad"],
# ["mouse","mousepad"],
# ["mouse","mousepad"]
# ]
# Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
# After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
# After typing mou, mous and mouse the system suggests ["mouse","mousepad"]
#
# Example 2:
#
# Input: products = ["havana"], searchWord = "havana"
# Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
#
# Example 3:
#
# Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
# Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
#
# Constraints:
#
# 1 <= products.length <= 1000
# 1 <= products[i].length <= 3000
# 1 <= sum(products[i].length) <= 2 * 10^4
# All the strings of products are unique.
# products[i] consists of lowercase English letters.
# 1 <= searchWord.length <= 1000
# searchWord consists of lowercase English letters.


# 1) Binary Search
#
# Time O(nlog(n)) + O(mlog(n)), where n is the length of products and m is the length of the search word
# Space: Varies between O(1) and O(n) where n is the length of products, as it depends on the implementation used for sorting.
class Solution:
    def suggestedProducts(
        self, products: List[str], searchWord: str
    ) -> List[List[str]]:
        products.sort()
        res = []
        prefix = ""
        i = 0
        for c in searchWord:
            prefix += c
            i = self.lower_bound(products, prefix)
            res.append([w for w in products[i : i + 3] if w.startswith(prefix)])
        return res

    def lower_bound(self, arr, target):
        l = 0
        r = len(arr)
        while l < r:
            m = (l + r) // 2
            if arr[m] < target:
                l = m + 1
            else:
                r = m
        return l


# 2) Binary Search, similar to 1)
# https://leetcode.com/problems/search-suggestions-system/discuss/436674/C%2B%2BJavaPython-Sort-and-Binary-Search-the-Prefix
#
# Time O(nlog(n)) + O(mlog(n)), where n is the length of products and m is the length of the search word
# Space: Varies between O(1) and O(n) where n is the length of products, as it depends on the implementation used for sorting.
#
# Intuition
# In a sorted list of words,
# for any word A[i],
# all its sugested words must following this word in the list.
#
# For example, if A[i] is a prefix of A[j],
# A[i] must be the prefix of A[i + 1], A[i + 2], ..., A[j]
import bisect


class Solution:
    def suggestedProducts(
        self, products: List[str], searchWord: str
    ) -> List[List[str]]:
        products.sort()
        res = []
        prefix = ""
        i = 0
        for c in searchWord:
            prefix += c
            # Optimization: 3rd parameter allows the binary search starts from i
            i = bisect.bisect_left(products, prefix, i)
            res.append([w for w in products[i : i + 3] if w.startswith(prefix)])
        return res
