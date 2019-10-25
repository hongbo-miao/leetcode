// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
//
// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
//
// Example:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

class MinStack {
  /**
   * initialize your data structure here.
   */
  constructor() {
    this.st = [];
    this.minSt = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.st.push(x);

    if (this.minSt.length === 0 || x <= this.minSt[this.minSt.length - 1]) {
      this.minSt.push(x);
    }
  }

  /**
   * @return {void}
   */
  pop() {
    const x = this.st.pop();

    if (x === this.minSt[this.minSt.length - 1]) {
      this.minSt.pop();
    }
  }

  /**
   * @return {number}
   */
  top() {
    return this.st[this.st.length - 1];
  }

  /**
   * @return {number}
   */
  getMin() {
    return this.minSt[this.minSt.length - 1];
  }
}
