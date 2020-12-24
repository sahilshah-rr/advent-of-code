import { readLines, syncSolve } from '../util'

// Replaced char: ne |  e  | se  | sw  |  w  |  nw
type Direction = 'd' | 'e' | 'f' | 'v' | 'w' | 'x'

interface Coordinates {
  x: number
  y: number
}

function stringToCoords (ts: string): Coordinates {
  const [x, y] = ts.split(',')
  return { x: Number(x), y: Number(y) }
}

function coordsToString (c: Coordinates): string {
  return `${c.x},${c.y}`
}

async function day0 (): Promise<Set<string>> {
  const ref: Coordinates = { x: 0, y: 0 }
  const blacks = new Set<string>()
  await readLines('src/day-24/input.txt', line => {
    const l = line.replace(/ne/g, 'd').replace(/se/g, 'f').replace(/sw/g, 'v').replace(/nw/g, 'x')
    const tile = { ...ref }
    for (const d of l) {
      switch (d as Direction) {
        case 'd': tile.x += 1; tile.y += 1; break
        case 'e': tile.x += 2; break
        case 'f': tile.x += 1; tile.y -= 1; break
        case 'v': tile.x -= 1; tile.y -= 1; break
        case 'w': tile.x -= 2; break
        case 'x': tile.x -= 1; tile.y += 1; break
      }
    }
    const ts = coordsToString(tile)
    blacks.has(ts) ? blacks.delete(ts) : blacks.add(ts)
  })
  return blacks
}

function neighbors (c: Coordinates): Coordinates[] {
  return [
    { x: c.x + 1, y: c.y + 1 },
    { x: c.x + 2, y: c.y },
    { x: c.x + 1, y: c.y - 1 },
    { x: c.x - 1, y: c.y - 1 },
    { x: c.x - 2, y: c.y },
    { x: c.x - 1, y: c.y + 1 }
  ]
}

async function solve (): Promise<void> {
  let blacks = await day0()
  for (let i = 0; i < 100; i++) {
    const newBlacks = new Set<string>()
    blacks.forEach(tileString => {
      const coords = stringToCoords(tileString)
      let blackNeighborsCount = 0
      neighbors(coords).forEach(neighbor => {
        const neighborString = coordsToString(neighbor)
        let blackGrandNeighborsCount = 0
        neighbors(neighbor).forEach(grandNeighbor => {
          const grandNeihborString = coordsToString(grandNeighbor)
          if (blacks.has(grandNeihborString)) { blackGrandNeighborsCount += 1 }
        })
        // Neighbor is black
        if (blacks.has(neighborString)) {
          blackNeighborsCount += 1
          // Black neighbor stays black
          if (blackGrandNeighborsCount === 1 || blackGrandNeighborsCount === 2) {
            newBlacks.add(neighborString)
          }
        } else {
          // White neighbor turns black
          if (blackGrandNeighborsCount === 2) {
            newBlacks.add(neighborString)
          }
        }
      })
      if (blackNeighborsCount === 1 || blackNeighborsCount === 2) {
        newBlacks.add(tileString)
      }
    })
    blacks = newBlacks
  }
  console.log(blacks.size)
}

syncSolve(solve)
