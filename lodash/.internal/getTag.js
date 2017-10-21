/**
 * 虽然还有很多数据类型未接触过，但返回的统一格式都是
 * [object Xyyy]
 */


function getTag(str){
    return Object.prototype.toString.call(str)
}
export default getTag