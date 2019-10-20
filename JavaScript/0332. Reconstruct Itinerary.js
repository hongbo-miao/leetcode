// Given a list of airline tickets represented by pairs of departure and arrival airports [from, to], reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK. Thus, the itinerary must begin with JFK.
//
// Note:
//
// If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string. For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// All airports are represented by three capital letters (IATA code).
// You may assume all tickets form at least one valid itinerary.
//
// Example 1:
//
// Input: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Output: ["JFK", "MUC", "LHR", "SFO", "SJC"]
//
// Example 2:
//
// Input: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
// Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"].
//              But it is larger in lexical order.

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

/** Sort children + post-order traversal, DFS */
// https://www.youtube.com/watch?v=4udFSOWQpdg
//
// Time O(n log n), worst case: one 'from' and the rest are all 'tos', and sort on 'tos'
function findItinerary(tickets) {
  // create graph
  const graph = {};
  for (const [from, to] of tickets) {
    if (graph[from] == null) graph[from] = [];
    graph[from].push(to);
  }
  for (const from in graph) {
    graph[from].sort(); // sort 'tos' in lexical order
  }

  // Post-order traversal, DFS
  const route = [];

  function dfs(from) {
    const tos = graph[from] || [];
    while (tos.length) {
      const to = tos.shift(); // get the lexical smallest 'to'
      dfs(to);
    }
    route.push(from);
  }

  dfs('JFK');
  return route.reverse();
}
