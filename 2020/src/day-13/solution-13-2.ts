import { readGroups, syncSolve } from '../util'

function lcm (x: number, y: number): number {
  if (x === 0 || y === 0) {
    return 0
  } else {
    return (x * y) / gcd(x, y)
  }
}

function gcd (x: number, y: number): number { while (y > 0) { const t = y; y = x % y; x = t } return x }

async function solve (): Promise<void> {
  let line = ''
  await readGroups('src/day-13/input.txt', (lines) => {
    line = lines[1] as string
  })
  const times: Map<number, number> = new Map<number, number>()
  line.split(',').forEach((id, index) => {
    if (id !== 'x') {
      times.set(Number(id), index)
    }
  })

  let time = 0
  let inc = 1
  times.forEach((offset, id) => {
    while (((time + offset) % id) !== 0) {
      time += inc
    }
    inc = lcm(inc, id)
  })
  console.log(time)
}

syncSolve(solve)
