// 利用 promise.race 设定一个超时出现的 error,来模拟promise超时的异常处理
const promiseDelay = (ms) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

timeoutPromise = (promise, ms) => {
  let errFunc = () => { throw new Error('timeout') }
  let newPromise = promiseDelay(ms).then(errFunc)
  return Promise.race([promise, newPromise])
}


const cancelAbleXHR = (url) => {
  const req = new XMLHttpRequest()
  const promise = new Promise((resolve, reject) => {
    req.open('GET', url, true)
    req.onload = () => {
      if (req.status >= 200 && req.status <= 304) {
        resolve(req.responseText)
      } else { reject(new Error(req.statusText)) }
    }
    req.error = () => { reject(new Error(req.statusText)) }
    req.onabort = () => { reject(new Error('abort this request')) }
    req.send()
  })
  const abort = () => {
    if (req.readyState !== XMLHttpRequest.UNSENT) {
      req.abort();
    }
  }
  return {
    promise,
    abort
  }
}

const object = cancelableXHR('http://httpbin.org/get')
timeoutPromise(object.promise, 3000).then((contents) => {
  console.log('Contents', contents)
}).catch((error) => {
  console.log('XHR Error :', error)
});
