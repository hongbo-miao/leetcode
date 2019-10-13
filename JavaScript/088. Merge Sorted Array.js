// Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
//
// Note:
//
// The number of elements initialized in nums1 and nums2 are m and n respectively.
// You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
//
// Example:
//
// Input:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
//
// Output: [1,2,2,3,5,6]

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

/** 1) */
// Time O(n)
function merge1(nums1, m, nums2, n) {
  let i = m + n;
  m--;
  n--;

  while (i--) {
    const n1 = nums1[m];
    const n2 = nums2[n];

    if (n1 != null && n2 != null) {
      if (n1 > n2) {
        nums1[i] = n1;
        m--;
      } else {
        nums1[i] = n2;
        n--;
      }
    } else {
      if (n1 != null) {
        nums1[i] = n1;
        m--;
      } else {
        nums1[i] = n2;
        n--;
      }
    }
  }
}

/** 2) */
// Time O(n)
function merge(nums1, m, nums2, n) {
  let i = m + n;
  m--;
  n--;

  while (i--) {
    if (n < 0 || nums1[m] > nums2[n]) { // n < 0 is for the case that all nums2 has been merged, merging the rest of nums1
      nums1[i] = nums1[m--];
    } else {
      nums1[i] = nums2[n--];
    }
  }
}
