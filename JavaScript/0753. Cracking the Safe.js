// There is a box protected by a password. The password is a sequence of n digits where each digit can be one of the first k digits 0, 1, ..., k-1.
// While entering a password, the last n digits entered will automatically be matched against the correct password.
// For example, assuming the correct password is "345", if you type "012345", the box will open because the correct password matches the suffix of the entered password.
// Return any password of minimum length that is guaranteed to open the box at some point of entering it.
//
// Example 1:
//
// Input: n = 1, k = 2
// Output: "01"
// Note: "10" will be accepted too.
//
// Example 2:
//
// Input: n = 2, k = 2
// Output: "00110"
// Note: "01100", "10011", "11001" will be accepted too.
//
// Note:
//
// n will be in the range [1, 4].
// k will be in the range [1, 10].
// k^n will be at most 4096.

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

/** De Bruijn sequence + Eulerian path */
// https://www.youtube.com/watch?v=kRdlLahVZDc
//
// If every password shares n - 1 digits suffix of last node
const crackSafe = (n, k) => {
  let pwd = '0'.repeat(n);
  const visited = new Set([pwd]);
  while (visited.size < k ** n) {  // total k^n combination
    for (let i = k - 1; i >= 0; i--) { // here cannot start from 0 to k unless change first line to let pwd = String(k - 1).repeat(n);
      const prefix = pwd.slice(pwd.length - (n - 1)); // last n - 1 digits as prefix
      const c = String(i);
      const s = prefix + c;
      if (!visited.has(s)) {
        visited.add(s);
        pwd += c;
        break;
      }
    }
  }
  return pwd;
};
