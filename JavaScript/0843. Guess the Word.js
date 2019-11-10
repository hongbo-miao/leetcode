// This problem is an interactive problem new to the LeetCode platform.
// We are given a word list of unique words, each word is 6 letters long, and one word in this list is chosen as secret.
// You may call master.guess(word) to guess a word.  The guessed word should have type string and must be from the original list with 6 lowercase letters.
// This function returns an integer type, representing the number of exact matches (value and position) of your guess to the secret word.  Also, if your guess is not in the given wordlist, it will return -1 instead.
// For each test case, you have 10 guesses to guess the word. At the end of any number of calls, if you have made 10 or less calls to master.guess and at least one of these guesses was the secret, you pass the testcase.
// Besides the example test case below, there will be 5 additional test cases, each with 100 words in the word list.  The letters of each word in those testcases were chosen independently at random from 'a' to 'z', such that every word in the given word lists is unique.
//
// Example 1:
// Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"]
//
// Explanation:
//
// master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
// master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
// master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
// master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
// master.guess("abcczz") returns 4, because "abcczz" has 4 matches.
//
// We made 5 calls to master.guess and one of them was the secret, so we pass the test case.
//
// Note:  Any solutions that attempt to circumvent the judge will result in disqualification.

/**
 * // This is the master's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Master() {
 *
 *     @param {string[]} wordlist
 *     @param {Master} master
 *     @return {integer}
 *     this.guess = function(word) {
 *         ...
 *     };
 * };
 */
/**
 * @param {string[]} wordlist
 * @param {Master} master
 * @return {void}
 */

/** 1) Random (Only 80% time can pass the test) */
// https://leetcode.com/problems/guess-the-word/discuss/133862/Random-Guess-and-Minimax-Guess-with-Comparison
// O(n), average 6.5 guess, worst case 14 guess.
//
// Generally, we will get 0 matches from the master.guess. The probability of two words with 0 match is (25/26)^6 = 80%.
// As a result, the size of wordlist reduces slowly.
const findSecretWord1 = (wordlist, master) => {
  const match = (a, b) => {
    let matches = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches;
  };

  for (let i = 0, n = 0; i < 10 && n < 6; i++) {
    const word = wordlist[~~(Math.random() * wordlist.length)];
    n = master.guess(word);

    // Put all words that matches at least n in the new list, and use as new input list later
    const wordlist2 = [];
    for (const w of wordlist) {
      if (match(word, w) === n) {
        wordlist2.push(w);
      }
    }
    wordlist = wordlist2;
  }
};


/** 2) Minimax (100% time can pass the test) */
// https://leetcode.com/problems/guess-the-word/discuss/133862/Random-Guess-and-Minimax-Guess-with-Comparison
// O(n^2), average 5.5 guess, worst case 10 guess.
//
// Generally, we will get 0 matches from the master.guess. The probability of two words with 0 match is (25/26)^6 = 80%.
// Here we're going to assume that, we will always run into the worst case.
// We need to guess a word that can minimum our worst outcome.
// So we compare each two words and count their matches.
// For each word, we note how many word of 0 matches it gets.
// Then we guess the word with minimum words of 0 matches.
// In this solution, we apply a minimax idea.
// We minimize our worst case, where the worst case is max(the number of words with i matches)
const findSecretWord = (wordlist, master) => {
  const match = (a, b) => {
    let matches = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches;
  };

  for (let i = 0, n = 0; i < 10 && n < 6; i++) {
    const count = {};
    for (const w1 of wordlist) {
      for (const w2 of wordlist) {
        if (match(w1, w2) === 0) {
          if (count[w1] == null) count[w1] = 0;
          count[w1]++;
        }
      }
    }

    let minimax = [null, Infinity];
    for (const w of wordlist) {
      if (count[w] == null) count[w] = 0;
      if (count[w] < minimax[1]) {
        minimax = [w, count[w]];
      }
    }

    n = master.guess(minimax[0]);
    const wordlist2 = [];
    for (const w of wordlist) {
      if (match(minimax[0], w) === n) {
        wordlist2.push(w);
      }
    }
    wordlist = wordlist2;
  }
};
