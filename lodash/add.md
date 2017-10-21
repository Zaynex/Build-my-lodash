1. Symbol
2. 类型转换
3. ArrayMap
4. getTag

在一个 createMathOperation 函数中传一个 接受两个参数的函数，以及一个 0 表示默认的返回结果。
注意在内部 `return` 了接受两个参数的函数。这两个参数就是我们就是我们需要 add 时填入的参数。所以当你直接 _.add() 方法时就是这个return的函数。

## Symbol
Symbol 表示的是不可变的数据类型，可以做为对象属性的标识使用。它不是对象，只是一种原始类型的值。类似于字符串的数据类型。
创建一个 Symbol类型的方式
```
var a = Symbol("str1")
var b = Symbol("str1")
a === b // false
typeof a // "symbol"
```

**注意，当你 new Symbol() 时会报错**

> 这会阻止创建一个显式的 Symbol 包装器对象而不是一个 Symbol 值。围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 然而，现有的原始包装器对象，如 new Boolean、 new String以及new Number因为遗留原因仍可被创建。
一般 Symbol 的应用场景作为一个私有的属性值。
还有一些 Api 后续遇到再记录。

## ArrayMap
```
function arrayMap(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
```
其实代码还是很简单的，新建一个等长度的新数组，新数组的索引值为每个处理过的函数(iteratee)的值。
通过传入 baseToString 函数对每个元素转换为 string 类型。但是后面的 index 和 array 其实都没用到，不过这个是一个 common function，
在后续还是有可能用到的，只是在这里没有。

使用这种封装的函数的好处就是不需要在 Array.map 里面写一些逻辑，而是进行分离。


## 类型转换
- 1 / 0 = INFINITY
- -1 / -0 = -INFINITY
- +"123" = 123
对于值为数字的字符串类型，前面的 + 可以转换为 number。（在 Don't know JS 中有提到）

## getTag
没想到类型比想象中的复杂的多。这个后续有专门用到的时候再详细介绍
