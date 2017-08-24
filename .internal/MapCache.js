import Hash from './Hash.js'
import ListCache from './ListCache.js'

function getMapData({__data__}, key) {
    const  data = __data__
    return iskeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}

function iskeyable(value) {
    const type = typeof value
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

class MapCache {
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

    set(key, value) {
        // 判断传入的 key 的类型，返回相应的存储结构
        const data = getMapData(this, key)
        const size = data.size
        data.set(key, value)
        this.size += (data.size == size) ? 0 : 1
        return this
    }
}

export default MapCache