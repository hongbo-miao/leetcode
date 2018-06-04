// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.
// 
// A region is captured by flipping all 'O's into 'X's in that surrounded region.
// 
// Example:
// 
// X X X X
// X O O X
// X X O X
// X O X X
//
// After running your function, the board should be:
// 
// X X X X
// X X X X
// X X X X
// X O X X
//
// Explanation:
// 
// Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/** BFS */
// Check four borders. If it is O, change it and all its neighbor to temporary #
// Change all O to X
// Change all # to O
//
// e.g.
// X X X X      X X X X      X X X X
// X X O X  ->  X X O X  ->  X X X X
// X O X X      X 1 X X      X O X X
// X O X X      X 1 X X      X O X X
function solve(board) {
  if (board.length === 0) return;

  // mark every square connected to top and bottom borders O -> temporary #
  for (let i = 0; i < board[0].length; i++) {
    bfs(board, 0, i);
    bfs(board, board.length - 1, i);
  }

  // mark every square connected to left and right borders O -> temporary #
  for (let i = 0; i < board.length; i++) {
    bfs(board, i, 0);
    bfs(board, i, board[0].length - 1);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      // change the rest of O -> X
      if (board[i][j] === 'O') board[i][j] = 'X';

      // change temporary # back to O
      if (board[i][j] === '#') board[i][j] = 'O';
    }
  }
}

function bfs(board, i ,j) {
  if (board[i][j] !== 'O') return;

  board[i][j] = '#';

  if (i - 1 > 0 && i - 1 < board.length) bfs(board, i - 1, j);
  if (i + 1 > 0 && i + 1 < board.length) bfs(board, i + 1, j);
  if (j - 1 > 0 && j - 1 < board[0].length) bfs(board, i, j - 1);
  if (j + 1 > 0 && j + 1 < board[0].length) bfs(board, i, j + 1);
}
