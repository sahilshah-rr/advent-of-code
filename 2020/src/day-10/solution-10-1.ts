import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const adapters: number[] = [0]
  let ones = 0
  let threes = 0
  await readLines('src/day-10/input.txt', (line) => {
    adapters.push(Number(line))
  })
  adapters.sort((a, b) => a - b)
  adapters.push(adapters[adapters.length - 1] as number + 3)
  for (let i = 0; i < adapters.length - 1; i++) {
    switch ((adapters[i + 1] as number) - (adapters[i] as number)) {
      case 1:
        ones += 1
        break
      case 3:
        threes += 1
        break
    }
  }
  console.log(ones * threes)
}

syncSolve(solve)
