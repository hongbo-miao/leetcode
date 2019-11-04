// We have a list of points on the plane.  Find the K closest points to the origin (0, 0).
// (Here, the distance between two points on a plane is the Euclidean distance.)
// You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)
//
// Example 1:
//
// Input: points = [[1,3],[-2,2]], K = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
//
// Example 2:
//
// Input: points = [[3,3],[5,-1],[-2,4]], K = 2
// Output: [[3,3],[-2,4]]
// (The answer [[-2,4],[3,3]] would also be accepted.)
//
// Note:
//
// 1 <= K <= points.length <= 10000
// -10000 < points[i][0] < 10000
// -10000 < points[i][1] < 10000

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */

/** 1) Sorting */
// Time O(n log n)
const kClosest1 = (points, K) => {
  const getDist = ([x, y]) => x ** 2 + y ** 2;
  return points
    .sort((a, b) => getDist(a) - getDist(b))
    .slice(0, K);
};

/** 2) Quick Sort */
// Time O(n)
const kClosest = (points, K) => {
  return quickSort(points, 0, points.length - 1).slice(0, K);
};

const getDist = ([x, y]) => x ** 2 + y ** 2;
const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];

const quickSort = (arr, l, r) => {
  let pivot;
  let partitionIdx;

  if (l < r) {
    pivot = r;
    partitionIdx = partition(arr, pivot, l, r);

    // sort left and right
    quickSort(arr, l, partitionIdx - 1);
    quickSort(arr, partitionIdx + 1, r);
  }
  return arr;
};

const partition = (arr, pivot, l, r) => {
  const pivotVal = getDist(arr[pivot]);
  let partitionIdx = l;

  for (let i = l; i < r; i++){
    if (getDist(arr[i]) < pivotVal){
      swap(arr, i, partitionIdx);
      partitionIdx++;
    }
  }
  swap(arr, r, partitionIdx);
  return partitionIdx;
};
