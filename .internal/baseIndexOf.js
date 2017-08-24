import baseFindIndex from './baseFindIndex.js'
import baseIsNaN from './baseIsNaN.js'
import strictIndexOf from './strictIndexOf.js'


function bsaeIndexOf(array, value, fromIndex) {
    // 判断是否严格相等  NaN !== NaN  Null !== Null Symbol !== Symbol
    return value === value 
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}


export default baseIndexOf