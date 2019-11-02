// Given an array of non-negative integers, you are initially positioned at the first index of the array.
// Each element in the array represents your maximum jump length at that position.
// Your goal is to reach the last index in the minimum number of jumps.
//
// Example:
//
// Input: [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2.
//     Jump 1 step from index 0 to 1, then 3 steps to the last index.
//
// Note:
//
// You can assume that you can always reach the last index.

/**
 * @param {number[]} nums
 * @return {number}
 */
// Let's say the range of the current jump is [curBegin, curEnd], curFarthest is the farthest point that
// all points in [curBegin, curEnd] can reach. Once the current point reaches curEnd, then trigger another jump,
// and set the new curEnd with curFarthest, then keep the above steps
//
// This is an implicit BFS solution. i == curEnd means you visited all the items on the current level.
// Incrementing jumps++ is like incrementing the level you are on.
// And curEnd = curFarthest is like getting the queue size (level size) for the next level you are traversing.
const jump = (nums) => {
  let jumps = 0;
  let curEnd = 0;
  let curFarthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    curFarthest = Math.max(curFarthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = curFarthest;
    }
  }
  return jumps;
};
