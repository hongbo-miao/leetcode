// Given an array A of integers, return the number of (contiguous, non-empty) subarrays that have a sum divisible by K.
//
// Example 1:
//
// Input: A = [4,5,0,-2,-3,1], K = 5
// Output: 7
// Explanation: There are 7 subarrays with a sum divisible by K = 5:
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
//
// Note:
//
// 1 <= A.length <= 30000
// -10000 <= A[i] <= 10000
// 2 <= K <= 10000

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

/** 1) Prefix sum */
// Time O(N)
// Space O(K)
//
//  e.g. A = [4,5,0,-2,-3,1], K = 5
//             Map
//   step 1  {0:1}          n=4    sum=4  mod=4  count = 0+0 =0
//   step 2  {0:1,4:1}      n=5    sum=9  mod=4  count = 0+1 =1
//   step 3  {0:1,4:2}      n=0    sum=9  mod=4  count = 1+2 =3
//   step 4  {0:1,4:3}      n=-2   sum=7  mod=2  count = 3+0 =3
//   step 6  {0:1,4:3,2:1}  n=-3   sum=4  mod=4  count = 3+3 =6
//   step 7  {0:1,4:4,2:1}  n=1    sum=5  mod=0  count = 6+1 =7
function subarraysDivByK1(A, K) {
  const mods = {};
  mods[0] = 1;
  let count = 0;
  let sum = 0;
  for (const n of A) {
    sum = (sum + n) % K;
    if (sum < 0) sum += K; // Because -1 % 5 = -1, but we need the positive mod 4
    if (mods[sum] == null) mods[sum] = 0;
    count += mods[sum];
    mods[sum]++;
  }
  return count;
}

/** 2) Similar to 1), but easier to understand */
// https://www.geeksforgeeks.org/count-sub-arrays-sum-divisible-k/
//
// Let there be a subarray (i, j) whose sum is divisible by k
//   sum(i, j) = sum(0, j) - sum(0, i-1)
// Sum for any subarray can be written as q*k + rem where q is a quotient and rem is remainder
// Thus,
//     sum(i, j) = (q1 * k + rem1) - (q2 * k + rem2)
//     sum(i, j) = (q1 - q2)k + rem1-rem2
// We see, for sum(i, j) i.e. for sum of any subarray to be divisible by k, the RHS should also be divisible by k.
// (q1 - q2)k is obviously divisible by k, for (rem1-rem2) to follow the same, rem1 = rem2 where
//     rem1 = Sum of subarray (0, j) % k
//     rem2 = Sum of subarray (0, i-1) % k
// So if any sub-array sum from index i’th to j’th is divisible by k then we can saya[0]+…a[i-1] (mod k) = a[0]+…+a[j] (mod k)
function subarraysDivByK(A, K) {
  const mods = Array(K).fill(0);

  let sum = 0;
  for (const n of A) {
    sum += n;
    let mod = sum % K;
    if (mod < 0) mod += K; // as the sum can be negative
    mods[mod]++;
  }

  let res = 0;
  for (let i = 0; i < K; i++) {
    // If there are more than one prefix subarrays with a particular mods value.
    if (mods[i] > 1) {
      res += (mods[i] * (mods[i] - 1)) / 2;
    }
  }

  // add the elements which are divisible by K itself. i.e., the elements whose sum = 0
  res += mods[0];
  return res;
}
