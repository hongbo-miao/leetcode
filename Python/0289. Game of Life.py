# According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
# The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
#
# - Any live cell with fewer than two live neighbors dies as if caused by under-population.
# - Any live cell with two or three live neighbors lives on to the next generation.
# - Any live cell with more than three live neighbors dies, as if by over-population.
# - Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
#
# The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.
#
# Example 1:
#
# Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
# Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
#
# Example 2:
#
# Input: board = [[1,1],[1,0]]
# Output: [[1,1],[1,1]]
#
# Constraints:
#
# m == board.length
# n == board[i].length
# 1 <= m, n <= 25
# board[i][j] is 0 or 1.


# https://leetcode.com/problems/game-of-life/discuss/696582/Python-Very-Simple-Solution-with-Explanation-No-space-used
#  When the value needs to be updated, we don't just change  0 to 1 / 1 to 0 but we do in increments and decrements of 2. (table explains)
#  prev value  state change  curr state   curr val
#  0           no change     dead          0
#  1           no change     live          1
#  0           changed (+2)  live          2
#  1           changed (-2)  dead         -1
# Time O(m * n)
# Space O(1)
class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        m, n = len(board), len(board[0])
        dirs = [
            (-1, -1),
            (-1, 0),
            (-1, 1),
            (0, -1),
            (0, 1),
            (1, -1),
            (1, 0),
            (1, 1),
        ]

        for i in range(m):
            for j in range(n):
                live = 0  # live neighbors count
                for dx, dy in dirs:  # check and count neighbors in all directions
                    if (
                        0 <= i + dx < m
                        and 0 <= j + dy < n
                        and abs(board[i + dx][j + dy]) == 1
                    ):
                        live += 1
                if board[i][j] == 1 and (live < 2 or live > 3):  # Rule 1 or Rule 3
                    board[i][j] = -1
                if board[i][j] == 0 and live == 3:  # Rule 4
                    board[i][j] = 2
        for i in range(m):
            for j in range(n):
                board[i][j] = 1 if (board[i][j] > 0) else 0
        return board
