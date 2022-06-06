# Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
# Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.
# Implement the HitCounter class:
# - HitCounter() Initializes the object of the hit counter system.
# - void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
# - int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).
#
# Example 1:
#
# Input
# ["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
# [[], [1], [2], [3], [4], [300], [300], [301]]
# Output
# [null, null, null, null, 3, null, 4, 3]
#
# Explanation
# HitCounter hitCounter = new HitCounter();
# hitCounter.hit(1);       // hit at timestamp 1.
# hitCounter.hit(2);       // hit at timestamp 2.
# hitCounter.hit(3);       // hit at timestamp 3.
# hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
# hitCounter.hit(300);     // hit at timestamp 300.
# hitCounter.getHits(300); // get hits at timestamp 300, return 4.
# hitCounter.getHits(301); // get hits at timestamp 301, return 3.
#
# Constraints:
#
# 1 <= timestamp <= 2 * 10^9
# All the calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).
# At most 300 calls will be made to hit and getHits.
#
# Follow up: What if the number of hits per second could be huge? Does your design scale?


# 1) Queue
# Space: O(n)
from collections import deque


class HitCounter:
    def __init__(self):
        self.hits = deque()

    # Time O(1)
    def hit(self, timestamp: int) -> None:
        self.hits.append(timestamp)

    # Time O(n). In the worst case scenario, we might end up removing all the
    # entries from the queue in getHits method if the difference in timestamp
    # is greater than or equal to 300.
    def getHits(self, timestamp: int) -> int:
        while self.hits and timestamp - self.hits[0] >= 300:
            self.hits.popleft()
        return len(self.hits)


# 2) Optimized Queue Space.
# Space
# If there are a total of N elements that we encountered throughout,
# the space complexity is O(N).
# However, in the case of repetitions, the space required for storing those k values O(1).
class HitCounter:
    def __init__(self):
        self.total_hits = 0
        self.hits = deque()

    # Time O(1)
    def hit(self, timestamp: int) -> None:
        if not self.hits or self.hits[-1][0] != timestamp:
            self.hits.append([timestamp, 1])
        else:
            self.hits[-1][1] += 1
        self.total_hits += 1

    # Time
    # If there are a total of nn pairs present in the deque, worst case time complexity can be O(n).
    # However, by clubbing all the timestamps with same value together,
    # for the ith timestamp with k repetitions, the time complexity is O(1) as here,
    # instead of removing all those k repetitions, we only remove a single entry from the deque.
    def getHits(self, timestamp: int) -> int:
        while self.hits and timestamp - self.hits[0][0] >= 300:
            self.total_hits -= self.hits.popleft()[1]
        return self.total_hits
