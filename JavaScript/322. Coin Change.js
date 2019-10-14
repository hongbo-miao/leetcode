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
/** 1) Dynamic programming */
// Similar
// 279. Perfect Squares
// 300. Longest Increasing Subsequence
// 322. Coin Change
//
// https://leetcode.com/problems/coin-change/discuss/77377/Javascript-Solution-(faster-than-90%2B-submissions)-*added-explanation
// changes is an array to store the least amount of coins we need to make up a certain amount of money, the index of
// changes means the amount of money to make up, so changes[x] means to make up money amount x how many coins we need at least
//
// Now, imagine if changes[0] ... to changes[10] is already known, and we need to calculate changes[11], coins = [1, 2, 5],
// we know we have to take at least one coin from coins list otherwise we won't be able to make up 11
//
// If we take coins[0] which has value 1, and now the total amount of money we need to make up becomes 10, and how many
// coins we need at least to make up 10 is known already as changes[10], so if we take coins[0] to make up amount 11,
// the least amount of coins we need will be 1 + changes[10]
//
// If we take coins[1] which has value 2, the least amount of coins we need will be 1 + changes[9]
// If we take coins[2] which has value 5, the least amount of coins we need will be 1 + changes[6]
//
// changes[11] = min(1 + changes[10], 1 + changes[9], 1 + changes[6])
//
// From the explanation above, we can see that to calculate changes[x], we will need to know the values from changes[0]
// to changes[x-1], so in order to know changes[x] we start to calculate from changes[0]
//
// Corner cases are when the amount remaining to make up is less than the coin value, in this case, we simply continue
// to the next coin, and if all coins values are greater than the amount to make up (changes[amount] will equal to
// Infinity), that means we don't have any coin to make up that amount, so return -1
//
// e.g. coins = [1, 2, 5], amount = 11
// dp =
// [0, 1, I, I, I, I, I, I, I, I, I, I]  // I stands for Infinity
// [0, 1, 1, I, I, I, I, I, I, I, I, I]
// [0, 1, 1, 2, I, I, I, I, I, I, I, I]
// [0, 1, 1, 2, 2, I, I, I, I, I, I, I]
// [0, 1, 1, 2, 2, 1, I, I, I, I, I, I]
// [0, 1, 1, 2, 2, 1, 2, I, I, I, I, I]
// [0, 1, 1, 2, 2, 1, 2, 2, I, I, I, I]
// [0, 1, 1, 2, 2, 1, 2, 2, 3, I, I, I]
// [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, I, I]
// [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, I]
// [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
function coinChange(coins, amount) {
  // dp[i] represents the least amount of coins that can make the value equals to the i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(
          dp[i],
          dp[i - coins[j]] + 1,
        );
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/** 2) DFS + greedy + pruning */
// https://youtu.be/uUETHdijzkA
function coinChange1(coins, amount) {
  coins.sort((a, b) => b - a);

  let res = Infinity;

  function find(k, amount, count) {
    const coin = coins[k];

    // last smallest coin
    if (k === coins.length - 1) {
      if (amount % coin === 0) {
        res = Math.min(res, count + ~~(amount / coin));
      }
    } else {
      for (let i = ~~(amount / coin); i >= 0 && count + i < res; i--) { // count + i < res is for pruning, avoid unnecessary calculation
        find(k + 1, amount - coin * i, count + i);
      }
    }
  }

  find(0, amount, 0);

  return res === Infinity ? -1 : res;
}
