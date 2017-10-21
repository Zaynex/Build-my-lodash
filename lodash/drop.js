import slice from './slice.js'
/**
 * 将数组前n位的元素去掉，然后返回剩余的部分
 * @param {} array
 * @param {*} n 默认是1
 */

// function drop(array, n = 1){
//   return array.slice(n)
// }

function drop(array, n = 1){
  const length = array == null? 0: array.length
  return length
  ? slice(array, n < 0 ? 0: n, length)
  : []
}

export default drop