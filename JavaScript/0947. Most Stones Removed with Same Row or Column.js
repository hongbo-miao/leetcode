// On a 2D plane, we place stones at some integer coordinate stones. Each coordinate point may have at most one stone.
// Now, a move consists of removing a stone that shares a column or row with another stone on the grid.
// What is the largest possible number of moves we can make?
//
// Example 1:
//
// Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
// Output: 5
//
// Example 2:
//
// Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
// Output: 3
//
// Example 3:
//
// Input: stones = [[0,0]]
// Output: 0
//
// Note:
//
// 1 <= stones.length <= 1000
// 0 <= stones[i][j] < 10000

/**
 * @param {number[][]} stones
 * @return {number}
 */

// 1) DFS
// https://www.jianshu.com/p/30d2058db7f7
  //
// Time O(n^2)
// Space O(n^2)
const removeStones1 = (stones) => {
  const rVisited = new Set();
  const cVisited = new Set();
  const rows = {};
  const cols = {};

  for (const [i, j] of stones) {
    if (rows[i] == null) rows[i] = [];
    rows[i].push(j);
    if (cols[j] == null) cols[j] = [];
    cols[j].push(i);
  }

  const dfsRow = (i) => {
    rVisited.add(i);
    for (const j of rows[i]) {
      if (!cVisited.has(j)) dfsCol(j);
    }
  };

  const dfsCol = (i) => {
    cVisited.add(i);
    for (const j of cols[i]) {
      if (!rVisited.has(j)) dfsRow(j);
    }
  };

  let islands = 0;
  for (const [i] of stones) {
    if (!rVisited.has(i)) {
      islands++;
      dfsRow(i);
    }
  }
  return stones.length - islands;
};

// 2) Union Find
// Similar
// 947. Most Stones Removed with Same Row or Column
// 1135. Connecting Cities With Minimum Cost
//
// Time O(n log n), where n is the length of stones. (If we used union-by-rank, this can be O(n * α(n)), where α is the Inverse-Ackermann function.)
// Space O(n)
const removeStones = (stones) => {
  const parents = {};
  let islands = 0;

  const find = (u) => {
    if (parents[u] == null) {
      islands++;
      parents[u] = u;
    }
    else if (parents[u] !== u) parents[u] = find(parents[u]); // path compression
    return parents[u];
  };

  const union = (u, v) => {
    const p1 = find(u);
    const p2 = find(v);
    if (p1 !== p2) {
      parents[p1] = p2;
      islands--;
    }
  };

  for (const [u, v] of stones) {
    union(u, ~v);
  }

  return stones.length - islands;
};
