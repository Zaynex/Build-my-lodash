// 本质上是返回一个增加版的函数
const debounce = (func, wait = 200, immediate = false) => {
  let timeToken = null
  return (...args) => {
    let isCallNow = immediate && !timeToken
    clearTimeout(timeToken)
    timeToken = setTimeout(() => {
      timeToken = null
      !immediate && func.apply(null, args)
    }, wait)
    isCallNow && func.apply(null, args)
  }
}
