import { readGroups, syncSolve } from '../util'

const RuleRegexp = /^(?<name>.+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)$/

interface Range {
  min: number
  max: number
}

interface Rule {
  name: string
  ranges: Range[]
}

type Ticket = number[]

function parseTicket (line: string): Ticket {
  return line.split(',').map((v) => Number(v))
}

function parseRule (line: string): Rule {
  const parts = line.match(RuleRegexp)?.groups as { [prop: string]: string }
  return {
    name: parts.name as string,
    ranges: [
      { min: Number(parts.min1), max: Number(parts.max1) },
      { min: Number(parts.min2), max: Number(parts.max2) }
    ]
  }
}

async function solve (): Promise<void> {
  const rules: Rule[] = []
  const tickets: Ticket[] = []
  let myTicket: Ticket = []
  let i = 0
  await readGroups('src/day-16/input.txt', (group) => {
    switch (i) {
      case 0:
        group.forEach(line => rules.push(parseRule(line)))
        break
      case 1:
        myTicket = parseTicket(group[1] as string)
        break
      case 2:
        group.slice(1).forEach(line => tickets.push(parseTicket(line)))
    }
    i++
  })
  console.log(myTicket)
  let errorRate = 0
  tickets.forEach(ticket => {
    ticket.forEach(value => {
      const invalid = rules.every(rule =>
        rule.ranges.every(range => value < range.min || value > range.max)
      )
      if (invalid) {
        errorRate += value
      }
    })
  })
  console.log(errorRate)
}

syncSolve(solve)
