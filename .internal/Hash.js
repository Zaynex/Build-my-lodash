const HASH_UNDEFINED = '__lodash_hash_undefined__'

class Hash {
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length

        this.clear()

        while(++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }

    /**
   * Removes all key-value entries from the hash.
   *
   * @memberOf Hash
   */
    clear() {
        // 这种方式和直接赋值为空对象的区别
        /**
         * // 创建一个原型为null的空对象
            o = Object.create(null);
            o = {};
            // 以字面量方式创建的空对象就相当于:
            o = Object.create(Object.prototype);
         */
        this.__data = Object.create(null)
        this.size = 0
    }
    
    delete(key) {
        const result = this.has(key) && delete this.__data__[key]
        this.size -= result ? 1 : 0
        return result
    }

    get(key) {
        const data = this.__data__
        const result = data[key]
        return result === HASH_UNDEFINED ? undefined : result
    }

    has(key) {
        const data = this.__data__
        return data[key] !== undefined
    }

    set(key,value) {
        const data = this.__data__
        this.size += this.has(key) ? 0 : 1
        data[key] = value === undefined ? HASH_UNDEFINED : value
        return this
    }
}

export default Hash