// Given an array which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays. Write an algorithm to minimize the largest sum among these m subarrays.
//
// Note:
// If n is the length of array, assume the following constraints are satisfied:
//
// 1 ≤ n ≤ 1000
// 1 ≤ m ≤ min(50, n)
//
// Examples:
//
// Input:
// nums = [7,2,5,10,8]
// m = 2
//
// Output:
// 18
//
// Explanation:
// There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8],
// where the largest sum among the two subarrays is only 18.

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */

/** Binary Search + Greedy */
// Time O(n * log(sum of array)). The binary search costs O(log(sum of array)), where sum of array is the sum of elements in nums. For each computation of F(x), the time complexity is O(n)O(n) since we only need to go through the whole array.
// Space O(1)
//
// 1. Use binary search to approach the correct answer. We have l = max number of array; r = sum of all numbers in the array
// 2. Use greedy to narrow down left and right boundaries in binary search.
//    1) Cut the array from left.
//    2) Try our best to make sure that the sum of numbers between each two cuts (inclusive) is large enough but still less than mid.
//    3) We'll end up with two results: either we can divide the array into more than m subarrays or we cannot.
//       If we can, it means that the mid value we pick is too small because we've already tried our best to make sure each part holds as many non-negative numbers as we can but we still have numbers left. So, it is impossible to cut the array into m parts and make sure each parts is no larger than mid. We should increase m. This leads to l = mid + 1;
//       If we can't, it is either we successfully divide the array into m parts and the sum of each part is less than mid, or we used up all numbers before we reach m. Both of them mean that we should lower mid because we need to find the minimum one. This leads to r = mid - 1;
function splitArray(nums, m) {
  function isValid(max) {
    let sum = 0;
    let count = 1; // subarray group count
    for (const n of nums) {
      if (sum + n > max) {
        sum = 0;
        count++;
        if (count > m) return false;
      }
      sum += n;
    }
    return true;
  }

  let l = -Infinity; // max
  let r = 0; // sum

  for (const n of nums) {
    l = Math.max(l, n);
    r += n;
  }

  while (l < r) {
    const mid = ~~((l + r) / 2);
    if (!isValid(mid)) l = mid + 1;
    else r = mid;
  }
  return l;
}
