/**
 * 这里是自定义的 hash 数据结构
 */

import MapCache from './MapCache.js'

const HASH_UNDEFINED = '__LODASH_hash_undefined__'

class SetCache {

    /**
     * Creates an array cache object to store unique values.
     * 我们知道es6中就有 Set 可以满足这方面的需求， 确保每个 value 是唯一的
     * @param {Array} values
     */
    constructor(values) {
        let index = -1
        const length = values == null ? 0: values.length

        // 这里用的不是 es6的 Map 结构，自己实现了一套，但是提供的方法都是类似的
        this.__data__ = new MapCache
        while(++index < length) {
            this.add(values[index])
        }
    }
    /**
     * Adds `value` to the array cache.
     *
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */

    // 下面定义的方法都在原型链上
    add(value) {
        // this.__data__ 中的 set 和 has 都是拿 MapCache 原型链上的方法
        this.__data__.set(value, HASH_UNDEFINED)
        return this
    }

    has(value) {
        return this.__data__.has(value)
    }
}

// 就是给 add 方法多个名字
SetCache.prototype.push = SetCache.prototype.add

export default SetCache