import { readLines } from '../util'

interface ParsedLine {
  min: number
  max: number
  char: string
  password: string
}

function passwordValid ({ min, max, char, password }: ParsedLine): boolean {
  let count = 0
  for (const p of password) {
    if (p === char) {
      count++
    }
  }
  return (min <= count && count <= max)
}

function parseLine (line: string): ParsedLine | null {
  const lineFormat = /^(?<min>\d+)-(?<max>\d+)\s(?<char>[a-zA-Z]):\s(?<password>[a-zA-Z]+)$/
  const parts = line.match(lineFormat)?.groups
  if (parts !== undefined) {
    return {
      min: Number(parts.min),
      max: Number(parts.max),
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

void solve()
