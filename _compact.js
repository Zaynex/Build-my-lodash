/**
 * false, null, 0, "", undefined, and NaN are falsey.
 */

const compact = (arr) => {
    let newArr
    arr.forEach(function(element) {
        if(element) {
            newArr.push(element)
        }
    }, this);
}

const compact2 = (arr) => {
    // 不能直接用 map循环，因为还是会有每个 index
    // let newArr = arr.map((v) => {
    //     if(v) {
    //         return v
    //     }
    // })
    // return newArr

    // ++index 优先自 +1 把加1后的结果给index
    let index = -1
    let length = arr == null ? 0 : arr.length
    // 内部再维护一个下标
    let resIndex = 0
    const result = []

    // 先计算，再 ++ ,也就是加1的结果放到下一轮了
    while(++index < length) {
        const value = arr[index]
        if(value) {
            resIndex[resIndex++] = value
        }

    }
}