import Hash from './Hash.js'
import ListCache from './ListCache.js'

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData({__data__}, key) {
    const  data = __data__
    return iskeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}

/**
 * Checks if `value` is suitable for use as unique object key.
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function iskeyable(value) {
    const type = typeof value

    /**
     * 这里的三目运算符的结果又是一个表达式，又能省不少if
     */
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

class MapCache {
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        let index = -1
        const length = entries = null ? 0 : entries.length
        this.clear()

        while(++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }
    /**
   * Removes all key-value entries from the map.
   *
   * @memberOf MapCache
   */
    clear() {
        this.size = 0
        this.__data = {
            'hash': new Hash,
            'map': new (Map || ListCache),
            'string': new Hash
        }
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key) {
        const result = getMapData(this, key)['delete'](key)
        this.size -= result ? 1 : 0
        return result
    }

    get(key) {
        return getMapData(this, key).get(key)
    }

    has(key) {
        return getMapData(this, key).has(key)
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    set(key, value) {
        // 判断传入的 key 的类型，返回相应的存储结构
        const data = getMapData(this, key)
        const size = data.size
        /**
         * 这里是把上层的value 当做 key 传入，value 就是之前的  __LODASH_hash_undefined__
         * 所以后面只要对比 key值是否存在就行了！
         * 注意这里的 data.set()，不是我们外层这个  set方法，
         * 而是在 getMapData 中定义的数据结构（ Map, Hash )
         * 如果set 成功了，那就size 还得+1，如果key已经存在了，size不变
         * Map 会自动过滤重复的 key
         * 传统的object的key 只能以字符串作为key，但是 Map 结构中的key可以使用各种类型的值（包括object)当做key
         * 参见 http://es6.ruanyifeng.com/#docs/set-map#Map
         */
        data.set(key, value)
        this.size += (data.size == size) ? 0 : 1
        return this
    }
}

export default MapCache