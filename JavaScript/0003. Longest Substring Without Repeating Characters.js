// Given a string, find the length of the longest substring without repeating characters.
//
// Examples:
//
// Given "abcabcbb", the answer is "abc", which the length is 3.
// Given "bbbbb", the answer is "b", with the length of 1.
// Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */

/** 1) Brute force (time limit exceeded) */
// Time O(n^3)
// Space O(min(n,m)). We need O(k) space for checking a substring has no duplicate characters, where k is the size of the Set.
//   The size of the Set is upper bounded by the size of the string nn and the size of the charset/alphabet m.
function lengthOfLongestSubstring1(s) {
  function isUnique(start, end) {
    const map = {};
    for (let i = start; i < end; i++) {
      const c = s[i];
      if (map[c] != null) return false;
      map[c] = true;
    }
    return true;
  }

  let max = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      if (isUnique(i, j)) {
        max = Math.max(max, j - i);
      }
    }
  }
  return max;
}


/** 2) */
function lengthOfLongestSubstring2(s) {
  let max = 0;
  let localMax = 0;
  let str = '';

  for (let c of s) {
    if (!str.includes(c)) {
      str += c;
      localMax++;
    } else {
      str = str.slice(str.indexOf(c) + 1) + c;
      localMax = str.length;
    }
    max = Math.max(localMax, max);
  }

  return max;
}

/** 3) */
function lengthOfLongestSubstring3(s) {
  let max = 0;
  let chars = [];

  for (let c of s) {
    chars = chars.slice(chars.indexOf(c) + 1);  // remove everything before when find duplicate one, e.g. awke + w -> ke + w
    max = Math.max(chars.push(c), max);   // push returns the array length
  }

  return max;
}

/** 4) Sliding window + hash map */
// Similar
// 3. Longest Substring Without Repeating Characters
// 904. Fruit Into Baskets
// 992. Subarrays with K Different Integers
//
// Time O(2n) = O(n). In the worst case each character will be visited twice by l and r.
// Space O(min(m, n)). We need O(k) space for the sliding window, where k is the size of the Set. The size of the Set is
//   upper bounded by the size of the string nn and the size of the charset/alphabet m.
//
// In the brute force approaches, we repeatedly check a substring to see if it has duplicate character. But it is unnecessary.
// If a substring from index l to r - 1 is already checked to have no duplicate characters. We only need to check if s[r] is already in the substring
function lengthOfLongestSubstring4(s) {
  const map = {};
  let max = 0;
  let l = 0;
  let r = 0;
  while (l < s.length && r < s.length) {
    // try to extend the range [l, r]
    if (map[s[r]] == null) {
      map[s[r]] = true;
      r++;
      max = Math.max(max, r - l);
    } else {
      delete map[s[l]];
      l++;
    }
  }
  return max;
}

/** 5) Sliding window (optimized) */
// Time O(n)
// Space O(min(m, n)), m is the size of the hash map
//
// The above solution requires at most 2n steps. In fact, it could be optimized to require only n steps. Instead of
// using a set to tell if a character exists or not, we could define a mapping of the characters to its index. Then
// we can skip the characters immediately when we found a repeated character.
// The reason is that if s[r] have a duplicate in the range [l, r) with index r', we don't need to increase l
// little by little. We can skip all the elements in the range [l, r'] and let l to be r' + 1 directly.
//
// e.g. pwwkew
// l = 0, r = 0, map = { p: 1 }
// l = 0, r = 1, map = { p: 1, w: 2 }
// l = 2, r = 2, map = { p: 1, w: 3 }
// l = 2, r = 3, map = { p: 1, w: 3, k: 4 }
// l = 2, r = 4, map = { p: 1, w: 3, k: 4, e: 5 }
// l = 3, r = 5, map = { p: 1, w: 6, k: 4, e: 5 }
function lengthOfLongestSubstring(s) {
  let max = 0;
  const map = {};

  for (let l = 0, r = 0; r < s.length; r++) {
    const c = s[r];

    if (map[c] != null) {
      l = Math.max(map[c], l);  // not l = map[c], because Math.max makes sure l always increase
    }

    map[c] = r + 1;  // map[c] saves next start point for l
    max = Math.max(max, r - l + 1);
  }

  return max;
}
