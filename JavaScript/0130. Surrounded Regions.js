// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.
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

// DFS
//
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
const solve = (board) => {
  if (board == null || board.length === 0) return;

  const h = board.length;
  const w = board[0].length;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  const go = (x ,y) => {
    if (board[x][y] !== 'O') return;

    board[x][y] = '#';
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < h && j >= 0 && j < w) {
        go(i, j);
      }
    }
  };

  // Change every square connected to left and right borders from O to temporary #
  for (let i = 0; i < h; i++) {
    go(i, 0);
    go(i, w - 1);
  }

  // Change every square connected to top and bottom borders from O to temporary #
  for (let i = 1; i < w - 1; i++) {
    go(0, i);
    go(h - 1, i);
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      // Change the rest of O to X
      if (board[i][j] === 'O') board[i][j] = 'X';

      // Change temporary # back to O
      if (board[i][j] === '#') board[i][j] = 'O';
    }
  }
};
