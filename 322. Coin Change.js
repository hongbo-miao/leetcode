// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
//
// Example 1:
//
// Input: coins = [1, 2, 5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
//
// Example 2:
//
// Input: coins = [2], amount = 3
// Output: -1
// Note:
// You may assume that you have an infinite number of each kind of coin.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// DFS + greedy + pruning
// https://youtu.be/uUETHdijzkA?t=15m5s
function coinChange(coins, amount) {
  coins.sort((a, b) => b - a);

  let res = Infinity;

  function find(k, amount, count) {
    const coin = coins[k];

    // last smallest coin
    if (k === coins.length - 1) {
      if (amount % coin === 0) {
        res = Math.min(res, count + Math.floor(amount / coin));
      }
    } else {
      for (let i = Math.floor(amount / coin); i >= 0 && count + i < res; i--) { // count + i < res is for pruning, avoid unnecessary calculation
        find(k + 1, amount - coin * i, count + i);
      }
    }
  }

  find(0, amount, 0);

  return res === Infinity ? -1 : res;
}
