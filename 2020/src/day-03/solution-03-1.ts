import { readLines, syncSolve } from '../util'

const tree = '#'
const right = 3
const down = 1

async function solve (): Promise<void> {
  const field = [] as string[][]

  await readLines('src/day-03/input.txt', (line: string) => {
    if (line.length > 0) {
      field.push(line.split(''))
    }
  })

  if (Array.isArray(field[0])) {
    const height = field.length
    const width = field[0].length
    let count = 0
    let row = 0
    let col = 0

    while (row < height) {
      const fieldRow = field[row]
      if (Array.isArray(fieldRow) && fieldRow[col] === tree) {
        count++
      }
      row = row + down
      col = (col + right) % width
    }

    console.log(count)
  }
}

void solve()
