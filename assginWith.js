import copyObject from './.internal/copyObject.js'
import createAssigner from './.internal/createAssigner.js'
import keys from './keys.js'


function customizer(objValue, srcValue) {
    return isUndefined(objValue? srcValue : objValue)
}
