// Given two arrays, write a function to compute their intersection.
//
// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].
//
// Note:
//   Each element in the result must be unique.
//   The result can be in any order.

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersect(nums1, nums2) {
  let intersect = [];
  let map = {};

  for (let n of nums1) {
    if (!map[n]) map[n] = 0;

    map[n]++;
  }

  for (let n of nums2) {
    if (map[n] > 0) {
      intersect.push(n);
      map[n]--;
    }
  }

  return intersect;
}
