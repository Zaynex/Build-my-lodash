import baseToNumber from './baseToNumber.js'
import baseToString from './baseToString.js'
/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator, defaultValue) {
    return (value, other) => {
        let result
        if(isNaN(value) || isNaN(value)) {
            throw new Error("you can't add NaN")
            return false;
        }
        if(value === undefined && other === undefined) {
            /** 0 */
            return defaultValue
        }
        if(value !== undefined) {
            result = value
        }
        if(other !== undefined) {
            if(result === undefined) {
                return other
            }
            if(typeof value === 'string' || typeof other === 'string') {
                value = baseToString(value)
                other = baseToString(other)
            } else {
                value = baseToNumber(value)
                other = baseToNumber(other)
            }
            result = operator(value, other)
        }
        return result
    }
}

export default createMathOperation
