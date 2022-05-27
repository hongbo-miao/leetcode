# Given an m x n board of characters and a list of strings words, return all words on the board.
# Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
#
# Example 1:
#
# Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
# Output: ["eat","oath"]
#
# Example 2:
#
#
# Input: board = [["a","b"],["c","d"]], words = ["abcb"]
# Output: []
#
# Constraints:
#
# m == board.length
# n == board[i].length
# 1 <= m, n <= 12
# board[i][j] is a lowercase English letter.
# 1 <= words.length <= 3 * 104
# 1 <= words[i].length <= 10
# words[i] consists of lowercase English letters.
# All the strings of words are unique.


# Backtracking + Trie
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        m, n = len(board), len(board[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        res = []

        def build_trie():
            root = {}
            for w in words:
                node = root
                for c in w:
                    # Method 1
                    # if c not in node:
                    #     node[c] = {}
                    # node = node[c]

                    # Method 2
                    node = node.setdefault(c, {})
                node["word"] = w
            return root

        def search(root, x, y):
            c = board[x][y]
            node = root[c]

            # Optimization: incrementally remove the matched leaf node in Trie.
            if not node:
                root.pop(c)

            w = node.pop("word", None)
            if w:
                res.append(w)

            board[x][y] = "#"
            for (dx, dy) in dirs:
                i, j = x + dx, y + dy
                if 0 <= i < m and 0 <= j < n and board[i][j] in node:
                    search(node, i, j)
            board[x][y] = c

        root = build_trie()
        for i in range(m):
            for j in range(n):
                if board[i][j] in root:
                    search(root, i, j)
        return res
