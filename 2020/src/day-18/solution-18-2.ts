import { readLines, syncSolve } from '../util'

function destackPlus (stack: any[], val: number): void {
  let stackTop = stack[stack.length - 1]
  let stackVal: number
  let result = val
  while (stack.length > 0 && stackTop !== '(' && stackTop !== '*') {
    if (stackTop === '+') {
      stack.pop()
      stackVal = stack.pop() as number
      result += stackVal
    }
    stackTop = stack[stack.length - 1]
  }
  stack.push(result)
}

function destackFull (stack: any[]): void {
  let result = stack.pop() as number
  let stackTop = stack[stack.length - 1]
  while (stack.length > 0 && stackTop !== '(') {
    if (stackTop === '*') {
      stack.pop()
      const stackVal = stack.pop() as number
      result *= stackVal
    }
    stackTop = stack[stack.length - 1]
  }
  if (stackTop === '(') {
    stack.pop()
    destackPlus(stack, result)
  } else {
    stack.push(result)
  }
}

async function solve (): Promise<void> {
  let sum = 0
  await readLines('src/day-18/input.txt', (line) => {
    const stack: any[] = []
    for (const c of line) {
      switch (c) {
        case '(': case '+': case '*':
          stack.push(c)
          break
        case ')':
          destackFull(stack)
          break
        case ' ':
          break
        default:
          destackPlus(stack, Number(c))
      }
    }
    destackFull(stack)
    sum += stack.pop() as number
  })
  console.log(sum)
}

syncSolve(solve)
