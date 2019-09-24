// Given two arrays, write a function to compute their intersection.
//
// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].
//
// Note:
//   Each element in the result should appear as many times as it shows in both arrays.
//   The result can be in any order.
//
// Follow up:
//   What if the given array is already sorted? How would you optimize your algorithm?
//   What if nums1's size is small compared to nums2's size? Which algorithm is better?
//   What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

function intersect1(nums1, nums2) {
  let map1 = {};
  for (let n of nums1) {
    if (map1[n] == null) map1[n] = 0;
    map1[n]++;
  }

  let map2 = {};
  for (let n of nums2) {
    if (map2[n] == null) map2[n] = 0;
    map2[n]++;
  }

  let res = [];
  Object.keys(map1).forEach(k => {
    if (map1[k] != null && map2[k] != null) {
      let min = Math.min(map1[k], map2[k]);
      while(min--) res.push(k);
    }
  });

  return res;
}

function intersect(nums1, nums2) {
  let res = [];
  let map = {};

  for (let n of nums1) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n);
      map[n]--;
    }
  }

  return res;
}
