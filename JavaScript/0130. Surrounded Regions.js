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

// Idea
// 1) Check four borders. If it is O, change it and all its neighbor to temporary #
// 2) Change all O to X
// 3) Change all # to O
//
// Example
// X X X X      X X X X      X X X X
// X X O X  ->  X X O X  ->  X X X X
// X O X X      X # X X      X O X X
// X O X X      X # X X      X O X X
function solve(board) {
  if (board == null || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;

  function mark(i ,j) {
    if (i < 0 || i > m - 1 || j < 0 || j > n - 1) return;
    if (board[i][j] !== 'O') return;

    board[i][j] = '#';

    mark(i - 1, j);
    mark(i + 1, j);
    mark(i, j - 1);
    mark(i, j + 1);
  }

  // change every square connected to left and right borders from O to temporary #
  for (let i = 0; i < m; i++) {
    mark(i, 0);
    mark(i, n - 1);
  }

  // change every square connected to top and bottom borders from O to temporary #
  for (let i = 1; i < n - 1; i++) {
    mark(0, i);
    mark(m - 1, i);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // change the rest of O to X
      if (board[i][j] === 'O') board[i][j] = 'X';

      // change temporary # back to O
      if (board[i][j] === '#') board[i][j] = 'O';
    }
  }
}
