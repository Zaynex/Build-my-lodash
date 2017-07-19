import toInteger from './toInteger.js'

/**
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 *  * @example
 *
 * var renderNotes = _.after(notes.length, render);
 * _.each(notes, function(note) {
 * note.asyncSave({success: renderNotes});
 * });
 * // renderNotes is run once, after all notes have saved.
 * 
 * 
 * Creates a version of the function that will only be run after being called count times. 
 * 创建一个仅在若干次调用之后执行的函数
 * Useful for grouping asynchronous responses, where you want to be sure that all the async calls have finished, before proceeding.
 * 比较合适在异步场景中，当你想确保这些异步函数都执行成功之后再调用它
 * 保证在一定次数调用后才执行某个函数
 * 
 * 
 * 
 * 分析：
 * 这个函数是一个闭包，每次执行一次函数时，都保存着（n, func），并且执行一次之后都会 n -1,n次执行完毕之后，再执行传入的 func
 */

function after(n, func) {
    if(typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    n = toInteger(n)
    return function(...args) {
        if(--n < 1) {
            return func.apply(this, args)
        }
    }
}

export default after