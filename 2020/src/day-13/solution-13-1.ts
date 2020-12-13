import { readGroups, syncSolve } from '../util'

async function solve (): Promise<void> {
  let minGap = Number.MAX_SAFE_INTEGER
  let minId = 0
  await readGroups('src/day-13/input.txt', (lines) => {
    const threshold = Number(lines[0] as string)
    for (const id of (lines[1] as string).split(',')) {
      if (id !== 'x') {
        const numId = Number(id)
        const gap = (Math.floor(threshold / numId) + 1) * numId - threshold
        if (gap < minGap) {
          minGap = gap
          minId = numId
        }
      }
    }
  })
  console.log(minId * minGap)
}

syncSolve(solve)
