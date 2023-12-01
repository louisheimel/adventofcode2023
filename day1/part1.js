const fs = require('fs')
const readText = fname => fs.readFileSync(fname).toString()
const log = x => console.log(x)
const compose = (...fns) => fns.reduce((a, e) => x => a(e(x)))
const splitLines = lines => lines.split('\n')
const map = fn => xs => xs.map(fn)
const filter = fn => xs => xs.filter(fn)
const removeEmptyStrings = filter(x => x != '')
const onlyDigits = (() => {
  const digits = '0123456789'.split('')
  return x => digits.includes(x)
})()
const first = xs => xs[0]
const last = xs => xs[xs.length - 1]
const sum = xs => xs.reduce((a, e) => a + e, 0)

compose(
  log,
  sum,
  map(
    compose(
      x => +x,
      xs => first(xs) + last(xs),
      filter(onlyDigits),
      x => x.split('')
    )
  ),
  removeEmptyStrings,
  splitLines,
  readText
)('test.txt')
