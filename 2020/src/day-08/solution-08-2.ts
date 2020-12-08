import { readGroups, syncSolve } from '../util'

function run (program: string[]): number | null {
  const lines = new Set<number>()
  let ptr = 0
  let acc = 0
  while (!lines.has(ptr) && !(ptr === program.length)) {
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
  if (ptr === program.length) {
    return acc
  } else {
    return null
  }
}

function modifyProgram (program: string[], ptr: number): string[] {
  const inst = program[ptr] as string
  let newInst: string
  if (inst.startsWith('jmp')) {
    newInst = inst.replace('jmp', 'nop')
  } else if (inst.startsWith('nop')) {
    newInst = inst.replace('nop', 'jmp')
  } else {
    return program
  }
  return [
    ...program.slice(0, ptr),
    newInst,
    ...program.slice(ptr + 1)
  ]
}

async function solve (): Promise<void> {
  let program: string[] = []
  await readGroups('src/day-08/input.txt', (group) => { program = group })
  for (let i = 0; i < program.length; i += 1) {
    const acc = run(modifyProgram(program, i))
    if (acc !== null) {
      console.log(acc)
      break
    }
  }
}

syncSolve(solve)
