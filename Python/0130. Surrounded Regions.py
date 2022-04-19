# Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
# A region is captured by flipping all 'O's into 'X's in that surrounded region.
#
# Example 1:
#
# Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
# Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
# Explanation: Surrounded regions should not be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.
#
# Example 2:
#
# Input: board = [["X"]]
# Output: [["X"]]
#
# Constraints:
#
# m == board.length
# n == board[i].length
# 1 <= m, n <= 200
# board[i][j] is 'X' or 'O'.

"""
Do not return anything, modify board in-place instead.
"""


# DFS
#
# Idea
# 1) Check four borders. If it is O, change it and all its neighbor to temporary #
# 2) Change all O to X
# 3) Change all # to O
#
# Example
# X X X X      X X X X      X X X X
# X X O X  ->  X X O X  ->  X X X X
# X O X X      X # X X      X O X X
# X O X X      X # X X      X O X X
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board:
            return

        m, n = len(board), len(board[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def go(i, j):
            if 0 <= i < m and 0 <= j < n and board[i][j] == "O":
                board[i][j] = "#"
                for d in dirs:
                    go(i + d[0], j + d[1])

        # Change every square connected to left and right borders from O to temporary #
        for i in range(m):
            go(i, 0)
            go(i, n - 1)

        # Change every square connected to top and bottom borders from O to temporary #
        for j in range(n):
            go(0, j)
            go(m - 1, j)

        # Change every temporary # to O
        for i in range(m):
            for j in range(n):
                # Change the rest of O to X
                if board[i][j] == "O":
                    board[i][j] = "X"

                # Change temporary # back to O
                if board[i][j] == "#":
                    board[i][j] = "O"
