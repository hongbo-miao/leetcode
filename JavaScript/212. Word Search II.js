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
function findWords(board, words) {
  const root = buildTrie(words);
  let res = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      searchWord(root, i, j, board, res);
    }
  }

  return res;
}

function buildTrie(words) {
  let root = {};

  for (let word of words) {
    let node = root;
    word.split('').forEach(c => node = (node[c] ? node[c] : node[c] = {})); // word.split('').forEach(c => node = node[c] = node[c] || {});
    node.word = word;
  }

  return root;
}

function searchWord(node, i, j, board, res) {
  if (node.word) {
    res.push(node.word);
    node.word = null;   // make sure only print one time for each word
  }

  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
  if (board[i][j] === '#' || !node[board[i][j]]) return;

  const c = board[i][j];

  board[i][j] = '#'; // mark visited

  searchWord(node[c], i + 1, j, board, res);
  searchWord(node[c], i - 1, j, board, res);
  searchWord(node[c], i, j + 1, board, res);
  searchWord(node[c], i, j - 1, board, res);

  board[i][j] = c;  // reset
}
