# You are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats forever.
# - For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
# You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target. You can travel between bus stops by buses only.
# Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.
#
# Example 1:
#
# Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
# Output: 2
# Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
#
# Example 2:
#
# Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
# Output: -1
#
# Constraints:
#
# 1 <= routes.length <= 500.
# 1 <= routes[i].length <= 10^5
# All the values of routes[i] are unique.
# sum(routes[i].length) <= 10^5
# 0 <= routes[i][j] < 10^6
# 0 <= source, target < 10^6


# BFS
# https://leetcode.com/problems/bus-routes/discuss/122771/C%2B%2BJavaPython-BFS-Solution
#
# The first part loop on routes and record stop to routes mapping in to_route.
# The second part is general bfs. Take a stop from queue and find all connected route.
# The hashset seen record all visited stops and we won't check a stop for twice.
# We can also use a hashset to record all visited routes, or just clear a route after visit.
from collections import defaultdict


class Solution:
    def numBusesToDestination(
        self, routes: List[List[int]], source: int, target: int
    ) -> int:
        to_routes = defaultdict(set)
        for i, route in enumerate(routes):
            for j in route:
                to_routes[j].add(i)

        step = 0
        q = [source]
        seen = {source}
        while q:
            nodes = q.copy()
            q = []
            while nodes:
                u = nodes.pop(0)
                if u == target:
                    return step
                for v in to_routes[u]:
                    for w in routes[v]:
                        if w not in seen:
                            seen.add(w)
                            q.append(w)
                    routes[v] = []
            step += 1
        return -1
