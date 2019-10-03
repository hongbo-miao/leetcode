// Design a data structure that supports all following operations in average O(1) time.
//
// 1. insert(val): Inserts an item val to the set if not already present.
// 2. remove(val): Removes an item val from the set if present.
// 3. getRandom: Returns a random element from current set of elements. Each element must have the same probability of being returned.
//
// Example:
//
// // Init an empty set.
// RandomizedSet randomSet = new RandomizedSet();
//
// // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomSet.insert(1);
//
// // Returns false as 2 does not exist in the set.
// randomSet.remove(2);
//
// // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomSet.insert(2);
//
// // getRandom should return either 1 or 2 randomly.
// randomSet.getRandom();
//
// // Removes 1 from the set, returns true. Set now contains [2].
// randomSet.remove(1);
//
// // 2 was already in the set, so return false.
// randomSet.insert(2);
//
// // Since 2 is the only number in the set, getRandom always return 2.
// randomSet.getRandom();

class RandomizedSet {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.nums = [];
    this.pos = {};
  }

  /**
   * Inserts a value to the set. Returns true if the set did not already contain the specified element.
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    if (this.pos[val] != null) return false;

    this.nums.push(val);
    this.pos[val] = this.nums.length - 1;
    return true;
  }

  /**
   * Removes a value from the set. Returns true if the set contained the specified element.
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (this.pos[val] == null) return false;

    const i = this.pos[val];
    const lastNum = this.nums[this.nums.length - 1];

    // swap the last num with val
    this.nums[i] = lastNum;
    this.pos[lastNum] = i;

    // remove val
    this.nums.pop();
    delete this.pos[val];

    return true;
  }

  /**
   * Get a random element from the set.
   * @return {number}
   */
  getRandom() {
    const i = Math.floor(Math.random() * this.nums.length);
    return this.nums[i]
  }
}
