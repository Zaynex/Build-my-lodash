import baseSlice from './.internal/baseSlice.js'
import toInteger from './toInteger.js'

/**
 * 以通过传入的参数数值为单位分割数字
 */

/**
 * 自己实现的
 后来自己思考了下， 因为纯函数，如果修改了arr，arr在其他地方就已经变了
 可以使用 JSON.parse(JSON.stringify())
 但是对于数组比较大的时候显然比较消耗性能
 */
//  const chunk = (arr, size) => {
//      let newArr = []
//      while(arr.length) {
//          newArr.push(arr.splice(0, size))
//      }
//      return newArr
//  }



/**
 * 官方实现
 */
const nativeMax = Math.max  // 用于比较两个数的大小
const nativeCeil = Math.ceil // 进位取整

function chunk (array, size) {
    //  toInteger 转换成整数
    size = nativeMax(toInteger(size), 0)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
        return []
    }
    let index = -1
    let resIndex = 0
    // 思路比较清晰了。这里就是提前创建好数组的坑位 ceil 运算有余数时都会进一位
    const result = new Array(nativeCeil(length / size))
    while (++index < length) {
        //注意这里 传入的  index += size ，下一次返回的是  index+size
        result[resIndex++] = baseSlice(array, index, (index += size))
        // result[resIndex++] = array.slice(index, index+=size)
    }
    return result
}
let a = chunk(['a', 'b', 'c', 'd'], 2);
console.log(a)