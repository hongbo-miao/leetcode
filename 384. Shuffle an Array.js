// Shuffle a set of numbers without duplicates.
//
// Example:
//
// // Init an array with set 1, 2, and 3.
// int[] nums = {1,2,3};
// Solution solution = new Solution(nums);
//
// // Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
// solution.shuffle();
//
// // Resets the array back to its original configuration [1,2,3].
// solution.reset();
//
// // Returns the random shuffling of array [1,2,3].
// solution.shuffle();

class Solution {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.nums = nums;
  }

  /**
   * Resets the array to its original configuration and return it.
   * @return {number[]}
   */
  reset() {
    return this.nums;
  }

  /**
   * Returns a random shuffling of the array.
   * @return {number[]}
   */
  shuffle() {
    let nums = [...this.nums];
    let i = nums.length;

    while (i--) {
      const n = Math.floor(Math.random() * nums.length);
      [nums[i], nums[n]] = [nums[n], nums[i]];
    }

    return nums;
  }
}
