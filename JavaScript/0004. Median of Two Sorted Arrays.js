// There are two sorted arrays nums1 and nums2 of size m and n respectively.
// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
// You may assume nums1 and nums2 cannot be both empty.
//
// Example 1:
//
// nums1 = [1, 3]
// nums2 = [2]
//
// The median is 2.0
//
// Example 2:
//
// nums1 = [1, 2]
// nums2 = [3, 4]
//
// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {T}
 */

// 1) Sorting
// Time O((m + n)log(m + n))
// Space O(m + n)
const findMedianSortedArrays1 = (nums1, nums2) => {
  const nums = [...nums1, ...nums2];
  nums.sort((a, b) => a - b);
  if (nums.length % 2 !== 0) return nums[~~(nums.length / 2)];
  else return (nums[~~(nums.length / 2) - 1] + nums[~~(nums.length / 2)]) / 2;
};

// 2) Binary Search
// https://zxi.mytechroad.com/blog/algorithms/binary-search/leetcode-4-median-of-two-sorted-arrays/
//
// Time O(log(m + n))
// Space O(1)
const findMedianSortedArrays = (nums1, nums2) => {
  const len1 = nums1.length;
  const len2 = nums2.length;
  if (len1 > len2) return findMedianSortedArrays(nums2, nums1);

  const k = ~~((len1 + len2 + 1) / 2);
  let l = 0;
  let r = len1;

  while (l < r) {
    const m1 =  ~~((l + r) / 2);
    const m2 = k - m1;
    if (nums1[m1] < nums2[m2 - 1]) l = m1 + 1;
    else r = m1;
  }

  const m1 = l;
  const m2 = k - m1;

  const c1 = Math.max(
    m1 <= 0 ? -Infinity : nums1[m1 - 1],
    m2 <= 0 ? -Infinity : nums2[m2 - 1],
  );

  if ((len1 + len2) % 2 === 1) return c1;

  const c2 = Math.min(
    m1 >= len1 ? Infinity : nums1[m1],
    m2 >= len2 ? Infinity : nums2[m2],
  );

  return (c1 + c2) / 2;
};
