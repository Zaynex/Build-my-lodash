import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 *
 * @param {*} array 表示的要过滤的数组
 * @param {*} values 过滤数组
 * @param {*} iteratee 在difference 中不存在
 * @param {*} comparator  同上 不存在
 */
function baseDifference(array, values, iteratee, comparator) {
    /**这里是自定义了 includes 方法，与 Array.includes方法等同
     * 返回 bool 值
     **/
    let includes = arrayIncludes
    let isCommon = true
    const result = []
    const valuesLength = values.length

    if(!array.length) {
        return result
    }


    // 在difference 中不需要考虑这部分
    if(iteratee) {
        values = map(values, (value) => iteratee(value))
    }
    if(comparator) {
        includes = arrayIncludesWith
        isCommon = false
    }
    // ------ difference 中不用考虑

    else if(values.length >= LARGE_ARRAY_SIZE) {
        /**
         * 如果数组长度大于200，则使用hash方式进行对比
         * 因为 includes 本质上是用 indexOf 去遍历
         * 算法复杂度取决于数组的长度 O(LENGTH)，而hash的算法复杂度为 O(1)
         */
        includes = cacheHas
        isCommon = false

        // 转换成键值对的values
        values = new SetCache(values)
    }

    // 这里的 outer 是和 continue 对应，如果满足某个条件，继续执行 outer 中的下一轮循环
    outer:
    for(let value of array ) {
        const computed = iteratee == null ? value : iteratee(value)

        value = (comparator || value !== 0) ? value: 0
        // isCommon 应该就是标记，diff的数组较长时换成另外一种 indexOf 方式
        if(isCommon && computed === computed) {
            // 数组长度 < 200
            let valuesIndex = valuesLength
            /**
             * 这部分逻辑和外层的for of 就可以理解为
             * 对原数据进行循环，每个值去和 需要diff的数组进行对比，
             * 下层的while循环是需要 diff的数组
             * arr.filter((v) => {
             *  return diffarr2.indexOf(v)
             * })
             * 如果原数据中存在 diff数组的值，那就继续进行外层的循环， 注意 continue 中的标记
             * 如果不存在，那就执行 result.push()
             */
            while(valuesIndex--) {
                if(values[valuesIndex] === computed) {
                    continue outer
                }
            }
            result.push(value)
        }else if(!includes(values, computed, comparator)) {
            /**
             * 这里的 else if 就简单粗暴了，因为变成了hash，其实就是 {key:value}的形式，每个 key都是唯一的
             */
            result.push(value)
        }
    }
    return result
}

export default baseDifference