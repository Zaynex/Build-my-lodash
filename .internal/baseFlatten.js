import isFlattenable from './isFlattenable.js'

/**
 * 根据depth 递归调用 baseFlatten 函数，通过展开符保存到 result到，
 * 注意，result 是在递归调用中传入的，所以每次都是在result中push 新展开的结果
 * @param {*} array 
 * @param {*} depth 
 * @param {*} predicate 
 * @param {*} isStrict 
 * @param {*} result 
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
    let index = -1
    const length = array.length
    
    predicate || (predicate = isFlattenable)
    result || (result = [])

    while(++index < length) {
        const value = array[index]
        if(depth > 0 && predicate(value)) {
            if(depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result)
            } else {
                result.push(...value)
            }
        }  else if(!isStrict) {
            result[result.length] = value
        }
    }
    return result
}

export default baseFlatten