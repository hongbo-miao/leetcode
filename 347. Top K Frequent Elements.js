// Given a non-empty array of integers, return the k most frequent elements.
//
// For example,
// Given [1,1,1,2,2,3] and k = 2, return [1,2].
//
// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// Bucket sorting
// Time complexity O(n)
// Space complexity O(n) array -> O(k) hashtable
function topKFrequent(nums, k) {
  let map = {};
  let bucket = [];
  let res = [];

  // number frequency map
  for (let n of nums) {
    if (map[n] === undefined) map[n] = 0;
    map[n]++;
  }

  // store map to a bucket based on frequency
  for (let n in map) {
    const freq = map[n];
    if (bucket[freq] === undefined) bucket[freq] = [];
    bucket[freq].push(Number(n));
  }

  // get most frequent numbers
  for (let freq = bucket.length - 1; freq >= 0; freq--) {
    if (bucket[freq] === undefined) continue;
    res.push(...bucket[freq]);

    if (res.length === k) return res;
  }

  return res;
}
