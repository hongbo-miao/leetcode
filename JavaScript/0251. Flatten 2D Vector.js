// Design and implement an iterator to flatten a 2d vector. It should support the following operations: next and hasNext.
//
// Example:
//
// Vector2D iterator = new Vector2D([[1,2],[3],[4]]);
//
// iterator.next(); // return 1
// iterator.next(); // return 2
// iterator.next(); // return 3
// iterator.hasNext(); // return true
// iterator.hasNext(); // return true
// iterator.next(); // return 4
// iterator.hasNext(); // return false
//
// Notes:
//
// Please remember to RESET your class variables declared in Vector2D, as static/class variables are persisted across multiple test cases. Please see here for more details.
// You may assume that next() call will always be valid, that is, there will be at least a next element in the 2d vector when next() is called.

class Vector2D {
  /**
   * @param {number[][]} v
   */
  constructor(v) {
    let arr = [];
    for (let a of v) {
      arr = [...arr, ...a];
    }
    this.arr = arr;
  }

  /**
   * @return {number}
   */
  next() {
    return this.arr.shift();
  }

  /**
   * @return {boolean}
   */
  hasNext () {
    return this.arr.length > 0;
  }
}
