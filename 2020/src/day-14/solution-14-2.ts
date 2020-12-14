import { readLines, syncSolve } from '../util'

const MASK_LENGTH = 36

function applyMask (value: number, mask: string): number[] {
  const valueBits = value.toString(2).padStart(MASK_LENGTH, '0')
  let res: string[][] = [[]]
  mask.split('').forEach((bit, index) => {
    switch (bit) {
      case '0':
        res.forEach((r) => { r.push(valueBits[index] as string) })
        break
      case '1':
        res.forEach((r) => { r.push('1') })
        break
      case 'X':
        res = res.flatMap((r) => [[...r, '0'], [...r, '1']])
    }
  })
  return res.map((r) => parseInt(r.join(''), 2))
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
      applyMask(address, mask).forEach((a) => memory.set(a, value))
    }
  })
  let sum = 0
  memory.forEach((value) => { sum += value })
  console.log(sum)
}

syncSolve(solve)
