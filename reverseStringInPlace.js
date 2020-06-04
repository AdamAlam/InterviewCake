// Done
let reverse = (arrayOfChars) => {
  for (let i = 0; i < arrayOfChars.length / 2; i++) {
    let first = arrayOfChars[i];
    let second = arrayOfChars[arrayOfChars.length - 1 - i];
    arrayOfChars[i] = second;
    arrayOfChars[arrayOfChars.length - 1 - i] = first;
  }
  return arrayOfChars;
};
