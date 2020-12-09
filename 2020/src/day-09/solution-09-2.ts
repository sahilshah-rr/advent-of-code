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

function invalidNumber (numbers: number[]): number | null {
  const window: number[] = []
  for (const next of numbers) {
    if (window.length < 25) {
      window.push(next)
    } else {
      if (valid(window, next)) {
        window.shift()
        window.push(next)
      } else {
        return next
      }
    }
  }
  return null
}

function subset (numbers: number[], target: number): number[] {
  let head = 0
  let tail = 1
  let sum = (numbers[head] as number) + (numbers[tail] as number)

  while (tail < numbers.length) {
    if (sum > target) {
      sum -= numbers[head] as number
      head += 1
    } else if (sum < target) {
      tail += 1
      sum += numbers[tail] as number
    } else {
      return numbers.slice(head, tail + 1)
    }
  }

  return []
}

function subsetSum (subset: number[]): number {
  return Math.min(...subset) + Math.max(...subset)
}

async function solve (): Promise<void> {
  const numbers: number[] = []
  await readLines('src/day-09/input.txt', (line) => {
    numbers.push(Number(line))
  })
  const inv = invalidNumber(numbers)
  if (inv !== null) {
    console.log(subsetSum(subset(numbers, inv)))
  }
}

syncSolve(solve)
