import { readGroups, syncSolve } from '../util'

function recursiveCombat (player1: number[], player2: number[]): boolean {
  const states = new Set<string>()

  let state = `${player1.join()}|${player2.join()}`
  while (!states.has(state)) {
    states.add(state)
    if (player1.length === 0) { return false }
    if (player2.length === 0) { return true }
    const card1 = player1.shift() as number
    const card2 = player2.shift() as number
    let p1win: boolean
    if (player1.length >= card1 && player2.length >= card2) {
      p1win = recursiveCombat(player1.slice(0, card1), player2.slice(0, card2))
    } else {
      p1win = card1 > card2
    }
    p1win ? player1.push(card1, card2) : player2.push(card2, card1)
    state = `${player1.join()}|${player2.join()}`
  }

  return true
}

async function solve (): Promise<void> {
  const player1: number[] = []
  const player2: number[] = []

  let i = 0
  await readGroups('src/day-22/input.txt', group => {
    (i === 0 ? player1 : player2).push(...group.slice(1).map(Number))
    i++
  })

  const p1win = recursiveCombat(player1, player2)

  const sum = (p1win ? player1 : player2)
    .reverse().reduce((s, c, i) => s + c * (i + 1), 0)

  console.log(sum)
}

syncSolve(solve)
