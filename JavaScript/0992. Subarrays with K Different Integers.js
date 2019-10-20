// Given an array A of positive integers, call a (contiguous, not necessarily distinct) subarray of A good if the number of different integers in that subarray is exactly K.
// (For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.)
// Return the number of good subarrays of A.
//
// Example 1:
//
// Input: A = [1,2,1,2,3], K = 2
// Output: 7
// Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
//
// Example 2:
//
// Input: A = [1,2,1,3,4], K = 3
// Output: 3
// Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
//
// Note:
//
// 1 <= A.length <= 20000
// 1 <= A[i] <= A.length
// 1 <= K <= A.length

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

/** 1) Sliding window + hash map */
// https://leetcode.com/problems/subarrays-with-k-different-integers/discuss/234482/JavaC%2B%2BPython-Sliding-Window-atMost(K)-atMost(K-1)
//
// First you may have feeling of using sliding window. Then this idea get stuck in the middle.
// This problem will be a typical sliding window, if it asks the number of subarrays with at most K distinct elements.
//
// Just need one more step to reach the following equation:
// exactly(K) = atMost(K) - atMost(K-1)
function subarraysWithKDistinct1(A, K) {
  function atMostK(k) {
    let l = 0;
    let sum = 0;
    const count = {};

    for (let r = 0; r < A.length; r++) {
      if (count[A[r]] == null) count[A[r]] = 0;
      if (count[A[r]] === 0) k--;
      count[A[r]]++;

      while (k < 0) {
        count[A[l]]--;
        if (count[A[l]] === 0) k++;
        l++;
      }
      sum += r - l + 1;
    }
    return sum;
  }

  return atMostK(K) - atMostK(K - 1);
}

/** 2) Similar to 1), but easier to understand */
// Similar
// 3. Longest Substring Without Repeating Characters
// 904. Fruit Into Baskets
// 992. Subarrays with K Different Integers
function subarraysWithKDistinct(A, K) {
  function atMostK(k) {
    let l = 0;
    let sum = 0;
    const count = new Map();  // if use {} here, when we use Object.keys(count).length later, it will cause time limit exceeded when A has too many elements

    for (let r = 0; r < A.length; r++) {
      if (!count.has(A[r])) count.set(A[r], 0);
      count.set(A[r], count.get(A[r]) + 1);

      while (count.size > k) {
        count.set(A[l], count.get(A[l]) - 1);
        if (count.get(A[l]) === 0) count.delete(A[l]);
        l++;
      }

      // r - l + 1 is the new added total number of possibilities after adding a new number
      // e.g. if currently it is 121, after adding 2, it becomes 1212
      // r - l + 1 = 3 - 0 + 1 = 4, which are 4 new possibilities:
      // 1212
      //  212
      //   12
      //    2
      sum += r - l + 1;
    }
    return sum;
  }

  return atMostK(K) - atMostK(K - 1);
}
