import { readLines, syncSolve } from '../util'

function combo (adapters: number[], index: number, cache: Map<number, number>): number {
  const jolt = adapters[index] as number
  if (index === 0) {
    return 1
  } else if (cache.has(jolt)) {
    return cache.get(jolt) as number
  } else {
    let count = 0
    for (let i = index - 1; i >= index - 3 && i >= 0; i--) {
      if ((jolt - (adapters[i] as number)) <= 3) {
        count += combo(adapters, i, cache)
      }
    }
    cache.set(jolt, count)
    return count
  }
}

async function solve (): Promise<void> {
  const adapters: number[] = [0]
  await readLines('src/day-10/input.txt', (line) => {
    adapters.push(Number(line))
  })
  adapters.sort((a, b) => a - b)
  adapters.push(adapters[adapters.length - 1] as number + 3)
  console.log(combo(adapters, adapters.length - 1, new Map<number, number>()))
}

syncSolve(solve)
