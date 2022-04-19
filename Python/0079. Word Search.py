# Given an m x n grid of characters board and a string word, return true if word exists in the grid.
# The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
#
# Example 1:
#
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
# Output: true
#
# Example 2:
#
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
# Output: true
#
# Example 3:
#
# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
# Output: false
#
# Constraints:
#
# m == board.length
# n = board[i].length
# 1 <= m, n <= 6
# 1 <= word.length <= 15
# board and word consists of only lowercase and uppercase English letters.


class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board or not board[0]:
            return False
        m, n = len(board), len(board[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def go(i, j, k):
            if k == len(word):
                return True
            if 0 <= i < m and 0 <= j < n and board[i][j] == word[k]:
                c = board[i][j]
                board[i][j] = "#"  # mark visited
                for dir in dirs:
                    if go(i + dir[0], j + dir[1], k + 1):
                        return True
                board[i][j] = c  # reset
                return False
            return False

        for i in range(m):
            for j in range(n):
                if go(i, j, 0):
                    return True
        return False
