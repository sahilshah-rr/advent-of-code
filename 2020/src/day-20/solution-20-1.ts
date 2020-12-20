import { readGroups, syncSolve } from '../util'

interface Edge {
  id: string
  pos: number
}

interface Tile {
  id: number
  sEdges: Edge[]
  fEdges: Edge[]
}

function makeEdges (line: string, pos: number): [Edge, Edge] {
  const rLine = line.split('').reverse().join('')
  return [
    { id: line, pos: pos },
    { id: rLine, pos: pos === 1 ? 3 : pos === 3 ? 1 : pos }
  ]
}

function makeTile (lines: string[]): Tile {
  const header = lines[0] as string
  const id = Number(header.substring(5, header.length - 1))
  const [tsEdge, tfEdge] = makeEdges(lines[1] as string, 0)
  const [rsEdge, lfEdge] = makeEdges(lines.slice(1).map(l => l[l.length - 1]).join(''), 1)
  const [bsEdge, bfEdge] = makeEdges(lines[lines.length - 1] as string, 2)
  const [lsEdge, rfEdge] = makeEdges(lines.slice(1).map(l => l[0]).join(''), 3)
  return {
    id,
    sEdges: [tsEdge, rsEdge, bsEdge, lsEdge],
    fEdges: [tfEdge, rfEdge, bfEdge, lfEdge]
  }
}

async function solve (): Promise<void> {
  const tiles: Tile[] = []
  const matches = new Map<number, number>()
  await readGroups('src/day-20/input.txt', group => {
    tiles.push(makeTile(group))
  })
  let min = Number.MAX_SAFE_INTEGER
  let minIds: number[] = []
  tiles.forEach((tile, i) => {
    let count = 0
    tiles.forEach((match, j) => {
      if (i !== j) {
        if (tile.sEdges.concat(tile.fEdges).some(e =>
          match.sEdges.concat(match.fEdges).some(m => e.id === m.id)
        )) { count += 1 }
      }
    })
    matches.set(tile.id, count)
    if (count < min) {
      minIds = [tile.id]
      min = count
    } else if (count === min) {
      minIds.push(tile.id)
    }
  })
  console.log(minIds.reduce((p, i) => p * i, 1))
}

syncSolve(solve)
