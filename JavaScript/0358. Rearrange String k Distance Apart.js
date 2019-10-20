// Given a non-empty string s and an integer k, rearrange the string such that the same characters are at least distance k from each other.
//
// All input strings are given in lowercase letters. If it is not possible to rearrange the string, return an empty string "".
//
// Example 1:
//
// Input: s = "aabbcc", k = 3
// Output: "abcabc"
// Explanation: The same letters are at least distance 3 from each other.
//
// Example 2:
//
// Input: s = "aaabc", k = 3
// Output: ""
// Explanation: It is not possible to rearrange the string.
//
// Example 3:
//
// Input: s = "aaadbbcc", k = 2
// Output: "abacabcd"
// Explanation: The same letters are at least distance 2 from each other.

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

/** Priority queue */
// Similar
// 358. Rearrange String k Distance Apart
// 767. Reorganize String
// 1054. Distant Barcodes
//
// JavaScript is lack of priority queue, check Python version
