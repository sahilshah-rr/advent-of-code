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
  const validTickets: Ticket[] = []
  let myTicket: Ticket = []
  const fieldMaybeMap = new Map<string, Set<number>>()
  const fieldMap = new Map<string, number>()

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

  tickets.forEach(ticket => {
    const invalid = ticket.some(value =>
      rules.every(rule =>
        rule.ranges.every(range => value < range.min || value > range.max)
      )
    )
    if (!invalid) {
      validTickets.push(ticket)
    }
  })

  const ticketLength = myTicket.length
  rules.forEach(rule => {
    for (let i = 0; i < ticketLength; i++) {
      const thisIsIt = validTickets.every(ticket => {
        const value = ticket[i] as number
        return rule.ranges.some(range => value >= range.min && value <= range.max)
      })
      if (thisIsIt) {
        const indices = fieldMaybeMap.get(rule.name)
        if (indices === undefined) {
          fieldMaybeMap.set(rule.name, new Set([i]))
        } else {
          indices.add(i)
        }
      }
    }
  })

  for (let i = 0; i < rules.length; i++) {
    let field = ''
    let index = -1
    fieldMaybeMap.forEach((indices, name) => {
      if (indices.size === 1) {
        field = name
        index = Array.from(indices)[0] as number
      }
    })
    fieldMap.set(field, index)
    fieldMaybeMap.delete(field)
    fieldMaybeMap.forEach((indices) => {
      indices.delete(index)
    })
  }

  const product = rules
    .filter(rule => rule.name.startsWith('departure'))
    .map(rule => myTicket[fieldMap.get(rule.name) as number] as number)
    .reduce((product, value) => { return product * value }, 1)

  console.log(product)
}

syncSolve(solve)
