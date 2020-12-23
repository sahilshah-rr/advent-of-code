import { readFile, syncSolve } from '../util'

const CupMax = 1_000_000
const MoveMax = 10_000_000

async function solve (): Promise<void> {
  const min = 1
  let max = -1

  // Start with a dummy node
  const cups: number[] = Array(CupMax + 1)
  // Dummy cup
  let cur = 0

  // Tack on input cups to the dummy and doubly link
  for (const c of (await readFile('src/day-23/input.txt'))) {
    cur = cups[cur] = Number(c)
    if (cur > max) { max = cur }
  }

  // Fill up to a million in the same way
  for (let c = max + 1; c <= CupMax; c++) {
    cur = cups[cur] = c
  }
  max = cur

  // Connect end to start, unlink dummy node
  cur = cups[cur] = cups[0] as number

  // 🦀🥤🔀 Crab moves
  let [first, second, third, dest]: number[] = []
  for (let i = 0; i < MoveMax; i++) {
    // Hand nodes
    first = cups[cur] as number
    second = cups[first] as number
    third = cups[second] as number

    // Find destination value ignoring the hand nodes
    dest = cur === min ? max : cur - 1
    while (dest === first || dest === second || dest === third) {
      dest = dest === min ? max : dest - 1
    }

    // Detach hand nodes from current and advance current
    cur = cups[cur] = cups[third] as number

    // Attach hand nodes to destination
    cups[third] = cups[dest] as number
    cups[dest] = first
  }

  // Grab the two cups after the min cup for result
  second = cups[min] as number
  third = cups[second] as number
  console.log(second * third)
}

syncSolve(solve)
