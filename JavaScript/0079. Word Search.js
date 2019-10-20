// Given a 2D board and a word, find if the word exists in the grid.
//
// The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
//
// Example:
//
// board =
//   [
//     ['A','B','C','E'],
//     ['S','F','C','S'],
//     ['A','D','E','E']
//   ]
//
// Given word = "ABCCED", return true.
// Given word = "SEE", return true.
// Given word = "ABCB", return false.

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

// https://www.youtube.com/watch?v=oUeGFKZvoo4
//
// Time O(mn * 4^l), l = word.length
// Space O(mn + l)
function exist(board, word) {
  if (board.length === 0) return false;

  const h = board.length;
  const w = board[0].length;

  function go(i, j, k) {
    if (i < 0 || j < 0 || i >= h || j >= w) return false;
    if (board[i][j] !== word[k]) return false;
    if (k === word.length - 1) return true;

    board[i][j] = '*';      // mark as visited

    if (go(i - 1, j, k + 1)) return true; // up
    if (go(i + 1, j, k + 1)) return true; // down
    if (go(i, j - 1, k + 1)) return true; // left
    if (go(i, j + 1, k + 1)) return true; // right

    board[i][j] = word[k]; // reset
    return false;
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (go(i, j, 0)) return true;
    }
  }

  return false;
}
