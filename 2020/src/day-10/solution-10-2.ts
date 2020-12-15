import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const adapters = new Set<number>()
  let target = 0
  await readLines('src/day-10/input.txt', (line) => {
    const adapter = Number(line)
    adapters.add(adapter)
    if (adapter > target) {
      target = adapter
    }
  })
  target += 3
  adapters.add(target)
  const counts = Array(target + 1).fill(0)
  counts[0] = 1
  for (let i = 1; i <= target; i++) {
    if (adapters.has(i)) {
      let count = 0
      for (let j = i - 1; j >= i - 3 && j >= 0; j--) {
        count += (counts[j] as number)
      }
      counts[i] = count
    }
  }
  console.log(counts)
  console.log(counts[counts.length - 1])
}

syncSolve(solve)
