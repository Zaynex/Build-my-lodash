/**
 * 这里是自定义了数据结构
 */

import MapCache from './MapCache.js'

const HASH_UNDEFINED = '__LODASH_hash_undefined__'

class SetCache {

    /**
     * Creates an array cache object to store unique values.
     * @param {Array} values 
     */
    constructor(values) {
        let index = -1
        const length = values == null ? 0: values.length

        this.__data__ = new MapCache
        while(++index < length) {
            this.add(values[index])
        }
    }

    add(value) {
        this.__data__set(value, HASH_UNDEFINED)
        return this
    }

    has(value) {
        return this.__data__has(value)
    }
}


SetCache.prototype.push = SetCache.prototype.add

export default SetCache