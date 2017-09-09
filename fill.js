var array = [1, 2, 3];

_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8], '*', 1, 2);
// => [4, '*', 8]

const fill = (arr, num) => {
  let length = arr.length
  while (length > 0) {
    arr[length] = num
    length--
  }
}