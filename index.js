const crypto = require('crypto')

const defaultCharacters = 10
const hashAlgorithm = 'sha256'
const fields = [
    'get',
    'set',
    'has',
    'delete'
]

module.exports = function wrap(map, maxLength = defaultCharacters) {
    fields.forEach(field => {
        const prototype = Reflect.getPrototypeOf(map)
        const descriptor =
            Reflect.getOwnPropertyDescriptor(map, field) ||
            Reflect.getOwnPropertyDescriptor(prototype, field)

        Reflect.defineProperty(map, field, Object.assign(descriptor, {
            value: new Proxy(map[field], {
                apply: function(defaultFunction, map, args) {
                    if (typeof args[0] === 'string' && args[0].length > maxLength) {
                        args[0] = encode(args[0]).slice(0, maxLength)
                    }

                    return Reflect.apply(defaultFunction, map, args)
                }
            })
        }))
    })

    return map
}

function encode(string) {
    return crypto
    .createHash(hashAlgorithm)
    .update(string)
    .digest('binary')
}
