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
function isValidSudoku(board) {
  // let row = new Array(9).fill({}); // wrong, all points to same {} reference
  // let row = [{}, {}, {}, {}, {}, {}, {}, {}, {}];  // correct
  let row = Array.from(new Array(9), () => ({}));
  let column = Array.from(new Array(9), () => ({}));
  let block = Array.from(new Array(9), () => ({}));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const c = board[i][j];

      if (c === '.') continue;

      const blockIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      if (row[i][c] || column[j][c] || block[blockIndex][c]) return false;

      row[i][c] = true;
      column[j][c] = true;
      block[blockIndex][c] = true;
    }
  }
  return true;
}
