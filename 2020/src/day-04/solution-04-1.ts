import { readLines, syncSolve } from '../util'

const fields = {
  byr: 0,
  iyr: 1,
  eyr: 2,
  hgt: 3,
  hcl: 4,
  ecl: 5,
  pid: 6,
  cid: 7
}

const validMasks = [127, 255]

async function solve (): Promise<void> {
  let count = 0
  let mask = 0
  await readLines('src/day-04/input.txt', (line: string) => {
    if (line.length === 0) {
      if (validMasks.includes(mask)) {
        count++
      }
      mask = 0
    } else {
      line.split(' ').forEach((kv: string) => {
        mask = mask | (2 ** fields[kv.substring(0, 3) as keyof typeof fields])
      })
    }
  })

  if (validMasks.includes(mask)) {
    count++
  }
  console.log(count)
}

syncSolve(solve)
