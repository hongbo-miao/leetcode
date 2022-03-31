// Given N axis-aligned rectangles where N > 0, determine if they all together form an exact cover of a rectangular region.
//
// Each rectangle is represented as a bottom-left point and a top-right point. For example, a unit square is represented as [1,1,2,2]. (coordinate of bottom-left point is (1, 1) and top-right point is (2, 2)).
//
// Example 1:
//
// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [3,2,4,4],
//   [1,3,2,4],
//   [2,3,3,4]
// ]
//
// Return true. All 5 rectangles together form an exact cover of a rectangular region.
//
// Example 2:
//
// rectangles = [
//   [1,1,2,3],
//   [1,3,2,4],
//   [3,1,4,2],
//   [3,2,4,4]
// ]
//
// Return false. Because there is a gap between the two rectangular regions.
//
// Example 3:
//
// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [1,3,2,4],
//   [3,2,4,4]
// ]
//
// Return false. Because there is a gap in the top center.
//
// Example 4:
//
// rectangles = [
//   [1,1,3,3],
//   [3,1,4,2],
//   [1,3,2,4],
//   [2,2,4,4]
// ]
//
// Return false. Because two of the rectangles overlap with each other.

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */

// 1)
// Check the image at https://leetcode.com/problems/perfect-rectangle/discuss/87201/might-be-the-simplest-on-solution-only-count-cornersno-area-no-maxminwith-comments to help understand
//
// We keep four sets that collectively act like a difference set -- one for each type (direction) of corner.
//
// For every corner that we consider, we check to see if another corner has the same coordinates.
//
// If a same-position corner of the same type exists, there is an overlap, and we produce an error.
// If a same-position corner that shares exactly one face exists, we can delete the corner (rectangle merge).
// If a same-position corner shares the coordinates but neither face, we can add our corner, increasing the number of corners required to clear those coordinates to 2.
//
// If no corner is in the same position, we add the corner.
//
// After all corners have been considered, we have a rectangle cover if each set contains exactly one corner.
const isRectangleCover1 = (rectangles) => {
  const corner = (x, y) => `${x} ${y}`;

  const tls = new Set();
  const trs = new Set();
  const bls = new Set();
  const brs = new Set();

  for (const [l, b, r, t] of rectangles) {
    const tl = corner(t, l);
    const tr = corner(t, r);
    const bl = corner(b, l);
    const br = corner(b, r);

    if (tls.has(tl) || trs.has(tr) || bls.has(bl) || brs.has(br)) return false;

    if (!bls.delete(tl) && !trs.delete(tl)) tls.add(tl); // if delete succeed, returns true
    if (!brs.delete(tr) && !tls.delete(tr)) trs.add(tr);
    if (!brs.delete(bl) && !tls.delete(bl)) bls.add(bl);
    if (!bls.delete(br) && !trs.delete(br)) brs.add(br);
  }

  return tls.size === 1 && trs.size === 1 && bls.size === 1 && brs.size === 1;
};

// 2) Same to 1), but easier to understand
const isRectangleCover = (rectangles) => {
  const corner = (x, y) => `${x} ${y}`;

  const tls = new Set();
  const trs = new Set();
  const bls = new Set();
  const brs = new Set();

  for (const [l, b, r, t] of rectangles) {
    const tl = corner(t, l);
    const tr = corner(t, r);
    const bl = corner(b, l);
    const br = corner(b, r);

    if (tls.has(tl) || trs.has(tr) || bls.has(bl) || brs.has(br)) return false;

    if (trs.has(tl)) trs.delete(tl);
    else if (bls.has(tl)) bls.delete(tl);
    else tls.add(tl);

    if (brs.has(tr)) brs.delete(tr);
    else if (tls.has(tr)) tls.delete(tr);
    else trs.add(tr);

    if (brs.has(bl)) brs.delete(bl);
    else if (tls.has(bl)) tls.delete(bl);
    else bls.add(bl);

    if (bls.has(br)) bls.delete(br);
    else if (trs.has(br)) trs.delete(br);
    else brs.add(br);
  }

  return tls.size === 1 && trs.size === 1 && bls.size === 1 && brs.size === 1;
};
