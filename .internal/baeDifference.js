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
    let includes = arrayIncludes
    let isCommon = true
    const result = []
    const valuesLength = values.length

    if(!array.length) {
        return result
    }
    // if(iteratee) {
    //     values = map(values, (value) => iteratee(value))
    // }
    if(comparator) {
        includes = arrayIncludesWith
        isCommon = false
    }
    else if(values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas
        isCommon = false
        values = new SetCache(values)
    }
    outer:
    for(let value of array ) {
        const computed = iteratee == null ? value : iteratee(value)

        value = (comparator || value !== 0) ? value: 0
        if(isCommon && computed === computed) {
            let valuesIndex = valuesLength
            while(valuesIndex--) {
                if(values[valuesIndex] === computed) {
                    continue outer
                }
            }
            result.push(value)
        }else if(!includes(values, computed, comparator)) {
            result.push(value)
        }
    }
    return result
}

export default baseDifference