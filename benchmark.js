const Benchmark = require('benchmark')
const wrap = require('./index.js')

const map = new Map()
const wrappedMap = wrap(new Map())
const getRandomShortString = () => Math.random().toString().slice(2, 9)
const shortString = 'a'
const longString = Array(1e5).fill().map(() => 'a').join('')
const value = 123

new Benchmark.Suite()
.add('new Map', () => {
    new Map()
})
.add('new WrappedMap', () => {
    wrap(new Map())
})
.add('Map#set short', () => {
    map.set(shortString + getRandomShortString(), value)
})
.add('WrappedMap#set short', () => {
    wrappedMap.set(shortString + getRandomShortString(), value)
})
.add('Map#set long', () => {
    map.set(longString + getRandomShortString(), value)
})
.add('WrappedMap#set long', () => {
    wrappedMap.set(longString + getRandomShortString(), value)
})
.on('cycle', ({ target }) => {
    const size = Math.max(map.size, wrappedMap.size)

    global.gc()

    console.log(JSON.stringify({
        message: target.toString(),
        bytesPerEntry: process.memoryUsage().heapUsed / size
    }, null, '  '))

    map.clear()
    wrappedMap.clear()
    global.gc()
})
.run()