import { readLines, syncSolve } from '../util'

type Direction = 'N' | 'E' | 'S' | 'W'
type AngularDirection = 'L' | 'R'
type RotationStops = 90 | 180 | 270

const directionOrder: Direction[] = ['N', 'E', 'S', 'W']

interface Position {
  x: number
  y: number
  r: Direction
}

interface Sway {
  type: 'sway'
  command: Direction
  distance: number
}

interface Yaw {
  type: 'yaw'
  command: AngularDirection
  degrees: RotationStops
}

interface Surge {
  type: 'surge'
  command: 'F'
  distance: number
}

function sway (pos: Position, ins: Sway): Position {
  switch (ins.command) {
    case 'N':
      return { ...pos, y: pos.y + ins.distance }
    case 'E':
      return { ...pos, x: pos.x + ins.distance }
    case 'S':
      return { ...pos, y: pos.y - ins.distance }
    case 'W':
      return { ...pos, x: pos.x - ins.distance }
  }
}

function yaw (pos: Position, ins: Yaw): Position {
  const angularDirection = ins.command === 'L' ? -1 : +1
  const currentDirectionIndex = directionOrder.indexOf(pos.r)
  const indexTranslation = currentDirectionIndex + (angularDirection * ins.degrees / 90)
  const nextDirectionIndex = ((indexTranslation % directionOrder.length) + directionOrder.length) % directionOrder.length
  return { ...pos, r: directionOrder[nextDirectionIndex] as Direction }
}

function surge (pos: Position, ins: Surge): Position {
  return sway(pos, { type: 'sway', command: pos.r, distance: ins.distance })
}

function parseIns (ins: string): Sway | Yaw | Surge {
  const command = ins[0] as string
  const amount = Number(ins.substring(1))
  switch (command) {
    case 'N':
    case 'E':
    case 'S':
    case 'W':
      return { type: 'sway', command: command, distance: Number(ins.substring(1)) }
    case 'L':
    case 'R':
      return { type: 'yaw', command: command, degrees: amount as RotationStops }
    case 'F':
      return { type: 'surge', command: command, distance: amount }
    default:
      throw new Error(`unknwon instruction ${ins}`)
  }
}

async function solve (): Promise<void> {
  const start: Position = { x: 0, y: 0, r: 'E' }
  let pos = start
  await readLines('src/day-12/input.txt', (line) => {
    const ins = parseIns(line)
    switch (ins.type) {
      case 'sway':
        pos = sway(pos, ins)
        break
      case 'yaw':
        pos = yaw(pos, ins)
        break
      case 'surge':
        pos = surge(pos, ins)
        break
    }
  })
  console.log(Math.abs(pos.x - start.x) + Math.abs(pos.y - start.y))
}

syncSolve(solve)
