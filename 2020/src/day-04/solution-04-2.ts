import { readLines, syncSolve } from '../util'

const fields = {
  byr: { mask: 0, format: /^(?<val>\d{4})$/, min: () => 1920, max: () => 2002 },
  iyr: { mask: 1, format: /^(?<val>\d{4})$/, min: () => 2010, max: () => 2020 },
  eyr: { mask: 2, format: /^(?<val>\d{4})$/, min: () => 2020, max: () => 2030 },
  hgt: {
    mask: 3,
    format: /^(?<val>\d{2,3})(cm|in)$/,
    min: (s: string) => s.endsWith('cm') ? 150 : 59,
    max: (s: string) => s.endsWith('cm') ? 193 : 76
  },
  hcl: { mask: 4, format: /^#[0-9a-f]{6}$/ },
  ecl: { mask: 5, format: /^(amb|blu|brn|gry|grn|hzl|oth)$/ },
  pid: { mask: 6, format: /^\d{9}$/ },
  cid: { mask: 7 }
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
        const [key, value] = kv.split(':') as [keyof typeof fields, string]
        let valid = true
        const config = fields[key]
        if ('format' in config) {
          const parsed = value.match(config.format)
          valid &&= parsed !== null
          if (valid) {
            const val = Number((parsed as RegExpMatchArray).groups?.val as string)
            if ('min' in config) {
              valid &&= config.min(value) <= val
            }
            if ('max' in config) {
              valid &&= val <= config.max(value)
            }
          }
        }
        if (valid) {
          mask = mask | (2 ** fields[key].mask)
        }
      })
    }
  })

  if (validMasks.includes(mask)) {
    count++
  }
  console.log(count)
}

syncSolve(solve)
