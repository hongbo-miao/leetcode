// Let's play the minesweeper game (Wikipedia, online game)!
//
// You are given a 2D char matrix representing the game board. 'M' represents an unrevealed mine, 'E' represents an unrevealed empty square, 'B' represents a revealed blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, digit ('1' to '8') represents how many mines are adjacent to this revealed square, and finally 'X' represents a revealed mine.
//
// Now given the next click position (row and column indices) among all the unrevealed squares ('M' or 'E'), return the board after revealing this position according to the following rules:
//
// 1. If a mine ('M') is revealed, then the game is over - change it to 'X'.
// 2. If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B') and all of its adjacent unrevealed squares should be revealed recursively.
// 3. If an empty square ('E') with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
// 4. Return the board when no more squares will be revealed.
//
// Example 1:
//
// Input:
//
// [['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'M', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E'],
//  ['E', 'E', 'E', 'E', 'E']]
//
// Click : [3,0]
//
// Output:
//
// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]
//
// Explanation:
//
// Example 2:
//
// Input:
//
// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]
//
// Click : [1,2]
//
// Output:
//
// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'X', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]
//
// Explanation:
//
// Note:
//
// The range of the input matrix's height and width is [1,50].
// The click position will only be an unrevealed square ('M' or 'E'), which also means the input board contains at least one clickable square.
// The input board won't be a stage when game is over (some mines have been revealed).
// For simplicity, not mentioned rules should be ignored in this problem. For example, you don't need to reveal all the unrevealed mines when the game is over, consider any cases that you will win the game or flag any squares.

/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */

/** 1) DFS */
const updateBoard1 = (board, click) => {
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  const h = board.length;
  const w = board[0].length;

  const dfs = (x, y) => {
    // Count the adjacent mines
    let minesCount = 0;
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;

      if (i >= 0 && i < h && j >= 0 && j < w && board[i][j] === 'M') {
        minesCount++;
      }
    }

    if (minesCount > 0) {
      // If an empty square ('E') with at least one adjacent mine is revealed,
      // then change it to a digit ('1' to '8') representing the number of adjacent mines.
      board[x][y] = String(minesCount);
    } else {
      // If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B')
      // and all of its adjacent unrevealed squares should be revealed recursively.
      board[x][y] = 'B';
      board[x][y] = 'B';

      for (const [dx, dy] of dirs) {
        const i = x + dx;
        const j = y + dy;

        if (i >= 0 && i < h && j >= 0 && j < w && board[i][j] === 'E') {
          board[i][j] = 'B';
          dfs(i, j);
        }
      }
    }
  };

  const [x, y] = click;
  if (board[x][y] === 'M') {
    // If a mine ('M') is revealed, then the game is over - change it to 'X'
    board[x][y] = 'X';
  } else {
    dfs(x, y);
  }
  return board;
};

/** 2) BFS */
const updateBoard = (board, click) => {
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  const h = board.length;
  const w = board[0].length;

  const bfs = (x, y) => {
    const q = [[x, y]];

    while (q.length > 0) {
      const [x, y] = q.shift();

      // Count the adjacent mines
      let minesCount = 0;
      for (const [dx, dy] of dirs) {
        const i = x + dx;
        const j = y + dy;

        if (i >= 0 && i < h && j >= 0 && j < w && board[i][j] === 'M') {
          minesCount++;
        }
      }

      if (minesCount > 0) {
        // If an empty square ('E') with at least one adjacent mine is revealed,
        // then change it to a digit ('1' to '8') representing the number of adjacent mines.
        board[x][y] = String(minesCount);
      } else {
        // If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B')
        // and all of its adjacent unrevealed squares should be revealed recursively.
        board[x][y] = 'B';

        for (const [dx, dy] of dirs) {
          const i = x + dx;
          const j = y + dy;

          if (i >= 0 && i < h && j >= 0 && j < w && board[i][j] === 'E') {
            q.push([i, j]);
            board[i][j] = 'B';
          }
        }
      }
    }
  };

  const [x, y] = click;
  if (board[x][y] === 'M') {
    // If a mine ('M') is revealed, then the game is over - change it to 'X'
    board[x][y] = 'X';
  } else {
    bfs(x, y);
  }
  return board;
};
