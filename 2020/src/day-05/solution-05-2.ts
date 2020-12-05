import { readLines, syncSolve } from '../util'

const rows = 128
const cols = 8
const seats = rows * cols

function decode (code: string, lower: string): number {
  const len = code.length
  let max = (2 ** len) - 1
  let min = 0
  let pow = len - 1
  while (pow >= 0) {
    const move = 2 ** pow
    code[len - 1 - pow] === lower ? max -= move : min += move
    pow -= 1
  }
  return min
}

async function solve (): Promise<void> {
  let min = seats
  let max = 0
  let sum = 0

  await readLines('src/day-05/input.txt', (line) => {
    const row = decode(line.substring(0, 7), 'F')
    const col = decode(line.substring(7, 10), 'L')
    const id = row * 8 + col
    if (id > max) {
      max = id
    }
    if (id < min) {
      min = id
    }
    sum += id
  })

  const myId = (max * (max + 1) / 2) - (min * (min - 1) / 2) - sum

  console.log(myId)
}

syncSolve(solve)
