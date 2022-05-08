// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.
//
// For example,
// [2,3,4], the median is 3
// [2,3], the median is (2 + 3) / 2 = 2.5
//
// Design a data structure that supports the following two operations:
// - void addNum(int num) - Add a integer number from the data stream to the data structure.
// - double findMedian() - Return the median of all elements so far.
//
// Example:
//
// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3)
// findMedian() -> 2
//
// Follow up:
//
// If all integer numbers from the stream are between 0 and 100, how would you optimize it?
// If 99% of all integer numbers from the stream are between 0 and 100, how would you optimize it?

// Binary search
class MedianFinder {
  /**
   * initialize your data structure here.
   */
  constructor() {
    this.nums = [];
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    let l = 0 ;
    let r = this.nums.length - 1;

    while (l <= r) {
      const m = ~~((l + r) / 2);
      if (this.nums[m] < num) l = m + 1;
      else r = m - 1;
    }

    // insert at index l
    this.nums.splice(l, 0, num);
  }

  /**
   * @return {number}
   */
  findMedian() {
    if (this.nums.length % 2 === 0) {
      const m = this.nums.length / 2;
      return (this.nums[m - 1] + this.nums[m]) / 2;
    } else {
      const m = ~~(this.nums.length / 2);
      return this.nums[m];
    }
  }
}
