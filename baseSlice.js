/**
 * slice 对原数组没有影响，可以浅复制一个数组
 */

const baseSlice = (array, start, end) => {
    let index = -1
    let length = array.length

    // 如果是负数的话，表示从倒数第几个开始
    if(start < 0) {
        start = -start > length ? 0 : (length + start)
    }
    
    end = end > length ? length : end
    if(end < length) {
        end += length
    }

    // 如果初始值大于结尾值，那么直接设长度为0 
    // >>> 取整位运算
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>> 0

    // 创建一个指定长度的数组
    const result = new Array(length)
    while(++index < length) {
        result[index] = array[index + start]
    }
    return result
}