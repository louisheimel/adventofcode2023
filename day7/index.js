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

const cardPointMapping = cards.reverse().reduce((a, e, i) => ({...a, [e[0]]: i}), {})

const handRank = [
  "FIVE_OF_KIND",
  "FOUR_OF_KIND",
  "FULL_HOUSE",
  "THREE_OF_KIND",
  "TWO_PAIR",
  "ONE_PAIR",
  "HIGH_CARD"
]

const fiveOfKind = compose(
  m => m.size == 1,
  hist
)
const fourOfKind = compose(
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
const fullHouse = xs => {
  let hasTwo = false
  let hasThree = false
  const m = hist(xs)
  const mapEntries = [...m.entries()]
  mapEntries.forEach(e => {
    if (e[1] == 2) { hasTwo = true }
    if (e[1] == 3) { hasThree = true }
  })
  return hasTwo && hasThree
}
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


const rankHands = xs => {
  const rankHand = ([cards, ...rest]) => {
    let rank = null
    if (fiveOfKind(cards)) {
      rank = 'FIVE_OF_KIND'
    } else if (fourOfKind(cards)) {
      rank = 'FOUR_OF_KIND'
    } else if (fullHouse(cards)) {
      rank = 'FULL_HOUSE'
    } else if (threeOfKind(cards)) {
      rank = 'THREE_OF_KIND'
    } else if (twoPair(cards)) {
      rank = 'TWO_PAIR'
    } else if (onePair(cards)) {
      rank = 'ONE_PAIR'
    } else {
      rank = 'HIGH_CARD'
    }
    return [cards, ...rest, rank]
  }
  return xs.map(rankHand)
}

  const handRankMapping = handRank.reduce((a, e, i) => ({...a, [e]: (6 - i + 1)}), {})
  const tiebreakFiveOfKind = (a, b) => {
      const firstScore = cardPointMapping[a[0][0]]
      const secondScore = cardPointMapping[b[0][0]]
      if (secondScore > firstScore) {
        return 1
      } else if (secondScore == firstScore) {
        return 0
      }
      return -1

  }
  const tiebreakFourOfKind = (a, b) => {
    const mostFrequentCard = cards => {
      const cardByFreq = Array.from(hist(cards).entries()).map(([k, v]) => [v, k])
      return cardByFreq.reduce((a, e) => {
        return e[0] > a[0] ? e : a
      }, [-1])[1]

    }
    const scoreA = cardPointMapping[mostFrequentCard(a)]
    const scoreB = cardPointMapping[mostFrequentCard(b)]
    if (scoreA > scoreB) return 1
    if (scoreA == scoreB) return 0
    return -1

  }
//   console.log(tiebreakFourOfKind(['2', '2', '2', '2', '3'], ['3', '3', '3', '3', '2']))
  const tiebreakFullHouse = (a, b) => {}
  const tiebreakThreeOfKind = (a, b) => {}
  const tiebreakTwoPair = (a, b) => {}
  const tiebreakOnePair = (a, b) => {}
  const tiebreakHighCard = (a, b) => {}

const betterHand = (a, b) => {

const firstScore = handRankMapping[a[2]]
  const secondScore = handRankMapping[b[2]]
  if (secondScore > firstScore) return 1
  const tiebreak = (a, b) => {
    if (a[2] == 'FIVE_OF_KIND') {
      return tiebreakFiveOfKind(a, b)

    } else if (a[2] == 'FOUR_OF_KIND') {
      return tiebreakFourOfKind(a, b)
    } else if (a[2] == 'FULL_HOUSE') {
      return tiebreakFullHouse(a, b)
    }
    else if (a[2] == 'THREE_OF_KIND') {
      return tiebreakThreeOfKind(a, b)
    }
    else if (a[2] == 'TWO_PAIR') {
      return tiebreakTwoPair(a, b)
    }
    else if (a[2] == 'ONE_PAIR') {
      return tiebreakOnePair(a, b)
    }
    else if (a[2] == 'HIGH_CARD') {
      return tiebreakHighCard(a, b)
    }
  }
  if (firstScore == secondScore) {
    return tiebreak(a, b)
  }
  return -1
}
// 6440
compose(
  log,
  hands => {
    hands.sort(betterHand)
    return hands
  },
  rankHands,
  map(compose(
    mapRest(toInt),
    mapFirst(split("")),
    split(" "))),
  removeEmptyStrings,
  splitLines,
  readText
)(
  "test.txt"
)
