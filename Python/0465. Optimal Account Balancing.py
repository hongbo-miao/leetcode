# You are given an array of transactions transactions where transactions[i] = [from_i, to_i, amount_i] indicates that the person with ID = from_i gave amount_i $ to the person with ID = to_i.
# Return the minimum number of transactions required to settle the debt.
#
# Example 1:
#
# Input: transactions = [[0,1,10],[2,0,5]]
# Output: 2
# Explanation:
# Person #0 gave person #1 $10.
# Person #2 gave person #0 $5.
# Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.
#
# Example 2:
#
# Input: transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
# Output: 1
# Explanation:
# Person #0 gave person #1 $10.
# Person #1 gave person #0 $1.
# Person #1 gave person #2 $5.
# Person #2 gave person #0 $5.
# Therefore, person #1 only need to give person #0 $4, and all debt is settled.
#
# Constraints:
#
# 1 <= transactions.length <= 8
# transactions[i].length == 3
# 0 <= from_i, to_i < 12
# from_i != to_i
# 1 <= amount_i <= 100


# Notion

# https://www.youtube.com/watch?v=HHKJPtsOGwk
from collections import Counter


class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        balances = Counter()
        for u, v, n in transactions:
            balances[u] += n
            balances[v] -= n

        vals = [v for v in balances.values() if v != 0]
        return self.dfs(0, vals)

    def dfs(self, k, vals):
        if k == len(vals):
            return 0

        cur = vals[k]
        if cur == 0:
            return self.dfs(k + 1, vals)

        mi = float("inf")
        for i in range(k + 1, len(vals)):
            next = vals[i]
            if cur * next < 0:
                vals[i] = cur + next
                mi = min(mi, 1 + self.dfs(k + 1, vals))
                vals[i] = next  # Backtracking, restore the original value

                # Optimization
                if cur + next == 0:
                    break
        return mi
