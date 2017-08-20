/**
 * 本质上就是一个 Arry.slice,如果没有第二个形参，则表示取到数组最后一位之前
 * slice中第二个参数是负数，则表示在原数组倒数第几个元素结束
 * [1,2,3,4].slice(0, -1) // [1, 2, 3]
 */

const initial = (arr, num) => {
    let slice = Array.prototype.slice
    num = num ? arr.length : -1
    return slice.call(arr, num)
    // return (num && typeof num == 'number' slice.call(arr, arr.length - num ) )
}