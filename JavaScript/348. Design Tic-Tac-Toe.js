// Design a Tic-tac-toe game that is played between two players on a n x n grid.
//
// You may assume the following rules:
//
// 1. A move is guaranteed to be valid and is placed on an empty block.
// 2. Once a winning condition is reached, no more moves is allowed.
// 3. A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.
//
// Example:
//
// Given n = 3, assume that player 1 is "X" and player 2 is "O" in the board.
//
// TicTacToe toe = new TicTacToe(3);
//
// toe.move(0, 0, 1); -> Returns 0 (no one wins)
// |X| | |
// | | | |    // Player 1 makes a move at (0, 0).
// | | | |
//
// toe.move(0, 2, 2); -> Returns 0 (no one wins)
// |X| |O|
// | | | |    // Player 2 makes a move at (0, 2).
// | | | |
//
// toe.move(2, 2, 1); -> Returns 0 (no one wins)
// |X| |O|
// | | | |    // Player 1 makes a move at (2, 2).
// | | |X|
//
// toe.move(1, 1, 2); -> Returns 0 (no one wins)
// |X| |O|
// | |O| |    // Player 2 makes a move at (1, 1).
// | | |X|
//
// toe.move(2, 0, 1); -> Returns 0 (no one wins)
// |X| |O|
// | |O| |    // Player 1 makes a move at (2, 0).
// |X| |X|
//
// toe.move(1, 0, 2); -> Returns 0 (no one wins)
// |X| |O|
// |O|O| |    // Player 2 makes a move at (1, 0).
// |X| |X|
//
// toe.move(2, 1, 1); -> Returns 1 (player 1 wins)
// |X| |O|
// |O|O| |    // Player 1 makes a move at (2, 1).
// |X|X|X|
//
// Follow up:
// Could you do better than O(n2) per move() operation?

// https://leetcode.com/problems/design-tic-tac-toe/discuss/81898/Java-O(1)-solution-easy-to-understand
// Time O(1)
class TicTacToe {
  /**
   * Initialize your data structure here.
   * @param {number} n
   */
  constructor(n) {
    this.len = n;

    this.rows = Array(n).fill(0);
    this.cols = Array(n).fill(0);
    this.dia = 0;
    this.antiDia = 0;
  }

  /**
   * Player {player} makes a move at ({row}, {col}).
   @param row The row of the board.
   @param col The column of the board.
   @param player The player, can be either 1 or 2.
   @return The current winning condition, can be either:
   0: No one wins.
   1: Player 1 wins.
   2: Player 2 wins.
   * @param {number} row
   * @param {number} col
   * @param {number} player
   * @return {number}
   */
  move(row, col, player) {
    const i = player === 1 ? 1 : -1;

    this.rows[row] += i;
    this.cols[col] += i;
    if (row === col) this.dia += i;
    if (col === this.len - row - 1) this.antiDia += i;

    if (
      Math.abs(this.rows[row]) === this.len ||
      Math.abs(this.cols[col]) === this.len ||
      Math.abs(this.dia) === this.len ||
      Math.abs(this.antiDia) === this.len
    ) return player;

    return 0;
  }
}
