# Given an array of integers temperatures represents the daily temperatures, return an array res such that res[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep res[i] == 0 instead.
#
# Example 1:
#
# Input: temperatures = [73,74,75,71,69,72,76,73]
# Output: [1,1,4,2,1,1,0,0]
#
# Example 2:
#
# Input: temperatures = [30,40,50,60]
# Output: [1,1,1,0]
#
# Example 3:
#
# Input: temperatures = [30,60,90]
# Output: [1,1,0]
#
# Constraints:
#
# 1 <= temperatures.length <= 10^5
# 30 <= temperatures[i] <= 100


# 1) Brute Force
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n
        for day in range(n):
            for future_day in range(day + 1, n):
                if temperatures[future_day] > temperatures[day]:
                    res[day] = future_day - day
                    break
        return res


# 2) Monotonic Stack
# Time O(n)
# Space O(n)
#
# i t  res                      st
# 0 73 [0, 0, 0, 0, 0, 0, 0, 0] [0]
# 1 74 [1, 0, 0, 0, 0, 0, 0, 0] [1]
# 2 75 [1, 1, 0, 0, 0, 0, 0, 0] [2]
# 3 71 [1, 1, 0, 0, 0, 0, 0, 0] [2, 3]
# 4 69 [1, 1, 0, 0, 0, 0, 0, 0] [2, 3, 4]
# 5 72 [1, 1, 0, 2, 1, 0, 0, 0] [2, 5]
# 6 76 [1, 1, 4, 2, 1, 1, 0, 0] [6]
# 7 73 [1, 1, 4, 2, 1, 1, 0, 0] [6, 7]
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n
        st = []

        for i, t in enumerate(temperatures):
            # Pop until the current day's temperature is not
            # warmer than the temperature at the top of the st
            while st and temperatures[st[-1]] < t:
                prev_day = st.pop()
                res[prev_day] = i - prev_day
            st.append(i)
            # print(i, t, res, st)
        return res


# 3) Monotonic Stack, similar to 2)
# Time O(n)
# Space O(n)
#
# i t  res                      st
# 7 73 [0, 0, 0, 0, 0, 0, 0, 0] [7]
# 6 76 [0, 0, 0, 0, 0, 0, 0, 0] [6]
# 5 72 [0, 0, 0, 0, 0, 1, 0, 0] [6, 5]
# 4 69 [0, 0, 0, 0, 1, 1, 0, 0] [6, 5, 4]
# 3 71 [0, 0, 0, 2, 1, 1, 0, 0] [6, 5, 3]
# 2 75 [0, 0, 4, 2, 1, 1, 0, 0] [6, 2]
# 1 74 [0, 1, 4, 2, 1, 1, 0, 0] [6, 2, 1]
# 0 73 [1, 1, 4, 2, 1, 1, 0, 0] [6, 2, 1, 0]
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        st = []
        res = [0] * len(temperatures)
        for i in range(len(temperatures) - 1, -1, -1):
            while st and temperatures[i] >= temperatures[st[-1]]:
                st.pop()
            if st:
                res[i] = st[-1] - i
            st.append(i)
            print(i, temperatures[i], res, st)
        return res
