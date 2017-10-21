const findIndex = (arr, callback) => {
  if (typeof callback == 'function') {
    return arr.findIndex(v => callback(v))
  }
  else {
    return arr.findIndex(callback)
  }
}

var users = [
  { 'user': 'barney', 'active': false },
  { 'user': 'fred', 'active': false },
  { 'user': 'pebbles', 'active': true }
];

let a = findIndex(users, function (o) { return o.user == 'barney'; });

let b = findIndex(users, { 'user': 'fred', 'active': false });
console.log(a, b)


function findIndex (array, predicate, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  const index = fromIndex == null ? 0 : toInteger(fromIndex)
  if (index < 0) {
    index = nativeMax(length + index, 0)
  }

  return baseFindIndex(array, getIteratee(predicate, 3), index)
}