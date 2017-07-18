import arrayMap from './arrMap.js'
import isSymbol from '../isSymbol.js'

const INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolToString ? symbolProto.toString : undefined


function baseToString(value) {
    if(typeof value === 'string') {
        return value
    }

    if(Array.isArray(value)) {
        return `${arrayMap(value, baseToString)}`
    }

    if(isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : ""
    }

    const result = `${value}`

    return (result  == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default baseToString