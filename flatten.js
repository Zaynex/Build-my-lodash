import baseFlatten from './.internal/baseFlatten.js'

function flatten (arr, isDeep = false) {
  /**
   * 1. 对于浅复制，可以直接使用数组解构
   * 2. 通过递归的方式读取深度的数据
   */
}

/**
 * Flattens `array` a single level deep.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep, flattenDepth
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]])
 * // => [1, 2, [3, [4]], 5]
 */
function flatten (array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, 1) : []
}

export default flatten
