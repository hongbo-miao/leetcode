// You are asked to cut off trees in a forest for a golf event. The forest is represented as a non-negative 2D map, in this map:
//
// 1. 0 represents the obstacle can't be reached.
// 2. 1 represents the ground can be walked through.
// 3. The place with number bigger than 1 represents a tree can be walked through, and this positive number represents the tree's height.
//
// You are asked to cut off all the trees in this forest in the order of tree's height - always cut off the tree with lowest height first. And after cutting, the original place has the tree will become a grass (value 1).
// You will start from the point (0, 0) and you should output the minimum step you need to walk to cut off all the trees. If you can't cut off all the trees, output -1 in that situation.
// You are guaranteed that no two trees have the same height and there is at least one tree needs to be cut off.
//
// Example 1:
//
// Input:
// [
//  [1,2,3],
//  [0,0,4],
//  [7,6,5]
// ]
// Output: 6
//
// Example 2:
//
// Input:
// [
//  [1,2,3],
//  [0,0,0],
//  [7,6,5]
// ]
// Output: -1
//
// Example 3:
//
// Input:
// [
//  [2,3,4],
//  [0,0,5],
//  [8,7,6]
// ]
// Output: 6
// Explanation: You started from the point (0,0) and you can cut off the tree in (0,0) directly without walking.

/**
 * @param {number[][]} forest
 * @return {number}
 */

/** BFS */
const cutOffTree = (forest) => {
  if (forest == null || forest.length === 0 || forest[0].length === 0) return 0;
  const h = forest.length;
  const w = forest[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  // BFS
  const getDist = (pos, dist) => {
    dist[pos[0]][pos[1]] = 0;
    const q = [[pos, 0]];
    while (q.length) {
      const [[x, y], d] = q.shift();
      for (const [dx, dy] of dirs) {
        const i = x + dx;
        const j = y + dy;
        if (i < 0 || i >= h || j < 0 || j >= w) continue;
        if (forest[i][j] === 0) continue; // meet obstacle
        if (dist[i][j] > d + 1) {
          dist[i][j] = d + 1;
          q.push([[i, j], d + 1]);
        }
      }
    }
  };

  const trees = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (forest[i][j] > 1) {
        trees.push([[i, j], forest[i][j]]);
      }
    }
  }
  trees.sort((a, b) => a[1] - b[1]);

  let step = 0;
  let pos = [0, 0];
  while (trees.length) {
    const dist = [...Array(h)].map(() => Array(w).fill(Infinity));
    getDist(pos, dist);
    const [pos2] = trees.shift();
    const [i, j] = pos2;
    if (dist[i][j] === Infinity) return -1; // cannot reach next position
    step += dist[i][j];
    pos = pos2;
  }
  return step;
};
