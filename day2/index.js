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
const groupBy = keyFn => xs => {

  return xs.reduce((a, e, i, arr) => {
    const k = keyFn(e, i, arr)
    return Object.keys(a).includes(k) ? ({...a, [k]: [...a[k], e] }) : ({...a, [k]: [e]})
  }, {})
}

const parseGames = xs => {
  const toGame = x => {
    const [name, rest] = x.split(': ')
    const countColors = x => Object.fromEntries(x.split(', ').map(e => 
      e.split(' ').reverse()
    ))
    const objs = rest.split('; ').map(countColors)
    .map(o => {
      return Object.fromEntries(Object.entries(o).map(
        e => [e[0], +e[1]]
      ))
    })
    console.log(objs)

    const game = {
      name, rest: objs

    } 

    return game
  }
  return xs.map(toGame)
}
const test = {
  'red': 12,
    'green': 13,
    'blue': 14
}
const testGames = games => {
  const testGame = game => {
    console.log('game is', game)
    return game['red'] > test['red'] || game['green'] > test['green'] || game['blue'] > test['blue']
  }
  return games.map(g => g.rest.some(g => testGame(g))).map((e, i) => !e ? i + 1 : 0).reduce((a, e) => a + e, 0)

}
compose(
  log,
  testGames,
  parseGames,
 readData 
)("input.txt")
