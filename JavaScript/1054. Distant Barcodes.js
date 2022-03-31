// In a warehouse, there is a row of barcodes, where the i-th barcode is barcodes[i].
// Rearrange the barcodes so that no two adjacent barcodes are equal.  You may return any answer, and it is guaranteed an answer exists.
//
// Example 1:
//
// Input: [1,1,1,2,2,2]
// Output: [2,1,2,1,2,1]
// Example 2:
//
// Input: [1,1,1,1,2,2,3,3]
// Output: [1,3,1,3,2,1,2,1]
//
// Note:
//
// 1 <= barcodes.length <= 10000
// 1 <= barcodes[i] <= 10000

/**
 * @param {number[]} barcodes
 * @return {number[]}
 */

// 1)
// Time O(max(KlogK, N))
//
// map { '1': 2, '2': 3 }
// nums [ '1', '2' ]
// k 1
// idx 1
// idx 3
// k 2
// idx 0
// idx 2
// idx 4
const rearrangeBarcodes = (barcodes) => {
  const map = {};
  barcodes.forEach(b => map[b] = (map[b] || 0) + 1);
  const nums = Object.keys(map).sort((k1, k2) => map[k1] - map[k2]);

  let idx = 1;
  for (const n of nums) {
    const count = map[n];

    for (let i = 0; i < count; i++) {
      if (idx >= barcodes.length) idx = 0;
      barcodes[idx] = n;
      idx += 2;
    }
  }

  return barcodes;
};

// 2) Priority Queue
// Similar
// 358. Rearrange String k Distance Apart
// 767. Reorganize String
// 1054. Distant Barcodes
//
// JavaScript is lack of priority queue
