const test = require('tape')
const wrap = require('./index.js')

test('no hashing', t => {
    const maxLength = 10
    const map = wrap(new Map(), maxLength)
    const entries = [
        ['a', 1],
        ['1234567890', 10]
    ]

    entries.forEach(([key, value]) => {
        map.set(key, value)

        t.equal(map.keys().next().value, key)
        t.equal(map.get(key), value)
        t.assert(map.has(key))
        t.assert(map.delete(key))
        t.assert(!map.has(key))
    })

    t.end()
})

test('hashing', t => {
    const maxLength = 3
    const map = wrap(new Map(), maxLength)
    const entries = [
        ['abcde', 123],
        ['1234567890', 10]
    ]

    entries.forEach(([key, value]) => {
        map.set(key, value)

        t.notEqual(map.keys().next().value, key)
        t.equal(map.keys().next().value.length, maxLength)
        t.equal(map.get(key), value)
        t.assert(map.has(key))
        t.assert(map.delete(key))
        t.assert(!map.has(key))
    })

    t.end()
})

test('custom maps', t => {
    const noop = () => {}
    const map = wrap({
        get: noop,
        set: noop,
        has: noop,
        delete: noop
    })

    'get set has delete'.split(' ').forEach(name => {
        t.equal(typeof map[name], 'function')
    })

    t.end()
})

test('requires get, set, has, and delete', t => {
    t.throws(() => wrap({}))

    t.end()
})

test('requires get, set, has, and delete to be functions', t => {
    const get = set = has = () => {}

    t.throws(() => wrap({ get, set, has, delete: null }))

    t.end()
})

test('non-string keys', t => {
    const map = wrap(new Map())
    const key = ['some', 'data']
    const value = []

    map.set(key, value)
    t.assert(map.has(key))
    t.equal(map.get(key), value)
    t.assert(map.delete(key))
    t.assert(!map.has(key))

    t.end()
})
