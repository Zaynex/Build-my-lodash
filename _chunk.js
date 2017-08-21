/**
 * 以通过传入的参数数值为单位分割数字
 */

 /**
  * 自己实现的
  */
 const chunk = (arr, size) => {
     let newArr = []
     while(arr.length) {
         newArr.push(arr.splice(0, size))
     }
     return newArr
 }

let a = chunk(['a', 'b', 'c', 'd'], 3);
let b = chunk(['a', 'b'], 3);
console.log(b)

/**
 * 官方实现
 */
const nativeMax = Math.max  // 用于比较两个数的大小
const nativeCeil = Math.ceil // 进位取整

function chunk(array, size) {
    //  toInteger 转换成整数
    size = nativeMax(toInteger(size), 0)
    const length = array == null ? 0: arr.length
    if(!length || size < 1) {
        return []
    }
    let index = -1
    let resIndex = 0
    // 思路比较清晰了。这里就是提前创建好数组的坑位 ceil 运算有余数时都会进一位
    const result = new Array(nativeCeil(length / size))

    while(++index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size))
    }
    return result
}