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

// 1) Binary search (recursion)
const solution1 = (isBadVersion) => {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return (n) => {
    const find = (l, r) => {
      if (l === r) return r;
      const m = ~~((l + r) / 2);
      return isBadVersion(m) ? find(l, m) : find(m + 1, r);
    };
    return find(1, n); // or find(0, n);
  };
};

// 2) Binary search (iteration)
const solution = (isBadVersion) => {
  return (n) => {
    let l = 0;
    let r = n;
    while (l < r) {
      const m = ~~((l + r) / 2);
      if (!isBadVersion(m)) l = m + 1;
      else r = m;
    }
    return l;
  }
};
