// Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
//
//   Each row must contain the digits 1-9 without repetition.
//   Each column must contain the digits 1-9 without repetition.
//   Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.
//
// The Sudoku board could be partially filled, where empty cells are filled with the character '.'.
//
// Example 1:
//
// Input:
//   [
//     ["5","3",".",".","7",".",".",".","."],
//     ["6",".",".","1","9","5",".",".","."],
//     [".","9","8",".",".",".",".","6","."],
//     ["8",".",".",".","6",".",".",".","3"],
//     ["4",".",".","8",".","3",".",".","1"],
//     ["7",".",".",".","2",".",".",".","6"],
//     [".","6",".",".",".",".","2","8","."],
//     [".",".",".","4","1","9",".",".","5"],
//     [".",".",".",".","8",".",".","7","9"]
//   ]
// Output: true
//
// Example 2:
//
// Input:
//   [
//     ["8","3",".",".","7",".",".",".","."],
//     ["6",".",".","1","9","5",".",".","."],
//     [".","9","8",".",".",".",".","6","."],
//     ["8",".",".",".","6",".",".",".","3"],
//     ["4",".",".","8",".","3",".",".","1"],
//     ["7",".",".",".","2",".",".",".","6"],
//     [".","6",".",".",".",".","2","8","."],
//     [".",".",".","4","1","9",".",".","5"],
//     [".",".",".",".","8",".",".","7","9"]
//   ]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being
// modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
//
// Note:
//
//   A Sudoku board (partially filled) could be valid but is not necessarily solvable.
//   Only the filled cells need to be validated according to the mentioned rules.
//   The given board contain only digits 1-9 and the character '.'.
//   The given board size is always 9x9.

/**
 * @param {character[][]} board
 * @return {boolean}
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */

// 1) Three iterations
// Time O(1), since it is const 81 cells
// Space O(1)
const isValidSudoku1 = (board) => {
  // row
  for (let i = 0; i < 9; i++) {
    const map = {};
    for (let j = 0; j < 9; j++) {
      if (map[board[i][j]]) return false;
      if (board[i][j] !== '.') map[board[i][j]] = true;
    }
  }

  // column
  for (let j = 0; j < 9; j++) {
    const map = {};
    for (let i = 0; i < 9; i++) {
      if (map[board[i][j]]) return false;
      if (board[i][j] !== '.') map[board[i][j]] = true;
    }
  }

  // box
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const map = {};
      for (let k = 3 * i; k < 3 * i + 3; k++) {
        for (let l = 3 * j; l < 3 * j + 3; l++) {
          if (map[board[k][l]]) return false;
          if (board[k][l] !== '.') map[board[k][l]] = true;
        }
      }
    }
  }

  return true;
};

// 2) One iterations
// Time O(1), since all we do here is just one iteration over the board with 81 cells
// Space O(1)
const isValidSudoku = (board) => {
  // const row = Array(9).fill({}); // wrong, all will point to same {} reference
  // const row = [{}, {}, {}, {}, {}, {}, {}, {}, {}]; // correct
  const row = Array.from(Array(9), () => ({}));
  const column = Array.from(Array(9), () => ({}));
  const block = Array.from(Array(9), () => ({}));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const c = board[i][j];

      if (c === '.') continue;

      const blockIdx = ~~(i / 3) * 3 + ~~(j / 3);

      if (row[i][c] || column[j][c] || block[blockIdx][c]) return false;

      row[i][c] = true;
      column[j][c] = true;
      block[blockIdx][c] = true;
    }
  }
  return true;
};
