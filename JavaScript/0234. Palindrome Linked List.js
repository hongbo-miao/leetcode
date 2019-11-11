// Given a singly linked list, determine if it is a palindrome.
//
// Example 1:
//
// Input: 1->2
// Output: false
//
// Example 2:
//
// Input: 1->2->2->1
// Output: true
//
// Follow up:
//   Could you do it in O(n) time and O(1) space?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val;
 *   this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = (head) => {
  if (head == null) return true;

  const st = [];
  let oldHead = head;

  while (head) {
    st.push(head.val);
    head = head.next;
  }

  while (oldHead) {
    if (oldHead.val !== st.pop()) return false;
    oldHead = oldHead.next;
  }

  return true;
};
