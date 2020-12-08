import { readGroups, syncSolve } from '../util'

function run (program: string[]): number {
  const lines = new Set<number>()
  let ptr = 0
  let acc = 0
  console.log(program)
  while (!lines.has(ptr)) {
    lines.add(ptr)
    const [inst, oper] = (program[ptr] as string).split(' ') as [string, string]
    switch (inst) {
      case 'acc':
        acc += Number(oper)
        ptr += 1
        break
      case 'nop':
        ptr += 1
        break
      case 'jmp':
        ptr += Number(oper)
        break
      default:
        throw new Error('unknown instruction')
    }
  }
  return acc
}

async function solve (): Promise<void> {
  let program: string[] = []
  await readGroups('src/day-08/input.txt', (group) => { program = group })
  console.log(run(program))
}

syncSolve(solve)
