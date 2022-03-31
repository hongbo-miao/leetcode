// Implement the StreamChecker class as follows:
//
// - StreamChecker(words): Constructor, init the data structure with the given words.
// - query(letter): returns true if and only if for some k >= 1, the last k characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.
//
// Example:
//
// StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
// streamChecker.query('a');          // return false
// streamChecker.query('b');          // return false
// streamChecker.query('c');          // return false
// streamChecker.query('d');          // return true, because 'cd' is in the wordlist
// streamChecker.query('e');          // return false
// streamChecker.query('f');          // return true, because 'f' is in the wordlist
// streamChecker.query('g');          // return false
// streamChecker.query('h');          // return false
// streamChecker.query('i');          // return false
// streamChecker.query('j');          // return false
// streamChecker.query('k');          // return false
// streamChecker.query('l');          // return true, because 'kl' is in the wordlist
//
// Note:
//
// 1 <= words.length <= 2000
// 1 <= words[i].length <= 2000
// Words will only consist of lowercase English letters.
// Queries will only consist of lowercase English letters.
// The number of queries is at most 40000.

// 1) Trie
class StreamChecker {
  /**
   * @param {string[]} words
   */
  constructor(words) {
    this.trie = new Trie();
    for (const w of words) {
      this.trie.insert(w.split('').reverse().join(''));
    }
    this.s = '';
  }

  /**
   * @param {character} letter
   * @return {boolean}
   */
  query(letter) {
    this.s += letter;
    return this.trie.reverseSearch(this.s); // reverse s here will cause timeout
  }
}

class Trie {
  constructor() {
    this.root = {};
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (node[c] == null) node[c] = {};
      node = node[c];
    }
    node.isWord = true;
  }

  reverseSearch(word) {
    let i = word.length - 1;
    let node = this.root;
    while (node[word[i]] != null && i >= 0) {
      if (node.isWord) return true;
      node = node[word[i]];
      i--;
    }
    return node.isWord === true;
  }
}

// 2) Extends Map
// https://leetcode.com/problems/stream-of-characters/discuss/278713/JavaScript-trie-O(nl)-runtime-O(ml)-space
