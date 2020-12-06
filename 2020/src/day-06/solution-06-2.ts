import { readLines, syncSolve } from '../util'

async function solve (): Promise<void> {
  const answers = new Map<string, number>()
  let members = 0
  let sum = 0
  await readLines('src/day-06/input.txt', (line) => {
    if (line === '') {
      sum += [...answers.values()].filter(c => c === members).length
      answers.clear()
      members = 0
    } else {
      for (const a of line) {
        if (answers.has(a)) {
          answers.set(a, answers.get(a) as number + 1)
        } else {
          answers.set(a, 1)
        }
      }
      members += 1
    }
  })
  sum += [...answers.values()].filter(c => c === members).length
  console.log(sum)
}

syncSolve(solve)
