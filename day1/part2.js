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
const id = x => x
const first = xs => xs[0]
const last = xs => xs[xs.length - 1]
const sum = xs => xs.reduce((a, e) => a + e, 0)

const replaceNumbers = (() => {
  const numberWords = 'zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen'.split(',')
  const numbers = numberWords.reduce((a, e, i) => ({ ...a, [e]: `${i}` }), {})
  return str => {
    let result = ''
    for (let i = 0; i < str.length; i++) {
      flag = false
      for (let j = i + 1; j < str.length; j++) {
        const sliced = str.slice(i, j + 1)
        console.log(sliced)
        const numberWord = numberWords.reverse().find(x => sliced.includes(x))
        if (!!numberWord) {
          result += numbers[numberWord]
          break
        }
      }
    }
    return result
  } 
})()

compose(
  log,
  map(
    compose(
      replaceNumbers
    )
  ),
  removeEmptyStrings,
  splitLines,
  readText
)('test2.txt')

