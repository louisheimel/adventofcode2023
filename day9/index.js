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
const head = first
const tail = xs => xs.slice(1)
const last = xs => xs[xs.length - 1]
const sum = xs => xs.reduce((a, e) => a + e, 0)
const product = xs => xs.reduce((a, e) => a * e, 1)
const zip = (a1, a2) => a1.reduce((a, e, i) => ([ ...a, [e, a2[i]] ]), [])
const stringify = x => JSON.stringify(x)
const split = x => y => y.split(x)

const findNextSequenceItem = xs => {
  const findRow = xs => xs.slice(0, xs.length - 1).map((e, i) => xs[i + 1] - xs[i])
  const allZeroes = xs => {
    return xs.every(x => x == 0)
  }
  let temp = [...xs]
  const rows = []
  while(!allZeroes(temp) && !(temp.length == 0)) {
    rows.push(temp)
    temp = findRow(temp)
  }
  rows.push(temp)
  return sum(rows.map(e => e[e.length - 1]))

}
const findNextSequenceItem2 = xs => {
  const findRow = xs => xs.slice(0, xs.length - 1).map((e, i) => xs[i + 1] - xs[i])
  const allZeroes = xs => {
    return xs.every(x => x == 0)
  }
  let temp = [...xs]
  let rows = []
  while(!allZeroes(temp) && !(temp.length == 0)) {
    rows.push(temp)
    temp = findRow(temp)
  }
  rows.push(temp)
  rows = rows.reverse()
  let start = 0
  for (let i = 1; i < rows.length; i++) {
    start = rows[i][0] - start
  }
  return start

}
compose(
  log,
  sum,
  map(
    compose(
      findNextSequenceItem2,
      map(x => +x),
      split(" ")
    )
  ),
  removeEmptyStrings,
  splitLines,
  readText
)(
  "input.txt"
)
