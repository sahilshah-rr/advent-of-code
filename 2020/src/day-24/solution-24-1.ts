import { readLines, syncSolve } from '../util'

type Direction = 'd' | 'e' | 'f' | 'v' | 'w' | 'x'

interface Coordinates {
  x: number
  y: number
}

async function solve (): Promise<void> {
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
    const ts = `${tile.x},${tile.y}`
    blacks.has(ts) ? blacks.delete(ts) : blacks.add(ts)
  })
  console.log(blacks.size)
}

syncSolve(solve)
