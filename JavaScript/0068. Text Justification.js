// Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.
//
// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.
//
// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.
//
// For the last line of text, it should be left justified and no extra space is inserted between words.
//
// Note:
//
//   A word is defined as a character sequence consisting of non-space characters only.
//   Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
//   The input array words contains at least one word.
//
// Example 1:
//
// Input:
//   words = ["This", "is", "an", "example", "of", "text", "justification."]
//   maxWidth = 16
// Output:
//   [
//     "This    is    an",
//     "example  of text",
//     "justification.  "
//   ]
//
// Example 2:
//
// Input:
//   words = ["What","must","be","acknowledgment","shall","be"]
//   maxWidth = 16
// Output:
//   [
//     "What   must   be",
//     "acknowledgment  ",
//     "shall be        "
//   ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be",
//   because the last line must be left-justified instead of fully-justified.
//   Note that the second line is also left-justified becase it contains only one word.
//
// Example 3:
//
// Input:
//   words = ["Science","is","what","we","understand","well","enough","to","explain",
//     "to","a","computer.","Art","is","everything","else","we","do"]
// maxWidth = 20
// Output:
//   [
//     "Science  is  what we",
//     "understand      well",
//     "enough to explain to",
//     "a  computer.  Art is",
//     "everything  else  we",
//     "do                  "
//   ]

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */

// https://leetcode.com/problems/text-justification/discuss/24898/Short-JavaScript-O(n)-solution
const fullJustify = (words, maxWidth) => {
  const res = [[]];
  res[0].letters = 0;

  for (const w of words) {
    let row = res[res.length - 1];

    if (row.length && row.letters + row.length + w.length > maxWidth) {
      res.push([]);
      row = res[res.length - 1];
      row.letters = 0;
    }

    row.push(w);
    row.letters += w.length;
  }

  for (let i = 0; i < res.length; i++) {
    const row = res[i];

    // only one word in the row or last row
    if (row.length === 1 || i === res.length - 1) {
      res[i] = row.join(' ') + ' '.repeat(maxWidth - row.letters - row.length + 1);
    } else {
      const spaces = maxWidth - row.letters;
      const minSpaces = ' '.repeat(~~(spaces / (row.length - 1)));
      const addSpace = spaces % (row.length - 1);

      let line = row[0];

      for (let j = 1; j < row.length; j++) {
        line += minSpaces + (j <= addSpace ? ' ' : '') + row[j];
      }

      res[i] = line;
    }
  }
  return res;
};
