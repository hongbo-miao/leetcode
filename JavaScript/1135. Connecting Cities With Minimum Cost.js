// There are N cities numbered from 1 to N.
// You are given connections, where each connections[i] = [city1, city2, cost] represents the cost to connect city1 and city2 together.  (A connection is bidirectional: connecting city1 and city2 is the same as connecting city2 and city1.)
// Return the minimum cost so that for every pair of cities, there exists a path of connections (possibly of length 1) that connects those two cities together.  The cost is the sum of the connection costs used. If the task is impossible, return -1.
//
// Example 1:
//
//      [1]
//     /   \
//    6     5
//   /       \
// [3] - 1 - [2]
//
// Input: N = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
// Output: 6
// Explanation:
// Choosing any 2 edges will connect all cities so we choose the minimum 2.
//
// Example 2:
//
// [1] - 3 - [2]
// [3] - 4 - [4]
//
// Input: N = 4, connections = [[1,2,3],[3,4,4]]
// Output: -1
// Explanation:
// There is no way to connect all cities even if all edges are used.
//
// Note:
//
// 1 <= N <= 10000
// 1 <= connections.length <= 10000
// 1 <= connections[i][0], connections[i][1] <= N
// 0 <= connections[i][2] <= 10^5
// connections[i][0] != connections[i][1]

/**
 * @param {number} N
 * @param {number[][]} connections
 * @return {number}
 */

/** 1) Kruskal's algorithm + Union Find with Path Compression */
// Introduction to Kruskal's algorithm https://www.youtube.com/watch?v=71UQH7Pr9kU
// Introduction to Union Find https://www.youtube.com/watch?v=0jNmHPfA_yE
// Introduction to Union Find Path Compression https://www.youtube.com/watch?v=VHRhJWacxis
//
// We use Kruskal’s algorithm to generate a minimum spanning tree for the graph. Use Union-Find to detect cycle.
//
// Idea is simple:
//
// 1. Sort edges to no-decreasing order
// 2. Pick the smallest edge that does not form a cycle
// 3. Repeat until minimum spanning tree (MST) is formed and every node is connected.
//
// Implemented Union-Find with path compression to improve efficiency.
function minimumCost1(N, connections) {
  let n = N;

  const parents = {};
  for (let i = 0; i < N; i++) parents[i] = i;

  function union(u, v) {
    const p1 = find(u);
    const p2 = find(v);

    if (p1 !== p2) {
      parents[p1] = p2; // or parents[p2] = p1 which does not matter
      n--;
    }
  }

  // Find root
  function find(u) {
    if (u === parents[u]) return u;
    return parents[u] = find(parents[u]); // path compression
  }

  connections.sort((a, b) => a[2] - b[2]);

  let res = 0;
  for (const [u, v, cost] of connections) {
    if (find(u) !== find(v)) {
      union(u, v);
      res += cost;
    }
  }
  return n === 1 ? res : -1;
}

/** 2) Similar to 1) */
// Similar
// 947. Most Stones Removed with Same Row or Column
// 1135. Connecting Cities With Minimum Cost
function minimumCost(N, connections) {
  let n = N;

  const parents = {};

  // Find root
  function find(u) {
    if (parents[u] == null) parents[u] = u;
    else if (parents[u] !== u) parents[u] = find(parents[u]); // path compression
    return parents[u];
  }

  function union(u, v) {
    const p1 = find(u);
    const p2 = find(v);

    if (p1 !== p2) {
      parents[p1] = p2; // or parents[p2] = p1 which does not matter
      n--;
    }
  }

  connections.sort((a, b) => a[2] - b[2]);

  let res = 0;
  for (const [u, v, cost] of connections) {
    if (find(u) !== find(v)) {
      union(u, v);
      res += cost;
    }
  }
  return n === 1 ? res : -1;
}
