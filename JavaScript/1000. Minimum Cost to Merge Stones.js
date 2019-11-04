// There are N piles of stones arranged in a row.  The i-th pile has stones[i] stones.
// A move consists of merging exactly K consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these K piles.
// Find the minimum cost to merge all piles of stones into one pile.  If it is impossible, return -1.
//
// Example 1:
//
// Input: stones = [3,2,4,1], K = 2
// Output: 20
// Explanation:
// We start with [3, 2, 4, 1].
// We merge [3, 2] for a cost of 5, and we are left with [5, 4, 1].
// We merge [4, 1] for a cost of 5, and we are left with [5, 5].
// We merge [5, 5] for a cost of 10, and we are left with [10].
// The total cost was 20, and this is the minimum possible.
//
// Example 2:
//
// Input: stones = [3,2,4,1], K = 3
// Output: -1
// Explanation: After any merge operation, there are 2 piles left, and we can't merge anymore.  So the task is impossible.
//
// Example 3:
//
// Input: stones = [3,5,1,2,6], K = 3
// Output: 25
// Explanation:
// We start with [3, 5, 1, 2, 6].
// We merge [5, 1, 2] for a cost of 8, and we are left with [3, 8, 6].
// We merge [3, 8, 6] for a cost of 17, and we are left with [17].
// The total cost was 25, and this is the minimum possible.
//
// Note:
//
// 1 <= stones.length <= 30
// 2 <= K <= 30
// 1 <= stones[i] <= 100

/**
 * @param {number[]} stones
 * @param {number} K
 * @return {number}
 */

/** 1) Dynamic Programming */
// https://zxi.mytechroad.com/blog/dynamic-programming/leetcode-1000-minimum-cost-to-merge-stones/
//
// Time O(n^3 * k)
// Space O(n^3)
const mergeStones = (stones, K) => {
  const n = stones.length;
  if ((n - 1) % (K - 1)) return -1;

  const sums = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + stones[i];
  }

  // dp[i][j][k] is min cost to merge subarray i ~ j into k piles.
  const dp = [...Array(n)].map(() => [...Array(n)].map(() => Array(K + 1).fill(Infinity)));
  for (let i = 0; i < n; i++) {
    dp[i][i][1] = 0;
  }

  for (let l = 2; l <= n; l++) { // sub problem length
    for (let i = 0; i <= n - l; i++) { // start
      const j = i + l - 1; // end
      for (let k = 2; k <= K; k++) { // piles
        for (let m = i; m < j; m += K - 1) { // split point
          dp[i][j][k] = Math.min(dp[i][j][k], dp[i][m][1] + dp[m + 1][j][k - 1]);
        }
      }
      dp[i][j][1] = dp[i][j][K] + sums[j + 1] - sums[i];
    }
  }
  return dp[0][n - 1][1];
};

/** 2) Dynamic Programming (Optimized) */
// https://zxi.mytechroad.com/blog/dynamic-programming/leetcode-1000-minimum-cost-to-merge-stones/
//
// Time O(n^3 / k)
// Space O(n^2)
