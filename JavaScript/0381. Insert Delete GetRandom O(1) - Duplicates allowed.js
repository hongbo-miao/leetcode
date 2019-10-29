// Design a data structure that supports all following operations in average O(1) time.
//
// Note: Duplicate elements are allowed.
// insert(val): Inserts an item val to the collection.
// remove(val): Removes an item val from the collection if present.
// getRandom: Returns a random element from current collection of elements. The probability of each element being returned is linearly related to the number of same value the collection contains.
//
// Example:
//
// // Init an empty collection.
// RandomizedCollection collection = new RandomizedCollection();
//
// // Inserts 1 to the collection. Returns true as the collection did not contain 1.
// collection.insert(1);
//
// // Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
// collection.insert(1);
//
// // Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
// collection.insert(2);
//
// // getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
// collection.getRandom();
//
// // Removes 1 from the collection, returns true. Collection now contains [1,2].
// collection.remove(1);
//
// // getRandom should return 1 and 2 both equally likely.
// collection.getRandom();


class RandomizedCollection {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.pos = {};
    this.nums = [];
  }

  /**
   * Inserts a value to the collection. Returns true if the collection did not already contain the specified element.
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    const res = this.pos[val] && this.pos[val].size ? false : true;

    this.nums.push(val);
    if (this.pos[val] == null) this.pos[val] = new Set();
    this.pos[val].add(this.nums.length - 1);

    return res;
  }

  /**
   * Removes a value from the collection. Returns true if the collection contained the specified element.
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (this.pos[val] == null || this.pos[val].size === 0) return false;

    const i = this.pos[val].values().next().value;
    const lastIdx = this.nums.length - 1;
    const lastNum = this.nums.pop();
    this.pos[val].delete(i);

    if (i === lastIdx) return true;

    this.nums[i] = lastNum;
    this.pos[lastNum].delete(lastIdx);
    this.pos[lastNum].add(i);

    return true;
  }

  /**
   * Get a random element from the collection.
   * @return {number}
   */
  getRandom() {
    const i = ~~(Math.random() * this.nums.length);
    return this.nums[i];
  };
}
