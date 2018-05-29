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
// Time complexity O(m * n * 4^l), l = word.length
// Space complexity O(m * n + l)
function exist(board, word) {
  function search(row, col, k){
    if (
      row < 0 ||
      col < 0 ||
      row === board.length ||
      col === board[0].length ||
      board[row][col] !== word[k]
    ) return false;

    if (k === word.length - 1) return true;

    // mark as visited
    board[row][col] = '*';

    if (search(row - 1, col, k + 1)) return true;  // up
    if (search(row + 1, col, k + 1)) return true;  // down
    if (search(row, col - 1, k + 1)) return true;  // left
    if (search(row, col + 1, k + 1)) return true;  // right

    // reset
    board[row][col] = word[k];

    return false;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (search(i, j, 0)) return true;
    }
  }

  return false;
}
