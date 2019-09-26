// You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
//
// Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
//
// You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
//
// Example:
//
// Given n = 5
//
// call isBadVersion(3) -> false
// call isBadVersion(5) -> true
// call isBadVersion(4) -> true
//
// Then 4 is the first bad version.

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */

/** 1) Binary search */
function solution(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    return find(1, n);  // or find(0, n);
  };

  function find(l, r) {
    if (l === r) return r;

    const mid = Math.floor((l + r) / 2);
    return isBadVersion(mid) ? find(l, mid) : find(mid + 1, r);
  }
}

/** 2) */
function solution(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    return find(0, n);
  };

  function find(l, r) {
    if (l === r || l + 1 === r) return r;

    const mid = Math.floor((l + r) / 2);
    return isBadVersion(mid) ? find(l, mid) : find(mid, r);
  }
}
