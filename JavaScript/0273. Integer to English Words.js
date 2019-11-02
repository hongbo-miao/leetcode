// Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 231 - 1.
//
// Example 1:
//
// Input: 123
// Output: "One Hundred Twenty Three"
//
// Example 2:
//
// Input: 12345
// Output: "Twelve Thousand Three Hundred Forty Five"
//
// Example 3:
//
// Input: 1234567
// Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
//
// Example 4:
//
// Input: 1234567891
// Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"

/**
 * @param {number} num
 * @return {string}
 */
const numberToWords = (num) => {
  const LessThan20 = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const Tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const Thousands = ['', 'Thousand', 'Million', 'Billion'];

  const go = (n) => {
    if (n === 0) return '';
    else if (n < 20) return LessThan20[n] + ' ';
    else if (n < 100) return Tens[~~(n / 10)] + ' ' + go(n % 10);
    else return LessThan20[~~(n / 100)] + ' Hundred ' + go(n % 100);
  };

  if (num === 0) return 'Zero';

  let i = 0;
  let res = '';
  while (num > 0) {
    if (num % 1000 > 0) {
      res = go(num % 1000) + Thousands[i] + ' ' + res;
    }
    num = ~~(num / 1000);
    i++;
  }
  return res.trim();
};
