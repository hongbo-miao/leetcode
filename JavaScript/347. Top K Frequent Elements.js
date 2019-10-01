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

/** 1) Bucket sorting */
// time O(n)
// space O(n) array -> O(k) hashtable
function topKFrequent1(nums, k) {
  // number frequency map
  const map = {};
  for (let n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  // store map to a bucket based on frequency
  const bucket = [];
  for (let n in map) {
    const freq = map[n];
    if (bucket[freq] == null) bucket[freq] = [];
    bucket[freq].push(Number(n));
  }

  // get most frequent numbers
  const res = [];
  for (let freq = bucket.length - 1; freq >= 0; freq--) {
    if (bucket[freq] == null) continue;
    res.push(...bucket[freq]);

    if (res.length === k) return res;
  }

  return res;
}

/** 2) */
function topKFrequent(nums, k) {
  const map = {};
  for (let n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  const arr = [];
  Object.keys(map).forEach(n => {
    arr.push({ n, count: map[n] });
  });

  return arr
    .sort((a, b) => b.count - a.count)
    .slice(0, k)
    .map(a => Number(a.n));
}
