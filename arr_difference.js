import baseDifference from './.internal/baseDifference.js'
import baseFlatten from './.internal/baseFlatten.js'
import isArrayLikeObject from './isArrayLikeObject.js'

/**
 * 接受两个数组
 * 第一参数为需要过滤的数组，第二个参数为数组需要排除掉的值
 * 返回结果就是 第一个参数中不含第二个参数的结果
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * 字符型数值 和 Number 相等
 * -0 和 +0 相等
 * NaN 和 NaN 相等
 */

const difference = (arr1, arr2) => {
    /**
     *如果只是for 循环对比的话，特别低效，所以可以先 排序,再放到新的堆栈里,先取出来一个之后挨个对比（也很耗性能）
     * 但是字符串该怎么办呢 
     * 重写 indexOf，但是修改原型链导致其他地方的indexOf也跟着变了
     */

    arr1 = arr1.sort()
    arr2 = arr2.sort()

    const filterArr = []
    let length = arr1.length
    let i = -1
    while (++i < length) {
        if (arr2.indexOf(arr1[i])) {
            filterArr.push(arr1[i])
        }
    }
    return filterArr
}

console.log(difference([1, '2', 3], [4, 2]))

/**
 * 还是老老实实看看 lodash 实现
 */

function difference(array, ...values) {
    // 判断是否为数组对象
    return isArrayLikeObject(array) 
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}