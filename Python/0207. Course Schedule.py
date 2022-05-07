# There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
#
# For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
# Return true if you can finish all courses. Otherwise, return false.
#
# Example 1:
#
# Input: numCourses = 2, prerequisites = [[1,0]]
# Output: true
# Explanation: There are a total of 2 courses to take.
# To take course 1 you should have finished course 0. So it is possible.
#
# Example 2:
#
# Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
# Output: false
# Explanation: There are a total of 2 courses to take.
# To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
#
# Constraints:
#
# 1 <= numCourses <= 2000
# 0 <= prerequisites.length <= 5000
# prerequisites[i].length == 2
# 0 <= ai, bi < numCourses
# All the pairs prerequisites[i] are unique.

# DFS
# If node v has not been visited, then mark it as 0.
# If node v is being visited, then mark it as -1. If we find a vertex marked as -1 in DFS, then their is a ring.
# If node v has been visited, then mark it as 1. If a vertex was marked as 1, then no ring contains v or its successors.
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        if not prerequisites:
            return True

        graph = [[] for _ in range(numCourses)]
        for pair in prerequisites:
            graph[pair[1]].append(pair[0])

        visited = [0 for _ in range(numCourses)]

        def dfs(i):
            if visited[i] == -1:
                return False
            if visited[i] == 1:
                return True
            visited[i] = -1
            for j in graph[i]:
                if not dfs(j):
                    return False
            visited[i] = 1
            return True

        for i in range(numCourses):
            if not dfs(i):
                return False
        return True


# 2) Topological Sorting + BFS
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        in_degrees = [0] * numCourses
        for v, _ in prerequisites:
            in_degrees[v] += 1

        q = []
        for i in range(len(in_degrees)):
            if in_degrees[i] == 0:
                q.append(i)

        finished = 0
        while q:
            u0 = q.pop(0)
            finished += 1
            for v, u in prerequisites:
                if u == u0:
                    in_degrees[v] -= 1
                    if in_degrees[v] == 0:
                        q.append(v)
        return True if finished == numCourses else False
