import { readLines, syncSolve } from '../util'

const MASK_LENGTH = 36

function applyMask (value: number, mask: string): number {
  const valueBits = value.toString(2).padStart(MASK_LENGTH, '0')
  const res: string[] = []
  mask.split('').forEach((bit, index) => {
    if (bit === 'X') {
      bit = valueBits[index] as string
    }
    res.push(bit)
  })
  return parseInt(res.join(''), 2)
}

async function solve (): Promise<void> {
  const memory = new Map<number, number>()
  let mask = ''
  await readLines('src/day-14/input.txt', (line) => {
    const [command, operand] = line.split(' = ') as [string, string]
    if (command === 'mask') {
      mask = operand
    } else {
      const address = Number(command.substring(4, command.length - 1))
      const value = Number(operand)
      memory.set(address, applyMask(value, mask))
    }
  })
  let sum = 0
  memory.forEach((value) => { sum += value })
  console.log(sum)
}

syncSolve(solve)
