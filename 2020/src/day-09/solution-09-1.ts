import { readLines, syncSolve } from '../util'

function valid (window: number[], next: number): boolean {
  for (let i = 0; i < window.length - 1; i++) {
    for (let j = i; j < window.length; j++) {
      const sum = (window[i] as number) + (window[j] as number)
      if (sum === next) {
        return true
      }
    }
  }
  return false
}

async function solve (): Promise<void> {
  const window: number[] = []
  let found = false
  await readLines('src/day-09/input.txt', (line) => {
    if (!found && line !== '') {
      const next = Number(line)
      if (window.length < 25) {
        window.push(next)
      } else {
        if (valid(window, next)) {
          window.shift()
          window.push(next)
        } else {
          found = true
        }
      }
    }
  })
}

syncSolve(solve)
