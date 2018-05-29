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
  let obj = {};

  for (let n of nums1) {
    if (!obj[n]) obj[n] = 0;

    obj[n]++;
  }

  for (let n of nums2) {
    if (obj[n] > 0) {
      intersect.push(n);
      obj[n]--;
    }
  }

  return intersect;
}
