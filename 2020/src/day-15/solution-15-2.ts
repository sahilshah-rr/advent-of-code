import { readFile, syncSolve } from '../util'

async function solve (): Promise<void> {
  const numbers = new Map<number, number>()
  const starters = (await readFile('src/day-15/input.txt')).split(',')
  let prev = -1
  let i = 0
  for (; i < starters.length; i++) {
    prev = Number(starters[i])
    numbers.set(prev, i)
  }
  for (; i < 30000000; i++) {
    const prevIndex = numbers.get(prev) as number
    numbers.set(prev, i - 1)
    prev = prevIndex === undefined ? 0 : i - 1 - prevIndex
  }
  console.log(prev)
}

syncSolve(solve)
