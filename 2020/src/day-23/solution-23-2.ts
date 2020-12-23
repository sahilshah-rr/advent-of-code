import { readFile, syncSolve } from '../util'

interface Node {
  val: number
  next?: Node
  prev?: Node
}

const CupMax = 1_000_000
const MoveMax = 10_000_000

async function solve (): Promise<void> {
  const time = new Date()
  const min = 1
  let max = -1

  // Start with a dummy node
  let cur: Node = { val: 0 }
  // Cache for direct access by value
  const nodes: Node[] = [cur]

  // Tack on input cups to the dummy and doubly link
  for (const c of (await readFile('src/day-23/input.txt'))) {
    cur.next = { val: Number(c), prev: cur }
    cur = cur.next
    nodes[cur.val] = cur
    if (cur.val > max) { max = cur.val }
  }

  // Fill up to a million in the same way
  for (let c = max + 1; c <= CupMax; c++) {
    cur.next = { val: c, prev: cur }
    cur = cur.next
    nodes[c] = cur
  }
  max = cur.val

  // Connect end to start, unlink dummy node
  cur.next = (nodes[0] as Node).next as Node
  cur.next.prev = cur
  cur = cur.next // Now pointing to the first cup from input

  // 🦀🥤🔀 Crab moves
  let [first, second, third, dest]: Node[] = []
  let dVal = 0
  for (let i = 0; i < MoveMax; i++) {
    // Hand nodes
    first = cur.next as Node
    second = first.next as Node
    third = second.next as Node

    // Find destination value ignoring the hand nodes
    dVal = cur.val === min ? max : cur.val - 1
    while (dVal === first.val || dVal === second.val || dVal === third.val) {
      dVal = dVal === min ? max : dVal - 1
    }
    dest = nodes[dVal] as Node

    // Detach hand nodes from current
    cur.next = third.next as Node
    cur.next.prev = cur

    // Attach hand nodes to destination
    third.next = dest.next as Node
    third.next.prev = third
    dest.next = first
    first.prev = dest

    // Advance
    cur = cur.next
  }

  // Grab the two cups after the min cup for result
  first = nodes[min] as Node
  second = first.next as Node
  third = second.next as Node
  console.log(second.val * third.val)
  console.log((new Date()).getTime() - time.getTime())
}

syncSolve(solve)
