import { readLines, syncSolve } from '../util'

function destack (stack: any[], val: number): void {
  let stackTop = stack[stack.length - 1]
  let stackVal: number
  let result = val
  while (stack.length > 0 && stackTop !== '(') {
    if (stackTop === '+' || stackTop === '*') {
      stack.pop()
      stackVal = stack.pop() as number
      stackTop === '+' ? result += stackVal : result *= stackVal
    }
    stackTop = stack[stack.length - 1]
  }
  stack.push(result)
}

async function solve (): Promise<void> {
  let sum = 0
  await readLines('src/day-18/input.txt', (line) => {
    const stack: any[] = []
    let val: number
    for (const c of line) {
      switch (c) {
        case '(': case '+': case '*':
          stack.push(c)
          break
        case ')':
          val = stack.pop() as number
          stack.pop()
          destack(stack, val)
          break
        case ' ':
          break
        default:
          destack(stack, Number(c))
      }
    }
    sum += stack.pop() as number
  })
  console.log(sum)
}

syncSolve(solve)
