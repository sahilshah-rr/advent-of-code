import { readGroups, syncSolve } from '../util'

interface Matches {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

class Tile {
  id: number
  bound: number
  pixels: string[][]
  matches: Matches

  constructor (id: number, pixels: string[]) {
    this.id = id
    this.pixels = pixels.map(p => p.split(''))
    this.bound = this.pixels.length - 1
    this.matches = {}
  }

  topEdge (): string {
    return this.row(0).join('')
  }

  rightEdge (): string {
    return this.column(this.bound).join('')
  }

  bottomEdge (): string {
    return this.row(this.bound).join('')
  }

  leftEdge (): string {
    return this.column(0).join('')
  }

  inner (): string[][] {
    return this.pixels.slice(1, this.bound).map(l => l.slice(1, this.bound))
  }

  edges (): string[] {
    return [
      this.topEdge(),
      this.rightEdge(),
      this.bottomEdge(),
      this.leftEdge()
    ]
  }

  matchCount (): number {
    let count = 0
    if (this.matches !== undefined) {
      if (this.matches.top !== undefined) { count += 1 }
      if (this.matches.right !== undefined) { count += 1 }
      if (this.matches.bottom !== undefined) { count += 1 }
      if (this.matches.left !== undefined) { count += 1 }
    }
    return count
  }

  orient (predicate: (tile: Tile) => boolean): void {
    for (let i = 0; i < 8; i++) {
      if (predicate(this)) {
        break
      }
      i % 2 === 0 ? this.flipHorizontal() : this.flipDiagonal()
    }
  }

  display (): void {
    this.pixels.forEach(row => console.log(row.join('')))
  }

  roughness (): number {
    let count = 0
    this.pixels.forEach(row => {
      row.forEach(pixel => {
        if (pixel === '#') {
          count += 1
        }
      })
    })
    return count
  }

  pixel ({ x, y }: Coordinates, offset: Coordinates, val?: 'O'): string | undefined {
    if (offset !== undefined) {
      x += offset.x
      y += offset.y
    }
    if (this.boundsCheck({ x, y })) {
      if (val === 'O') {
        this.row(x)[y] = val
      }
      return this.row(x)[y] as string
    }
    return undefined
  }

  private boundsCheck ({ x, y }: Coordinates): boolean {
    return x >= 0 && x <= this.bound && y >= 0 && y <= this.bound
  }

  private row (n: number): string[] {
    return this.pixels[n] as string[]
  }

  private column (n: number): string[] {
    return this.pixels.map(r => r[n] as string)
  }

  private flipHorizontal (): void {
    this.pixels = this.pixels.map(r => r.reverse())
    if (this.matches !== undefined) {
      const left = this.matches.left
      this.matches.left = this.matches.right
      this.matches.right = left
    }
  }

  private flipDiagonal (): void {
    const pixels: string[][] = arrayOfArrays<string>(this.bound + 1)
    this.pixels.forEach((row, r) => {
      row.forEach((pixel, c) => {
        (pixels[this.bound - c] as string[])[this.bound - r] = pixel
      })
    })
    this.pixels = pixels
    if (this.matches !== undefined) {
      const left = this.matches.left
      this.matches.left = this.matches.bottom
      this.matches.bottom = left
      const right = this.matches.right
      this.matches.right = this.matches.top
      this.matches.top = right
    }
  }
}

interface Coordinates {
  x: number
  y: number
}

class Monster {
  image: string[][]
  coordinates: Coordinates[]

  constructor (image: string) {
    this.image = image.split('\n').map(l => l.split(''))
    this.coordinates = []
    this.image.forEach((row, x) => {
      row.forEach((pixel, y) => {
        if (pixel === 'O') {
          this.coordinates.push({ x, y })
        }
      })
    })
  }

  reveal (image: Tile, ref: Coordinates): boolean {
    return this.coordinates.every(offset =>
      image.pixel(ref, offset) === '#'
    )
  }

  mark (image: Tile, ref: Coordinates): void {
    this.coordinates.forEach(offset => {
      image.pixel(ref, offset, 'O')
    })
  }
}

function reverse (s: string): string {
  return s.split('').reverse().join('')
}

function arrayOfArrays<T> (n: number): T[][] {
  return Array(n).fill(0).map(_ => [] as T[])
}

function makeTile (lines: string[]): Tile {
  const header = lines[0] as string
  const id = Number(header.substring(5, header.length - 1))
  const pixels = lines.slice(1)
  return new Tile(id, pixels)
}

function makeMatches (tiles: Tile[]): void {
  tiles.forEach(t => {
    tiles.forEach(n => {
      if (t.id !== n.id) {
        const nEdges = n.edges()
        nEdges.push(...nEdges.map(reverse))
        if (nEdges.includes(t.topEdge())) { t.matches.top = n.id }
        if (nEdges.includes(t.rightEdge())) { t.matches.right = n.id }
        if (nEdges.includes(t.bottomEdge())) { t.matches.bottom = n.id }
        if (nEdges.includes(t.leftEdge())) { t.matches.left = n.id }
      }
    })
  })
}

function makeImage (tiles: Map<number, Tile>): Tile {
  const layout: Tile[][] = []
  const size = tiles.size ** 0.5

  let tile = [...tiles.values()].find(tile => tile.matchCount() === 2) as Tile
  tile.orient(t => t.matches.top === undefined && t.matches.left === undefined)

  let firstTile = tile
  while (layout.length < size) {
    if (layout.length > 0) {
      tile = tiles.get(firstTile.matches.bottom as number) as Tile
      tile.orient(t => t.topEdge() === firstTile.bottomEdge())
      firstTile = tile
    }
    const row: Tile[] = [firstTile]
    while (row.length < size) {
      const prev = tile
      tile = tiles.get(tile.matches.right as number) as Tile
      tile.orient(t => t.leftEdge() === prev.rightEdge())
      row.push(tile)
    }
    layout.push(row)
  }

  const image: string[] = []
  const iSize = tile.inner().length
  layout.forEach(row => {
    const subImage = Array(iSize).fill('')
    row.forEach(tile => {
      tile.inner().forEach((tRow, i) => {
        subImage[i] = (subImage[i] as string) + tRow.join('')
      })
    })
    image.push(...subImage)
  })
  return new Tile(-1, image)
}

function markMonsters (image: Tile, monster: Monster): number {
  let count = 0
  image.orient(tile => {
    tile.pixels.forEach((row, x) => {
      row.forEach((_, y) => {
        if (monster.reveal(image, { x, y })) {
          monster.mark(image, { x, y })
          count += 1
        }
      })
    })
    return count > 0
  })
  return count
}

async function solve (): Promise<void> {
  const tiles = new Map<number, Tile>()
  await readGroups('src/day-20/input.txt', group => {
    const tile = makeTile(group)
    tiles.set(tile.id, tile)
  })
  makeMatches([...tiles.values()])
  const image = makeImage(tiles)
  const monster = new Monster(`
..................O.
O....OO....OO....OOO
.O..O..O..O..O..O...
`.trim())
  markMonsters(image, monster)
  console.log(image.roughness())
}

syncSolve(solve)
