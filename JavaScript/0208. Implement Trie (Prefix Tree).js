// Implement a trie with insert, search, and startsWith methods.
//
// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

// Space O(M*N*K)
// If we have M words to insert in total and the length of words is at most N, there will be at most M*N nodes in the
//   worst case (any two words don't have a common prefix).
// Let's assume that there are maximum K different characters (K is equal to 26 in this problem, but might differs
//   in different cases). So each node will maintain a map whose size is at most K.
class Trie {
  constructor() {
    this.root = {};
  }

  /**
   * Inserts a word into the trie.
   * @param {string} word
   * @return {void}
   */
  // Time O(N), N is the longest length of the word
  insert(word) {
    let node = this.root;

    // word.split('').forEach(c => node = node[c] = node[c] || {});
    // word.split('').forEach(c => node = (node[c] ? node[c] : node[c] = {}));
    for (const c of word) {
      if (node[c] == null) node[c] = {};
      node = node[c];
    }

    node.isWord = true;
  }

  traverse(word) {
    let node = this.root;

    for (let c of word) {
      node = node[c];
      if (node == null) return null;
    }

    return node;
  }

  /**
   * Returns if the word is in the trie.
   * @param {string} word
   * @return {boolean}
   */
  // Time O(N)
  search(word) {
    const node = this.traverse(word);
    return node != null && node.isWord === true;
  }

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix
   * @return {boolean}
   */
  // Time O(N)
  startsWith(prefix) {
    const node = this.traverse(prefix);
    return node != null;
  }
}
