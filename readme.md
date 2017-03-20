### Install

```sh
npm install --save compressed-map
```

### Use

```node
> wrap = require('./index.js')
[Function: wrap]
> map = wrap(new Map())
Map {}
> map.set('long string key', 1)
Map { 'sHÕ \fòì' => 1 }
> map.set('short', 2)
Map { 'sHÕ \fòì' => 1, 'short' => 2 }
> map.set(['not', 'a', 'string'], 3)
Map {
  'sHÕ \fòì' => 1,
  'short' => 2,
  [ 'not', 'a', 'string' ] => 3 }
> map.delete('long string key')
true
> map
Map { 'short' => 2, [ 'not', 'a', 'string' ] => 3 }
>
```

Pass a number as the second argument to `wrap` to specify the maximum uncompressed string key length in bytes. It defaults to 10.

```node
> map = wrap(new Map(), 3)
Map {}
> map.set('abc', 1)
Map { 'abc' => 1 }
> map.set('abcd', 2)
Map { 'abc' => 1, 'Ô&' => 2 }
```
