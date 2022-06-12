# Implement a SnapshotArray that supports the following interface:
#
# SnapshotArray(int length) initializes an array-like data structure with the given length.  Initially, each element equals 0.
# void set(index, val) sets the element at the given index to be equal to val.
# int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
# int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
#
# Example 1:
#
# Input: ["SnapshotArray","set","snap","set","get"]
# [[3],[0,5],[],[0,6],[0,0]]
# Output: [null,null,0,null,5]
# Explanation:
# SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
# snapshotArr.set(0,5);  // Set array[0] = 5
# snapshotArr.snap();  // Take a snapshot, return snap_id = 0
# snapshotArr.set(0,6);
# snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
#
# Constraints:
#
# 1 <= length <= 50000
# At most 50000 calls will be made to set, snap, and get.
# 0 <= index < length
# 0 <= snap_id < (the total number of times we call snap())
# 0 <= val <= 10^9

# 1) Brute Force
# Straight forward solution, actual do snap very time snap is called
# This is quick to access, but take lots of extra space and it takes time to take snap shot, as we need to make a copy
class SnapshotArray:
    def __init__(self, length: int):
        self.cache = []
        self.dic = dict()
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        self.dic[index] = val

    def snap(self) -> int:
        self.cache.append(self.dic.copy())
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        snap = self.cache[snap_id]
        return snap[index] if index in snap else 0


# 2) Binary Search
# e.g.
#   ["SnapshotArray","set","snap","set","set","get"]
#   [[3],[0,5],[],[0,6],[1,8],[0,0]]
#
# D: [[[-1, 0], [0, 5], [1, 6]],
#     [[-1, 0]],
#     [[-1, 0]]]
class SnapshotArray:
    def __init__(self, length: int):
        # D
        # 0: index
        # 1: spap_id
        # 2: val
        self.D = [[[-1, 0]] for _ in range(length)]
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        self.D[index].append([self.snap_id, val])

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        arr = self.D[index]
        l, r = 0, len(arr)
        snap_id_idx = -1
        while l < r:
            mid = (l + r) // 2
            if arr[mid][0] <= snap_id:
                snap_id_idx = mid
                l = mid + 1
            else:
                r = mid
        if snap_id_idx == -1:
            return 0
        return arr[snap_id_idx][1]


# 3) Binary Search, similar to 2)
# e.g.
#   ["SnapshotArray","set","snap","set","set","get"]
#   [[3],[0,5],[],[0,6],[1,8],[0,0]]
#
# D: [[[-1, 0], [0, 5], [1, 6]],
#     [[-1, 0], [1, 8]],
#     [[-1, 0]]]
import bisect


class SnapshotArray:
    def __init__(self, length: int):
        # D
        # 0: index
        # 1: spap_id
        # 2: val
        self.D = [[[-1, 0]] for _ in range(length)]
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        self.D[index].append([self.snap_id, val])

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        # When compare list, it only compares the first element of the list
        # [0,3] < [1] # True
        # [0,3] < [1,2] # True
        i = bisect.bisect_right(self.D[index], [snap_id + 1]) - 1
        return self.D[index][i][1]
