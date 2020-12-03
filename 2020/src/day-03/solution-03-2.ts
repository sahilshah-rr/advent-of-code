import { readLines, syncSolve } from '../util'

const tree = '#'
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

async function parseField (): Promise<string[][]> {
  const field = [] as string[][]

  await readLines('src/day-03/input.txt', (line: string) => {
    if (line.length > 0) {
      field.push(line.split(''))
    }
  })

  return field
}

function countTrees (field: string[][], right: number, down: number): number {
  let count = 0
  const height = field.length
  const width = (field[0] as string[]).length

  let row = 0
  let col = 0

  while (row < height) {
    if ((field[row] as string[])[col] === tree) {
      count++
    }
    row = row + down
    col = (col + right) % width
  }
  return count
}

async function solve (): Promise<void> {
  const field = await parseField()
  let product = 1
  for (const [right, down] of slopes) {
    product = product * countTrees(field, right as number, down as number)
  }

  console.log(product)
}

syncSolve(solve)
