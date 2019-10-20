// There are n servers numbered from 0 to n-1 connected by undirected server-to-server connections forming a network where connections[i] = [a, b] represents a connection between servers a and b. Any server can reach any other server directly or indirectly through the network.
// A critical connection is a connection that, if removed, will make some server unable to reach some other server.
// Return all critical connections in the network in any order.
//
// Example 1:
//
//            2
//           / \
//          1 - 0
// critical |
//          3
//
// Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
// Output: [[1,3]]
// Explanation: [[3,1]] is also accepted.
//
// Constraints:
//
// 1 <= n <= 10^5
// n-1 <= connections.length <= 10^5
// connections[i][0] != connections[i][1]
// There are no repeated connections.

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */

/** Tarjan's strongly connected components algorithm */
// Introduction of Tarjan's strongly connected components algorithm
// https://www.youtube.com/watch?v=TyWtx7q2D7Y
function criticalConnections(n, connections) {
  // Build graph
  const g = [];
  for (let i = 0; i < n; i++) {
    g.push([]);
  }
  for (const [u, v] of connections) {
    g[u].push(v);
    g[v].push(u);
  }

  // Initialize
  let time = 0;  // time when discover each vertex
  const res = [];
  const low = [];  // low[u] records the lowest vertex u can reach
  const disc = [];  // disc[u] records the time when u was discovered
  for (let i = 0; i < n; i++) {
    disc.push(Infinity);  // use disc to track if visited (disc[i] == Infinity)
  }

  // DFS
  function dfs(u, pre) {
    disc[u] = low[u] = time++;  // discover u
    for (const v of g[u]) {
      if (v === pre) continue;  // if parent vertex, ignore
      if (disc[v] === Infinity) {  // if not discovered
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) {
          // u - v is critical, there is no path for v to reach back to u or previous vertices of u
          res.push([u, v]);
        }
      } else {
        // if v discovered and is not parent of u, update low[u], cannot use low[v] because u is not subtree of v
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === Infinity) {
      dfs(i, i);
    }
  }
  return res;
}
