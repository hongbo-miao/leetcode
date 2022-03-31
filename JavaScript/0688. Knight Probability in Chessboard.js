// On an NxN chessboard, a knight starts at the r-th x and c-th column and attempts to make exactly K moves. The rows and columns are 0 indexed, so the top-left square is (0, 0), and the bottom-right square is (N-1, N-1).
// A chess knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.
// Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.
// The knight continues moving until it has made exactly K moves or has moved off the chessboard. Return the probability that the knight remains on the board after it has stopped moving.
//
// Example:
//
// Input: 3, 2, 0, 0
// Output: 0.0625
// Explanation: There are two moves (to (1,2), (2,1)) that will keep the knight on the board.
// From each of those positions, there are also two moves that will keep the knight on the board.
// The total probability the knight stays on the board is 0.0625.
//
// Note:
//
// N will be between 1 and 25.
// K will be between 0 and 100.
// The knight always initially starts on the board.

/**
 * @param {number} N
 * @param {number} K
 * @param {number} r
 * @param {number} c
 * @return {number}
 */

// 1) Backtracking
const knightProbability1 = (N, K, r, c) => {
  const map = {};
  const dirs = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]];

  const go = (x, y, k) => {
    const key = `${k}:${x}:${y}`;
    if (map[key]) return map[key];
    if (k === 0) return 1;

    let count = 0;
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;

      if (i >= 0 && i < N && j >= 0 && j < N) {
        count += go(i, j, k - 1);
      }
    }
    map[key] = count;
    return count;
  };
  return go(r, c, K) / 8 ** K;
};

// 2) Dynamic Programming
// Time O(N^2 * K)
// Space O(N^2)
//
// At every k and position i j we store the probability that the knight landed at position i j at step k.
// We know that this probability is the sum of probabilities of the 8 directions in the previous step k-1
// because in the previous step all 8 of those knight's have a chance of moving here.
// We initialize the r , c index of the k==0 board to 1, because at step 0, we already have the knight at position
// r, c so the chance it lands there in 0 steps is 100%.
const knightProbability = (N, K, r, c) => {
  const dirs = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]];

  const dp = [...Array(K + 1)].map(() =>
    [...Array(N)].map(() => Array(N).fill(0))
  );
  dp[0][r][c] = 1;

  for (let k = 1; k <= K; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (const [dx, dy] of dirs) {
          const x = i + dx;
          const y = j + dy;
          if (x >= 0 && x < N && y >= 0 && y < N) {
            dp[k][i][j] += dp[k - 1][x][y] / 8;
          }
        }
      }
    }
  }

  let res = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      res += dp[K][i][j];
    }
  }
  return res;
};
