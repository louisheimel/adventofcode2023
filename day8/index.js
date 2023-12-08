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
const parse = lines => {
  const instructions = first(lines).split('')
  const rest = Object.fromEntries(tail(lines).map(x => {
    const parts = x.split(' = ')
    return [parts[0], 
      parts[1].slice(1, parts[1].length - 1).split(', ')
    ]
  }));
  return {instructions, rest}
}
const go = ({instructions, rest}) => {
  let current = 'AAA'
  let count = 0
  let i = 0
  while (current != 'ZZZ') {
    count++
    console.log(current, count)
    let instruction = instructions[i]
    i = (i + 1) % instructions.length
    if (instruction == 'L') {
      current = rest[current][0]
    } else if (instruction == 'R') {
      current = rest[current][1]
    }

  }
  return count 
}
compose(

  log,
  go,
  parse,
  removeEmptyStrings,
  splitLines,
  readText)("test.txt")
