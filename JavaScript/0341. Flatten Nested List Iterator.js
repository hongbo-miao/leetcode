// Given a nested list of integers, implement an iterator to flatten it.
// Each element is either an integer, or a list -- whose elements may also be integers or other lists.
//
// Example 1:
//
// Input: [[1,1],2,[1,1]]
// Output: [1,1,2,1,1]
// Explanation: By calling next repeatedly until hasNext returns false,
//              the order of elements returned by next should be: [1,1,2,1,1].
// Example 2:
//
// Input: [1,[4,[6]]]
// Output: [1,4,6]
// Explanation: By calling next repeatedly until hasNext returns false,
//              the order of elements returned by next should be: [1,4,6].

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */

// 1)
class NestedIterator1 {
  /**
   * @constructor
   * @param {NestedInteger[]} nestedList
   */
  constructor(nestedList) {
    this.q = this.flatten(nestedList);
  }

  /**
   * @this NestedIterator
   * @returns {boolean}
   */
  hasNext() {
    return this.q.length > 0;
  }

  /**
   * @this NestedIterator
   * @returns {integer}
   */
  next() {
    return this.q.shift();
  }

  flatten(list, arr = []) {
    if (list.length === 0) return arr;
    while (list.length) {
      const el = list.shift();
      if (el.isInteger()) arr.push(el.getInteger());
      else this.flatten(el.getList(), arr);
    }
    return arr;
  }
}

// 2) Generator
class NestedIterator {
  constructor(nestedList) {
    this.gen = this.listGenerator(nestedList);
    this.nextVal = this.gen.next();
  }

  hasNext() {
    return !this.nextVal.done;
  }

  next() {
    const val = this.nextVal.value;
    this.nextVal = this.gen.next();
    return val;
  }

  *listGenerator(list) {
    for (const el of list) {
      if (el.isInteger()) yield el.getInteger();
      else yield* this.listGenerator(el.getList());
    }
  }
}
