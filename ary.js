import createWrap from './internal/createWrap.js'

const WRAP_ARY_FLAG = 128

function ary(func, n) {
    n = (func && n == null) ? func.length : n
    return createWrap(func, WRAP_ARY_FLAG, undefined, undefined,undefined, undefined, n)
}

export default ary