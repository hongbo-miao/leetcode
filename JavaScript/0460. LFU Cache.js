// Design and implement a data structure for Least Frequently Used (LFU) cache. It should support the following operations: get and put.
//
// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key would be evicted.
//
// Note that the number of times an item is used is the number of calls to the get and put functions for that item since it was inserted. This number is set to zero when the item is removed.
//
// Follow up:
// Could you do both operations in O(1) time complexity?
//
// Example:
//
// LFUCache cache = new LFUCache( 2 /* capacity );
//
// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.get(3);       // returns 3.
// cache.put(4, 4);    // evicts key 1.
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

// Hash Map + Double Linked List
// https://youtu.be/MCTN3MM8vHA?t=738
//
// Time O(1), both get and put are O(1)
//
// https://leetcode.com/problems/lfu-cache/discuss/253641/Javascript-O(1)-solution-using-nested-Map-instead-of-doubly-linked-list
// The idea is similar to the one using DoubleLinkedList, but here we leverage the fact that javascript Map()
// construct are actually ordered and you can use Map.values().next().value to easily get the first inserted item
// with O(1) time. Therefore we don't have to maintain that DoubleLinkedList and keep track of which item is the oldest.
class LFUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.keyMap = new Map();
    this.freqMap = new Map();
    this.capacity = capacity;
    this.minFreq = 1;
  }

  getNode(key) {
    const node = this.keyMap.get(key);
    if (node != null) {
      let freq = this.freqMap.get(node.freq);
      freq.delete(node.key);
      if (freq.size === 0) {
        this.freqMap.delete(node.freq);
        if (this.minFreq === node.freq) this.minFreq++;
      }
      node.freq++;
      freq = this.freqMap.get(node.freq);
      if (freq) {
        freq.set(node.key, node);
      } else {
        this.freqMap.set(node.freq, new Map([[node.key, node]]));
      }
    }
    return node;
  };

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const node = this.getNode(key);
    return node ? node.value : -1;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.capacity === 0) return;
    let node = this.getNode(key);
    if (node != null) {
      node.value = value;
    } else {
      if (this.keyMap.size === this.capacity) {
        const minFreqMap = this.freqMap.get(this.minFreq);
        const oldNode = minFreqMap.values().next().value; // minFreqMap.values().next().value returns the oldest inserted one
        minFreqMap.delete(oldNode.key);
        this.keyMap.delete(oldNode.key);
        if (minFreqMap.size === 0) {
          this.freqMap.delete(oldNode.freq);
        }
      }

      node = { key, value, freq: 1 };
      const freqOne = this.freqMap.get(1);
      if (freqOne) {
        freqOne.set(node.key, node);
      } else {
        this.freqMap.set(1, new Map([[node.key, node]]));
      }
      this.keyMap.set(node.key, node);
      this.minFreq = 1;
    }
  }
}
