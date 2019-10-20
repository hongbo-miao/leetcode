// Given a 2D board and a list of words from the dictionary, find all words in the board.
//
// Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
//
// Example:
//
// Input:
//   words = ["oath","pea","eat","rain"] and board =
//   [
//     ['o','a','a','n'],
//     ['e','t','a','e'],
//     ['i','h','k','r'],
//     ['i','f','l','v']
//   ]
//
// Output: ["eat","oath"]
//
// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

/** Backtracking + Trie */
function findWords(board, words) {
  let res = [];

  function buildTrie() {
    const root = {};
    for (let w of words) {
      let node = root;
      for (let c of w) {
        if (node[c] == null) node[c] = {};
        node = node[c];
      }
      node.word = w;
    }
    return root;
  }

  function search(node, i, j) {
    if (node.word != null) {
      res.push(node.word);
      node.word = null;  // make sure only print one time for each word
    }

    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
    if (node[board[i][j]] == null) return;

    const c = board[i][j];
    board[i][j] = '#';  // mark visited
    search(node[c], i + 1, j);
    search(node[c], i - 1, j);
    search(node[c], i, j + 1);
    search(node[c], i, j - 1);
    board[i][j] = c;  // reset
  }

  const root = buildTrie();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      search(root, i, j);
    }
  }
  return res;
}
