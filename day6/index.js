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
const product = xs => xs.reduce((a, e) => a * e, 1)
const zip = (a1, a2) => a1.reduce((a, e, i) => ([ ...a, [e, a2[i]] ]), [])


const waysToWin = ([time, distance]) => {
  let result = 0
  for (let rate = 0; rate <= time; rate++) {
    if (rate * (time - rate) > distance) result++

  }
  return result 
}
compose(log, 
  waysToWin,
  map(x => +x),
  map(sum),
  xs => [xs[0].slice(1), xs[1].slice(1)],
  map(x => x.split(/\s+/)), removeEmptyStrings, splitLines)(readText("input.txt"))
