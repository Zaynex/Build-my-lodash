/**
 * slice 对原数组没有影响，可以浅复制一个数组
 */

function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if(!length) {
    return []
  }

  start = start == null? 0 : start
  end = end === undefined ? length: end

  /**
   * 对于 start 和 end 只要是负数，加上length 计算即可
   */
  if(start < 0) {
    start = -start > length ? 0 : (length + start)
  }

  end = end > length ? length : end
  if(end < 0) {
     end += length
  }

  const result = new Array(length)
  while(++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice