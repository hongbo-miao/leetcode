// Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.
//
// Note:
// The number of people is less than 1,100.
//
// Example
//
// Input:
// [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
//
// Output:
// [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

/**
 * @param {number[][]} people
 * @return {number[][]}
 */

// Sorting
// Time O(n log n)
//
// Pick out tallest group of people and sort them in a subarray (S). Since there's no other groups of people taller than them, therefore each guy's index will be just as same as his k value.
// For 2nd tallest group (and the rest), insert each one of them into (S) by k value. So on and so forth.
//
// e.g. [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
// subarray after step 1: [[7,0], [7,1]]
// subarray after step 2: [[7,0], [6,1], [7,1]]
const reconstructQueue = (people) => {
  const compare = ([h1, k1], [h2, k2]) => {
    if (h1 !== h2) return h2 - h1;
    else return k1 - k2;
  };
  people.sort(compare);

  const res = [];
  for (const p of people) {
    res.splice(p[1], 0, p); // Insert person at index k
  }
  return res;
};
