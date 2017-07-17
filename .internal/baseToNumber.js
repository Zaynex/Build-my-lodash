import isSymbol from '../isSymbol.js'

const NAN = 0 / 0

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
function baseToNumber(value) {
    if (typeof value === 'number') {
        return value
    }
    if(isSymbol(value)) {
        return NAN
    }
    return +value
}

export default baseToNumber