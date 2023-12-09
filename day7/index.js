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
const id = x => x
const toInt = x => +x
const mapFirst = f => x => [f(x[0]), ...x.slice(1)]
const mapRest = f => x => [x[0], ...(x.slice(1).map(toInt))]
const hist = xs => {
  const result = new Map()
  xs.forEach(x => {
    if (result.has(x)) {
      result.set(x, result.get(x) + 1)
    } else {
      result.set(x, 1)
    }
  })
  return result
}
const and = (...fns) => x => fns.every(f => f(x))
//-----------------------------------------------------------------
const cards = 
  ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const handRank = [
  "FIVE_OF_KIND",
  "FOUR_OF_KIND",
  "FULL_HOUSE",
  "THREE_OF_KIND",
  "TWO_PAIR",
  "ONE_PAIR",
  "HIGH_CARD"
]

const fiveOfKind = cards => compose(
  m => m.size == 1,
  hist
)
const fourOfKind = cards => compose(
  m => m.size == 2,
  hist
)

const threeOfKind = compose(
  m => !![...m.entries()].find(x => x[1] == 3),
  hist
)
const twoOfKind = compose(
  m => !![...m.entries()].find(x => x[1] == 2),
  hist
)
const fullHouse = xs => and(threeOfKind, twoOfKind)
const twoPair = compose(
  m => {
    let pairCount = 0;
    const mapEntries = [...m.entries()]
    mapEntries.forEach(e => {
      if (e[1] == 2) {
        pairCount++
      }
    })
    return pairCount == 2
  },
  hist
)
const onePair = compose(
  m => {
    let pairCount = 0
    const mapEntries = [...m.entries()]
    mapEntries.forEach(e => {
      if (e[1] == 2) {
        pairCount++
      }
    })
    return pairCount == 1
  },
  hist
)




// 6440
compose(
  log,
  map(compose(
    mapFirst(hist),
    mapRest(toInt),
    mapFirst(split("")),
    split(" "))),
  removeEmptyStrings,
  splitLines,
  readText
)(
  "test.txt"
)
