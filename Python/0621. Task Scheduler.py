# Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.
# However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.
# Return the least number of units of times that the CPU will take to finish all the given tasks.
#
# Example 1:
#
# Input: tasks = ["A","A","A","B","B","B"], n = 2
# Output: 8
# Explanation:
# A -> B -> idle -> A -> B -> idle -> A -> B
# There is at least 2 units of time between any two same tasks.
#
# Example 2:
#
# Input: tasks = ["A","A","A","B","B","B"], n = 0
# Output: 6
# Explanation: On this case any permutation of size 6 would work since n = 0.
# ["A","A","A","B","B","B"]
# ["A","B","A","B","A","B"]
# ["B","B","B","A","A","A"]
# ...
# And so on.
#
# Example 3:
#
# Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
# Output: 16
# Explanation:
# One possible solution is
# A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
#
#
# Constraints:
#
# 1 <= task.length <= 10^4
# tasks[i] is upper-case English letter.
# The integer n is in the range [0, 100].


# Math
# Time O(n)
# Space O(1)
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        # Frequencies of the tasks
        frequencies = [0] * 26
        for t in tasks:
            frequencies[ord(t) - ord("A")] += 1

        # Task max frequency
        f_max = max(frequencies)
        # The number of tasks with same max frequency
        n_max = frequencies.count(f_max)

        return max(
            # Case 1
            # AB...AB... = (f_max - 1) * (n + 1)
            # AB...AB...AB = (f_max - 1) * (n + 1) + n_max
            (f_max - 1) * (n + 1) + n_max,
            # Case 2
            # e.g. (ABC)(ABD)(ABEF)
            len(tasks),
        )
