// Implement a trie with insert, search, and startsWith methods.
//
// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

class Trie {
  constructor() {
    this.root = {};
  }

  /**
   * Inserts a word into the trie.
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let node = this.root;

    // word.split('').forEach(ch => node = node[ch] = node[ch] || {});
    word.split('').forEach(ch => node = (node[ch] ? node[ch] : node[ch] = {}));

    node.isWord = true;
  }

  traverse(word) {
    let node = this.root;

    for (let ch of word) {
      node = node[ch];
      if (!node) return null;
    }

    return node;
  }

  /**
   * Returns if the word is in the trie.
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const node = this.traverse(word);
    return !!(node && node.isWord);
  }

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    return !!this.traverse(prefix);
  }
}
