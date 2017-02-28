const Benchmark = require('benchmark')
const wrap = require('./index.js')

const map = new Map()
const wrappedMap = wrap(new Map())
const shortString = 'a'
const longString = Array(1000).map(() => 'a').join('')
const value = 123

new Benchmark.Suite()
.add('new Map', () => {
    new Map()
})
.add('new WrappedMap', () => {
    wrap(new Map())
})
.add('Map#set short', () => {
    map.set(shortString, value)
})
.add('WrappedMap#set short', () => {
    wrappedMap.set(shortString, value)
})
.add('Map#set long', () => {
    map.set(longString, value)
})
.add('WrappedMap#set long', () => {
    wrappedMap.set(longString, value)
})
.on('cycle', ({ target }) => {
    console.log(target.toString())
    map.clear()
    wrappedMap.clear()
})
.run()