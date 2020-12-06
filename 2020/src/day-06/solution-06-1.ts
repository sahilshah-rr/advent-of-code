import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const answers = new Set<string>()
  let sum = 0
  await readLines('src/day-06/input.txt', (line) => {
    if (line === '') {
      sum += answers.size
      answers.clear()
    } else {
      for (const c of line) {
        answers.add(c)
      }
    }
  })
  sum += answers.size
  console.log(sum)
}

syncSolve(solve)
