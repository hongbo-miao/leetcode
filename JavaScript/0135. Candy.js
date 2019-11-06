// There are N children standing in a line. Each child is assigned a rating value.
// You are giving candies to these children subjected to the following requirements:
// - Each child must have at least one candy.
// - Children with a higher rating get more candies than their neighbors.
//
// What is the minimum candies you must give?
//
// Example 1:
//
// Input: [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
//
// Example 2:
//
// Input: [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
//              The third child gets 1 candy because it satisfies the above two conditions.

/**
 * @param {number[]} ratings
 * @return {number}
 */

/** 1) Using two arrays */
// Time O(n)
// Space O(n)
//
// e.g.
// ratings = [12, 4, 3, 11, 34, 34, 1, 67]
//    arr1 = [ 1, 1, 1,  2,  3,  1, 1,  2]
//    arr2 = [ 3, 2, 1,  1,  1,  2, 1,  1]
//     max = [ 3, 2, 1,  3,  3,  2, 1,  2]
const candy1 = (ratings) => {
  const len = ratings.length;
  const arr1 = Array(len).fill(1);
  const arr2 = Array(len).fill(1);

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      arr1[i] = arr1[i - 1] + 1;
    }
  }
  for (let i = ratings.length - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      arr2[i - 1] = arr2[i] + 1;
    }
  }

  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += Math.max(arr1[i], arr2[i]);
  }
  return sum;
};

/** 2) Using one array, similar to 1) */
// Time O(n)
// Space O(n)
const candy = (ratings) => {
  const len = ratings.length;
  const arr = Array(len).fill(1);
  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) {
      arr[i] = arr[i - 1] + 1;
    }
  }

  let sum = arr[len - 1];
  for (let i = len - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      arr[i - 1] = Math.max(arr[i] + 1, arr[i - 1]);
    }
    sum += arr[i - 1];
  }
  return sum;
};

/** 3 Single Pass Approach with Constant Space */
// https://leetcode.com/problems/candy/solution/
//
// Time O(n)
// Space O(1)
