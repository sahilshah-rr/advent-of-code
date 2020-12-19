import { readGroups, syncSolve } from '../util'

function simplifyRule (rules: Map<string, string>, id: string): string {
  const jaRule = rules.get(id) as string
  if (/\d/.test(jaRule)) {
    let newRule = ''
    for (const c of jaRule.split(' ')) {
      if (c === '|') {
        newRule += '|'
      } else {
        newRule += `(${simplifyRule(rules, c)})`
      }
    }
    return newRule
  } else {
    return jaRule[1] as string
  }
}

async function solve (): Promise<void> {
  const rules: Map<string, string> = new Map()
  let i = 0
  let count = 0
  await readGroups('src/day-19/input.txt', group => {
    if (i === 0) {
      group.forEach(line => {
        const [id, rule] = line.split(': ') as [string, string]
        rules.set(id, rule)
      })
      i++
    } else {
      const regexp = new RegExp(`^${simplifyRule(rules, '0')}$`)
      group.forEach(line => {
        if (regexp.test(line)) {
          count += 1
        }
      })
    }
  })
  console.log(count)
}

syncSolve(solve)
