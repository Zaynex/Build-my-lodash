import isObject from './isObject.js'
import isSymbol from './isSymbol.js'

const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g

/** 处理16进制 */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** 字节 */
const reIsBinary = /^0b[01]+$/i

/** 八进制 */
const reIsOctal = /^0o[0-7]+$/i

const freeParseInt = parseInt

/**
 * 转换 value 为  number 类型
 * 二进制
 * 八进制
 * 十六进制
 * string
 * object
 * NAN
 */

function toNumber(value) {
    if(typeof value == 'number') {
        return value
    }
    if(isSymbol(value)) {
        return NAN
    }
    if(isObject(value)) {

        /**
         * 将 object 转换为 string
         * 判断一个对象是有 valueOf 方法，如果有则调用该 valueOf 方法
         * 然后再检测该valueOf后的结果是否为 对象，如果是的话，取字符串类型值，如果不是，则直接返回
         * 
         */
        const other = typeof value.valueOf == 'function' ? value.valueOf() : value
        value = isObject(other) ? `${other}` : other
    }
    if(typeof value != 'string') {
        return value === 0 ? value : +value
    }
    value = value.replace(reTrim, '')

    const isBinary = reIsBinary.test(value)
    return (isBinary || reIsOctal.test(value)) 
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
    /**
     * 如果是普通的 0x12 这种在最前面就被 typeof 成 number，暂时不知道什么场景下会出现这种问题
     */
}

export default toNumber
