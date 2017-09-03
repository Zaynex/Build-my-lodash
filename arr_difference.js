import baseDifference from './.internal/baseDifference.js'
import baseFlatten from './.internal/baseFlatten.js'
import isArrayLikeObject from './isArrayLikeObject.js'

/**
 * 接受两个数组
 * 第一参数为需要过滤的数组，第二个参数为数组需要排除掉的值
 * 返回结果就是 第一个参数中不含第二个参数的结果
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * -0, +0 全相等
 * NaN 和 NaN 相等
 *
 function sameValueZero(x, y) {
    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
 }
 */

const difference = (arr1, arr2) => {
    arr1.filter((v) => {
       return arr2.indexOf(v) < 0
    })
}

console.log(difference([1, 2, 3], [4, 2]))

/**
 * 还是老老实实看看 lodash 实现
 */

function difference(array, ...values) {
    // 判断是否为数组对象
    return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}