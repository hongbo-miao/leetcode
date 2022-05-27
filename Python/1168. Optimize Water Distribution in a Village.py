# There are n houses in a village. We want to supply water for all the houses by building wells and laying pipes.
# For each house i, we can either build a well inside it directly with cost wells[i - 1] (note the -1 due to 0-indexing), or pipe in water from another well to it. The costs to lay pipes between houses are given by the array pipes where each pipes[j] = [house1_j, house2_j, costj] represents the cost to connect house1_j and house2_j together using a pipe. Connections are bidirectional, and there could be multiple valid connections between the same two houses with different costs.
# Return the minimum total cost to supply water to all houses.
#
# Example 1:
#
# Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
# Output: 3
# Explanation: The image shows the costs of connecting houses using pipes.
# The best strategy is to build a well in the first house with cost 1 and connect the other houses to it with cost 2 so the total cost is 3.
#
# Example 2:
#
# Input: n = 2, wells = [1,1], pipes = [[1,2,1],[1,2,2]]
# Output: 2
# Explanation: We can supply water with cost two using one of the three options:
# Option 1:
#   - Build a well inside house 1 with cost 1.
#   - Build a well inside house 2 with cost 1.
# The total cost will be 2.
# Option 2:
#   - Build a well inside house 1 with cost 1.
#   - Connect house 2 with house 1 with cost 1.
# The total cost will be 2.
# Option 3:
#   - Build a well inside house 2 with cost 1.
#   - Connect house 1 with house 2 with cost 1.
# The total cost will be 2.
# Note that we can connect houses 1 and 2 with cost 1 or with cost 2 but we will always choose the cheapest option.
#
# Constraints:
#
# 2 <= n <= 10^4
# wells.length == n
# 0 <= wells[i] <= 10^5
# 1 <= pipes.length <= 10^4
# pipes[j].length == 3
# 1 <= house1_j, house2_j <= n
# 0 <= costj <= 10^5
# house1_j != house2_j

# Union-Find with Kruskal's Algorithm
#
# Idea
# The overall idea of Kruskal's algorithm is that we iterate through all the edges ordered by their costs.
# For each edge, we decide whether to add it to the final MST.
# The decision is based on whether this new addition will help to connect more dots (i.e. vertices).
# Let NN be the number of houses, and MM be the number of pipes from the input.
#
# Time O((N+M)⋅log(N+M))
# - First, we build a list of edges, which takes O(N+M) time.
# - We then sort the list of edges, which takes O((N+M)⋅log(N+M)) time.
# - At the end, we iterate through the sorted edges. For each iteration, we invoke a Union-Find operation.
#   Hence, the time complexity for iteration O((N+M)*log(N)).
# - To sum up, the overall time complexity of the algorithm is O((N+M)⋅log(N+M)) which is dominated by the sorting step.
#
# Space O(N+M)
# - The space complexity of our Union-Find data structure is O(N).
# - The space required by the list of edges is O(N+M).
# - Finally, the space complexity of the sorting algorithm depends on the implementation of each programming language.
#   For instance, the list.sort() function in Python is implemented with the Timsort algorithm
#   whose space complexity is O(n) where n is the number of the elements.
# - To sum up, the overall space complexity of the algorithm is O(N+M) which is dominated by the list of edges.
class Solution:
    def minCostToSupplyWater(
        self, n: int, wells: List[int], pipes: List[List[int]]
    ) -> int:
        ordered_edges = []
        # Add the virtual vertex (index with 0) along with the new edges.
        for i, cost in enumerate(wells):
            ordered_edges.append((cost, 0, i + 1))

        # Add the existing edges
        for x, y, cost in pipes:
            ordered_edges.append((cost, x, y))

        # Sort the entire edges by the cost
        ordered_edges.sort(key=lambda i: i[0])

        # Iterate through the ordered edges
        uf = UnionFind(n + 1)
        total_cost = 0
        for cost, x, y in ordered_edges:
            # Determine if we should add the new edge to the final MST
            if uf.union(x, y):
                total_cost += cost

        return total_cost


class UnionFind:
    def __init__(self, size):
        self.root = [i for i in range(size)]
        self.rank = [1] * size

    # Path compression.
    def find(self, x):
        if x == self.root[x]:
            return x
        self.root[x] = self.find(self.root[x])
        return self.root[x]

    # Union by rank
    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX != rootY:
            if self.rank[rootX] > self.rank[rootY]:
                self.root[rootY] = rootX
            elif self.rank[rootX] < self.rank[rootY]:
                self.root[rootX] = rootY
            else:
                self.root[rootY] = rootX
                self.rank[rootX] += 1
            return True  # Merged
        return False  # Not merged, including cycle
