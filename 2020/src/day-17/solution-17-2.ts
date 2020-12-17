import { readGroups, syncSolve } from '../util'

const Cycles = 6

type Cube = '#' | '.'
type Grid = Map<number, Map<number, Map<number, Map<number, Cube>>>>
interface Coordinates {
  w: number
  x: number
  y: number
  z: number
}

function getCube (grid: Grid, { w, x, y, z }: Coordinates): Cube {
  const cube = grid.get(w)?.get(x)?.get(y)?.get(z)
  return cube === undefined ? '.' : cube
}

function neighbors ({ w, x, y, z }: Coordinates): Coordinates[] {
  const n = []
  for (const z1 of [z - 1, z, z + 1]) {
    for (const y1 of [y - 1, y, y + 1]) {
      for (const x1 of [x - 1, x, x + 1]) {
        for (const w1 of [w - 1, w, w + 1]) {
          if (w !== w1 || x !== x1 || y !== y1 || z !== z1) {
            n.push({ w: w1, x: x1, y: y1, z: z1 })
          }
        }
      }
    }
  }
  return n
}

function countCubes (grid: Grid, cube: Cube): number {
  let count = 0
  grid.forEach(xGrid => {
    xGrid.forEach(yGrid => {
      yGrid.forEach(zGrid => {
        zGrid.forEach(c => {
          if (c === cube) {
            count += 1
          }
        })
      })
    })
  })
  return count
}

function nextCycle (grid: Grid): Grid {
  const newGrid: Grid = new Map()
  grid.forEach((xGrid, w) => {
    const xNewGrid = new Map()
    newGrid.set(w, xNewGrid)
    xGrid.forEach((yGrid, x) => {
      const yNewGrid = new Map()
      xNewGrid.set(x, yNewGrid)
      yGrid.forEach((zGrid, y) => {
        const zNewGrid = new Map()
        yNewGrid.set(y, zNewGrid)
        zGrid.forEach((cube, z) => {
          const n = neighbors({ w, x, y, z })
          let count = 0
          n.forEach(coords => {
            if (getCube(grid, coords) === '#') {
              count += 1
            }
          })
          let newCube = cube
          if (cube === '#') {
            if (count !== 2 && count !== 3) {
              newCube = '.'
            }
          } else if (cube === '.') {
            if (count === 3) {
              newCube = '#'
            }
          }
          zNewGrid.set(z, newCube)
        })
      })
    })
  })
  return newGrid
}

async function parseGrid (): Promise<Grid> {
  const grid: Grid = new Map()
  let plane: string[] = []
  await readGroups('src/day-17/input.txt', (group) => { plane = group })
  const xStart = plane.length
  const yStart = (plane[0] as string).length
  for (let w = -Cycles; w <= Cycles; w++) {
    const xGrid = new Map()
    grid.set(w, xGrid)
    for (let x = -Cycles; x < xStart + Cycles; x++) {
      const yGrid = new Map()
      xGrid.set(x, yGrid)
      const line = plane[x]
      const cubes = line === undefined ? '.'.repeat(yStart + Cycles * 2) : '.'.repeat(Cycles) + line + '.'.repeat(Cycles)
      for (let y = -Cycles; y < yStart + Cycles; y++) {
        const zGrid = new Map()
        yGrid.set(y, zGrid)
        for (let z = -Cycles; z <= Cycles; z++) {
          zGrid.set(z, w === 0 && z === 0 ? cubes[y + Cycles] as Cube : '.')
        }
      }
    }
  }
  return grid
}

async function solve (): Promise<void> {
  let grid = await parseGrid()
  for (let i = 0; i < Cycles; i++) {
    grid = nextCycle(grid)
  }
  console.log(countCubes(grid, '#'))
}

syncSolve(solve)
