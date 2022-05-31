# Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
# Implement the MovingAverage class:
#
# - MovingAverage(int size) Initializes the object with the size of the window size.
# - double next(int val) Returns the moving average of the last size values of the stream.
#
# Example 1:
#
# Input
# ["MovingAverage", "next", "next", "next", "next"]
# [[3], [1], [10], [3], [5]]
# Output
# [null, 1.0, 5.5, 4.66667, 6.0]
#
# Explanation
# MovingAverage movingAverage = new MovingAverage(3);
# movingAverage.next(1); // return 1.0 = 1 / 1
# movingAverage.next(10); // return 5.5 = (1 + 10) / 2
# movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
# movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3
#
# Constraints:
#
# 1 <= size <= 1000
# -105 <= val <= 105
# At most 104 calls will be made to next.


# 1) Array
# Time O(N) where N is the size of the moving window, since we need to retrieve NN elements from the queue at each invocation of next(val) function.
# Space O(M), where M is the length of the queue which would grow at each invocation of the next(val) function.
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.q = []

    def next(self, val: int) -> float:
        self.q.append(val)
        # calculate the sum of the moving window
        window_sum = sum(self.q[-self.size :])
        return window_sum / min(len(self.q), self.size)


# 2) Double-ended Queue
# Time O(1), as we explained in intuition.
# Space O(N), where NN is the size of the moving window.
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.q = []
        # number of elements seen so far
        self.window_sum = 0
        self.count = 0

    def next(self, val: int) -> float:
        self.count += 1
        # calculate the new sum by shifting the window
        self.q.append(val)
        tail = self.q.pop(0) if self.count > self.size else 0
        self.window_sum = self.window_sum - tail + val
        return self.window_sum / min(self.size, self.count)
