import createWrap from './internal/createWrap.js'

const WRAP_ARY_FLAG = 128

/**
 * 
 * @param {*} func 
 * @param {*} n 
 * @example 
 *  * map(['6', '8', '10'], ary(parseInt, 1))
 */
function ary(func, n) {
    n = (func && n == null) ? func.length : n
    return createWrap(func, WRAP_ARY_FLAG, undefined, undefined,undefined, undefined, n)
}

export default ary