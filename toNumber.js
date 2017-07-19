import isObject from './isObject.js'
import isSymbol from './isSymbol.js'

const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g

/** 处理16进制 */
const reIsBadHax = /^[-+]0x[0-9a-f]+$/i

/** 字节 */
const reIsBinary = /^0b[01]+$/i

/** 八进制 */
const reIsOctal = /^0o[0-7]+$/i

const freeParseInt = parseInt

/**
 * 转换 value 为  number 类型
 */


