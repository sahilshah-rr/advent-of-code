import { readLines, syncSolve } from '../util'

interface ParsedLine {
  first: number
  second: number
  char: string
  password: string
}

function passwordValid ({ first, second, char, password }: ParsedLine): boolean {
  let count = 0
  if (password[first - 1] === char) {
    count++
  }
  if (password[second - 1] === char) {
    count++
  }
  return count === 1
}

function parseLine (line: string): ParsedLine | null {
  const lineFormat = /^(?<first>\d+)-(?<second>\d+)\s(?<char>[a-zA-Z]):\s(?<password>[a-zA-Z]+)$/
  const parts = line.match(lineFormat)?.groups
  if (parts !== undefined) {
    return {
      first: Number(parts.first),
      second: Number(parts.second),
      char: String(parts.char),
      password: String(parts.password)
    }
  } else {
    return null
  }
}

async function solve (): Promise<void> {
  let count = 0
  await readLines('src/day-02/input.txt', (line: string) => {
    const parsedLine = parseLine(line)
    if (parsedLine !== null && passwordValid(parsedLine)) {
      count++
    }
  })
  console.log(count)
}

syncSolve(solve)
