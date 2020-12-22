import { readGroups, syncSolve } from '../util'

async function solve (): Promise<void> {
  const player1: number[] = []
  const player2: number[] = []

  let i = 0
  await readGroups('src/day-22/input.txt', group => {
    (i === 0 ? player1 : player2).push(...group.slice(1).map(Number))
    i++
  })

  while (player1.length > 0 && player2.length > 0) {
    const card1 = player1.shift() as number
    const card2 = player2.shift() as number
    if (card1 < card2) {
      player2.push(card2, card1)
    } else {
      player1.push(card1, card2)
    }
  }

  const sum = (player1.length === 0 ? player2 : player1)
    .reverse().reduce((s, c, i) => s + c * (i + 1), 0)

  console.log(sum)
}

syncSolve(solve)
