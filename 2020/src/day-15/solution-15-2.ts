import { readFile, syncSolve } from '../util'

async function solve (): Promise<void> {
  const numbers = new Map<number, number[]>()
  const line = await readFile('src/day-15/input.txt')
  let lastNum = -1
  line.split(',').forEach((num, index) => {
    lastNum = Number(num)
    numbers.set(lastNum, [index])
  })
  for (let i = numbers.size; i < 30000000; i++) {
    const prev = numbers.get(lastNum) as number[]
    if (prev.length === 1) {
      lastNum = 0
    } else {
      lastNum = (prev[prev.length - 1] as number) - (prev[prev.length - 2] as number)
    }
    let nextPrev = numbers.get(lastNum)
    if (nextPrev === undefined) {
      nextPrev = []
    }
    nextPrev.push(i)
    if (nextPrev.length > 2) {
      nextPrev.shift()
    }
    numbers.set(lastNum, nextPrev)
  }
  console.log(lastNum)
}

syncSolve(solve)
