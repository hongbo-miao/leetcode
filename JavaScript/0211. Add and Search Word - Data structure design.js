// Design a data structure that supports the following two operations:
//
// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.
//
// Example:
//
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// Note:
// You may assume that all words are consist of lowercase letters a-z.

class WordDictionary {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.root = {};
  }

  /**
   * Adds a word into the data structure.
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
    let node = this.root;
    for (let c of word) {
      if (node[c] == null) node[c] = {};
      node = node[c];
    }
    node.isWord = true;
  }

  /**
   * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const match = (node, i) => {
      if (node == null) return false;
      if (i === word.length) return node.isWord === true; // note node.isWord can be undefined, do not just return return node.isWord
      if (word[i] === '.') {
        for (let j = 0; j < 26; j++) {
          const c = String.fromCharCode(97 + j); // 97 -> 'a'
          if (match(node[c], i + 1)) return true;
        }
      } else {
        return match(node[word[i]], i + 1);
      }
    };

    return match(this.root, 0);
  }
}
