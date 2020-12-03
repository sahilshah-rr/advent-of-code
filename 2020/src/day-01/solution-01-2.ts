import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const target = 2020
  const numbers = new Set<number>()
  await readLines('src/day-01/input.txt', (line: string) => {
    const number = Number(line)
    const remainder = target - number
    for (const left of numbers) {
      const right = remainder - left
      if (left !== right && numbers.has(right)) {
        console.log(number * left * right)
        return
      }
    }
    numbers.add(number)
  })
}

syncSolve(solve)
