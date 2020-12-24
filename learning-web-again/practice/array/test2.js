function filterRange(array, a, b) {
  if (!Array.isArray(array)) {
    return;
  }
  let result = [];
  array.forEach((value, index) => {
      if (value <= a && value >= b) {
          result.push(value);
      }
  })

  return result;
}
let arr = [5, 3, 8, 1]
let filtered = filterRange(arr, 1, 4);

console.log('let filtered = filterRange(arr, 1, 4);', filterRange(arr, 1, 4));