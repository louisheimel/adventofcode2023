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
const readData = compose(removeEmptyStrings, splitLines, readText)
const splitCharacters = x => x.split('')
const joinCharacters = x => x.join('')
const joinAll = compose( xs => xs.join('\n'),
  map(joinCharacters))
const pushRocks = data => {
  while(true) {
    let change = false
    for (let i = 1; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == 'O') {
          if (data[i - 1][j] == '.') {
            data[i - 1][j] = 'O'
            data[i][j] = '.'
            change = true
          }
        }
      }
    }
    if (!change) break
  }
  return data
}
const calculateLoad = data => {
  let load = 0
  for (let j = 0; j < data[0].length; j++) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][j] == 'O') {
        load += (data.length - i)
      }
    }
  }
  return load
}

compose(
  log,
  calculateLoad,
  pushRocks,
  map(splitCharacters),
  readData
)('input.txt')
