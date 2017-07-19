import toFinite from './toFinite.js'

function toInteger(value) {
    const result = toFinite(value)
    const remainder = result % 1
    return result === result ? (remainder ? result - remainder : result) : 0
}