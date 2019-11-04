// Given n non-negative letegers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
//
//               |
//       |       | |   |
//   |   | |   | | | | | |
// 0 1 0 2 1 0 1 3 2 1 2 1
//
// The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
//
// Example:
//
// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

/**
 * @param {number[]} height
 * @return {number}
 */

/** 1) Brute Force */
// Time O(n^2)
// Space O(1)
//
// Do as directed in question. For each element in the array, we find the maximum level of water it can trap after the
// rain, which is equal to the minimum of maximum height of bars on both the sides minus its own height.
const trap1 = (height) => {
  if (height == null || height.length === 0) return 0;

  let res = 0;
  for (let i = 0; i < height.length; i++) {
    let lMax = 0;
    let rMax = 0;

    for (let j = 0; j < i; j++) {
      lMax = Math.max(lMax, height[j]);
    }
    for (let j = i + 1; j < height.length; j++) {
      rMax = Math.max(rMax, height[j]);
    }

    const water = Math.min(lMax, rMax) - height[i];
    if (water > 0) res += water;
  }

  return res;
};

/** 2) Dynamic Programming */
// Time O(n)
// Space O(n)
//
// In brute force, we iterate over the left and right parts again and again just to find the highest bar size upto
// that index. But, this could be stored. Voila, dynamic programming.
const trap2 = (height) => {
  if (height == null || height.length === 0) return 0;

  let res = 0;
  let l = height.length;
  let lMax = {};
  let rMax = {};

  lMax[0] = height[0];
  for (let i = 1; i < l; i++) {
    lMax[i] = Math.max(height[i], lMax[i - 1]);
  }

  rMax[l - 1] = height[l - 1];
  for (let i = l - 2; i >= 0; i--) {
    rMax[i] = Math.max(height[i], rMax[i + 1]);
  }

  for (let i = 0; i < height.length; i++) {
    res += Math.min(lMax[i], rMax[i]) - height[i];
  }

  return res;
};

/** 3) Stack */
// https://www.youtube.com/watch?v=78R14lKv_pE
// Time O(n)
// Space O(n)
const trap3 = (height) => {
  let res = 0;
  let i = 0;
  const st = [];

  while (i < height.length) {
    while (st.length >= 1 && height[i] > height[st[st.length - 1]]) {
      const top = st[st.length - 1];
      st.pop();

      if (st.length === 0) break;

      const dist = i - st[st.length - 1] - 1;
      const h = Math.min(height[i], height[st[st.length - 1]]) - height[top];
      res += dist * h;
    }
    st.push(i);
    i++;
  }
  return res;
};

/** 4) Two Pointers */
// Time O(n)
// Space O(1)
//
// As in 2), instead of computing the left and right parts separately, we may think of some way to do it in one iteration.
const trap = (height) => {
  if (height == null || height.length === 0) return 0;

  let l = 0;
  let r = height.length - 1;
  let lMax = 0;
  let rMax = 0;
  let res = 0;

  while (l < r) {
    lMax = Math.max(lMax, height[l]);
    if (lMax - height[l] > 0) res += lMax - height[l];

    rMax = Math.max(rMax, height[r]);
    if (rMax - height[r] > 0) res += rMax - height[r];

    height[l] < height[r] ? l++ : r--;
  }
  return res;
};
