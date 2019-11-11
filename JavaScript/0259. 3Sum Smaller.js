// Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.
//
// Example:
//
// Input: nums = [-2,0,1,3], and target = 2
// Output: 2
// Explanation: Because there are two triplets which sums are less than 2:
//              [-2,0,1]
//              [-2,0,3]
//
// Follow up: Could you solve it in O(n2) runtime?

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/** 1) Brute force */
// Time O(n^3)
// Space O(1)

/** 2) Two pointers */
// Time O(n^2). The twoSumSmaller function takes O(n) time because both left and right traverse at most n steps.
//   Therefore, the overall time complexity is O(n^2)
// Space O(1)
//
// Let us try sorting the array first. For example, nums = [3,5,2,8,1] becomes [1,2,3,5,8].
// Let us look at an example nums = [1,2,3,5,8], and target = 7.
//
// [1, 2, 3, 5, 8]
//  ↑           ↑
// left       right
//
// Let us initialize two indices, left and right pointing to the first and last element respectively.
// When we look at the sum of first and last element, it is 1 + 8 = 9, which is >= target.
// That tells us no index pair will ever contain the index right.
// So the next logical step is to move the right pointer one step to its left.
//
// [1, 2, 3, 5, 8]
//  ↑        ↑
// left    right
//
// Now the pair sum is 1 + 5 = 6, which is < target.
// How many pairs with one of the index = left that satisfy the condition?
// You can tell by the difference between right and left which is 3, namely (1,2), (1,3), (1,5).
// Therefore, we move left one step to its right.
const threeSumSmaller = (nums, target) => {
  nums.sort((a, b) => a - b);

  const twoSumSmaller = (startIdx, target) => {
    let count = 0;
    let l = startIdx;
    let r = nums.length - 1;
    while (l < r) {
      if (nums[l] + nums[r] < target) {
        count += r - l;
        l++;
      } else {
        r--;
      }
    }
    return count;
  };

  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    count += twoSumSmaller(i + 1, target - nums[i]);
  }
  return count;
};
