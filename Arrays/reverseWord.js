// Done
let reverseWords = (message) => {
  let reverseArr = (arr, lIdx, rIdx) => {
    for (let i = 0; i < (rIdx - lIdx) / 2; i++) {
      let left = arr[i + lIdx];
      let right = arr[rIdx - 1 - i];
      arr[i + lIdx] = right;
      arr[rIdx - 1 - i] = left;
    }
  };
  reverseArr(message, 0, message.length);
  let start = 0;
  let revCount = 0;
  for (let j = 0; j < message.length; j++) {
    if (message[j] == ' ' || j == message.length - 1) {
      if (j == message.length - 1) {
        reverseArr(message, start, j + 1);
      } else {
        reverseArr(message, start, j);
      }
      start = j + 1;
    }
  }
};

// Tests

let desc = 'one word';
let input = 'vault'.split('');
reverseWords(input);
let actual = input.join('');
let expected = 'vault';
assertEqual(actual, expected, desc);

desc = 'two words';
input = 'thief cake'.split('');
reverseWords(input);
actual = input.join('');
expected = 'cake thief';
assertEqual(actual, expected, desc);

desc = 'three words';
input = 'one another get'.split('');
reverseWords(input);
actual = input.join('');
expected = 'get another one';
assertEqual(actual, expected, desc);

desc = 'multiple words same length';
input = 'rat the ate cat the'.split('');
reverseWords(input);
actual = input.join('');
expected = 'the cat ate the rat';
assertEqual(actual, expected, desc);

desc = 'multiple words different lengths';
input = 'yummy is cake bundt chocolate'.split('');
reverseWords(input);
actual = input.join('');
expected = 'chocolate bundt cake is yummy';
assertEqual(actual, expected, desc);

desc = 'empty string';
input = ''.split('');
reverseWords(input);
actual = input.join('');
expected = '';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
