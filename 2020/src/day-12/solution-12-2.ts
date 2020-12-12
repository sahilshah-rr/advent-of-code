import { readLines, syncSolve } from '../util'

type Direction = 'N' | 'E' | 'S' | 'W'
type AngularDirection = 'L' | 'R'
type RotationStops = 90 | 180 | 270

interface Position {
  x: number
  y: number
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

type Sign = -1 | 0 | 1

interface QuadrantOrAxis {
  x: Sign
  y: Sign
}

const QoAOrder: QuadrantOrAxis[] = [
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 }
]

function yawWay (way: Position, ins: Yaw): Position {
  const currentQoA = { x: Math.sign(way.x) as Sign, y: Math.sign(way.y) as Sign }
  const currentIndex = QoAOrder.findIndex((qoa) => qoa.x === currentQoA.x && qoa.y === currentQoA.y)
  const indexTranslation = (ins.command === 'L' ? -1 : +1) * ins.degrees / 90 * 2
  const QoALength = QoAOrder.length
  const nextIndex = (((currentIndex + indexTranslation) % QoALength) + QoALength) % QoALength
  const nextQoA = QoAOrder[nextIndex] as QuadrantOrAxis
  if (ins.degrees === 180) {
    way = { x: way.y, y: way.x }
  }
  return { x: nextQoA.x * Math.abs(way.y), y: nextQoA.y * Math.abs(way.x) }
}

function swayWay (way: Position, ins: Sway): Position {
  switch (ins.command) {
    case 'N':
      return { x: way.x, y: way.y + ins.distance }
    case 'E':
      return { x: way.x + ins.distance, y: way.y }
    case 'S':
      return { x: way.x, y: way.y - ins.distance }
    case 'W':
      return { x: way.x - ins.distance, y: way.y }
  }
}

function surge (pos: Position, way: Position, ins: Surge): Position {
  return {
    x: pos.x + (way.x * ins.distance),
    y: pos.y + (way.y * ins.distance)
  }
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
  const start: Position = { x: 0, y: 0 }
  let pos = start
  let way = { x: +10, y: +1 }
  await readLines('src/day-12/input.txt', (line) => {
    const ins = parseIns(line)
    switch (ins.type) {
      case 'sway':
        way = swayWay(way, ins)
        break
      case 'yaw':
        way = yawWay(way, ins)
        break
      case 'surge':
        pos = surge(pos, way, ins)
        break
    }
  })
  console.log(Math.abs(pos.x - start.x) + Math.abs(pos.y - start.y))
}

syncSolve(solve)
