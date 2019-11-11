// Say you have an array for which the ith element is the price of a given stock on day i.
//
// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:
//
// - You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// - After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
//
// Example:
//
// Input: [1,2,3,0,2]
// Output: 3
// Explanation: transactions = [buy, sell, cooldown, buy, sell]

/**
 * @param {number[]} prices
 * @return {number}
 */

/** 1) Dynamic programming - state machine */
// Check the state machine image at https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75928/Share-my-DP-solution-(By-State-Machine-Thinking)
// Time O(n)
// Space O(n)
const maxProfit1 = (prices) => {
  if (prices == null || prices.length === 0) return 0;

  const s0 = Array(prices.length).fill(0);
  const s1 = Array(prices.length).fill(0);
  const s2 = Array(prices.length).fill(0);

  s0[0] = 0; // You don't have any stock if you just rest
  s1[0] = -prices[0]; // After buy, you should have -prices[0] profit
  s2[0] = -Infinity;

  for (let i = 1; i < prices.length; i++) {
    s0[i] = Math.max(s0[i - 1], s2[i - 1]); // Stay at s0, or rest from s2
    s1[i] = Math.max(s1[i - 1], s0[i - 1] - prices[i]); // Stay at s1, or buy from s0
    s2[i] = s1[i - 1] + prices[i]; // Only one way from s1
  }

  return Math.max(s0[prices.length - 1], s2[prices.length - 1]);
};

/** 2) Improved version of 1) */
// Time O(n)
// Space O(1)
const maxProfit = (prices) => {
  if (prices == null || prices.length === 0) return 0;

  let sold = 0;
  let hold = -Infinity;
  let rest = 0;

  for (const p of prices) {
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, sold);
    sold = hold + p;
  }

  return Math.max(sold, rest);
};
