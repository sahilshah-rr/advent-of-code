import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const target = 2020
  const numbers = new Set()
  await readLines('src/day-01/input.txt', (line: string) => {
    const number = Number(line)
    const remainder = target - number
    if (numbers.has(remainder)) {
      console.log(number * remainder)
      return
    }
    numbers.add(number)
  })
}

syncSolve(solve)
