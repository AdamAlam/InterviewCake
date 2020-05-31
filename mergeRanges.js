let mergeRanges = (meetings) => {
  meetings.sort((a, b) => {
    return a.startTime - b.startTime;
  });
  let checkOverlap = (meet1, meet2) => {
    // No Overlap
    if (meet1.startTime < meet2.startTime && meet1.endTime < meet2.endTime) {
      return false;
    }
    // Overlap
    if (meet2.startTime <= meet1.endTime && meet2.endTime >= meet1.endTime) {
      return { startTime: meet1.startTime, endTime: meet2.endTime };
    }
    if (meet1.startTime <= meet2.startTime && meet1.endTime >= meet2.endTime) {
      return meet1;
    }
  };

  for (let i = 0; i < meetings.length - 1; i++) {
    let result = checkOverlap(meetings[i], meetings[i + 1]);
    if (!result) {
      continue;
    } else {
      meetings.splice(i + 1, 1);
      meetings.splice(i, 1);
      meetings.splice(i, 0, result);
    }
  }

  return meetings;
};

// Tests
console.log('');
let desc = 'meetings overlap';
let actual = mergeRanges([
  { startTime: 1, endTime: 3 },
  { startTime: 2, endTime: 4 },
]);
let expected = [{ startTime: 1, endTime: 4 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings touch';
actual = mergeRanges([
  { startTime: 5, endTime: 6 },
  { startTime: 6, endTime: 8 },
]);
expected = [{ startTime: 5, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meeting contains other meeting';
actual = mergeRanges([
  { startTime: 1, endTime: 8 },
  { startTime: 2, endTime: 5 },
]);
expected = [{ startTime: 1, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings stay separate';
actual = mergeRanges([
  { startTime: 1, endTime: 3 },
  { startTime: 4, endTime: 8 },
]);
expected = [
  { startTime: 1, endTime: 3 },
  { startTime: 4, endTime: 8 },
];
assertArrayEquals(actual, expected, desc);

desc = 'multiple merged meetings';
actual = mergeRanges([
  { startTime: 1, endTime: 4 },
  { startTime: 2, endTime: 5 },
  { startTime: 5, endTime: 8 },
]);
expected = [{ startTime: 1, endTime: 8 }];
assertArrayEquals(actual, expected, desc);

desc = 'meetings not sorted';
actual = mergeRanges([
  { startTime: 5, endTime: 8 },
  { startTime: 1, endTime: 4 },
  { startTime: 6, endTime: 8 },
]);
expected = [
  { startTime: 1, endTime: 4 },
  { startTime: 5, endTime: 8 },
];
assertArrayEquals(actual, expected, desc);

desc = 'oneLongMeetingContainsSmallerMeetings';
actual = mergeRanges([
  { startTime: 1, endTime: 10 },
  { startTime: 2, endTime: 5 },
  { startTime: 6, endTime: 8 },
  { startTime: 9, endTime: 10 },
  { startTime: 10, endTime: 12 },
]);
expected = [{ startTime: 1, endTime: 12 }];
assertArrayEquals(actual, expected, desc);

desc = 'sample input';
actual = mergeRanges([
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 5 },
  { startTime: 4, endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9, endTime: 10 },
]);
expected = [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
];
assertArrayEquals(actual, expected, desc);

function assertArrayEquals(a, b, desc) {
  // Sort the keys in each meeting to avoid
  // failing based on differences in key order.
  orderedA = a.map(function (meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  orderedB = b.map(function (meeting) {
    return JSON.stringify(meeting, Object.keys(meeting).sort());
  });
  const arrayA = JSON.stringify(orderedA);
  const arrayB = JSON.stringify(orderedB);
  if (arrayA !== arrayB) {
    console.log(
      `${desc} ... FAIL: ${JSON.stringify(a)} != ${JSON.stringify(b)}`
    );
  } else {
    console.log(`${desc} ... PASS`);
  }
}
