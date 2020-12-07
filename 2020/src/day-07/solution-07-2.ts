import { readLines, syncSolve } from '../util'

interface Bag {
  color: string
  count: number
}

interface Rules {
  [prop: string]: Bag[]
}

async function parseRules (): Promise<Rules> {
  const rules: Rules = {}

  const bagFormat = /(?<count>\d+)?\s?(?<color>\w+ \w+) bags?/

  await readLines('src/day-07/input.txt', (line) => {
    if (line !== '') {
      const [container, components] = line.split(' contain ') as [string, string]
      const containerBag: Bag = {
        color: container.match(bagFormat)?.groups?.color as string,
        count: 1
      }
      for (const component of components.split(', ')) {
        const componentMatch = component.match(bagFormat)
        if (rules[containerBag.color] === undefined) {
          rules[containerBag.color] = [] as Bag[]
        }
        if (componentMatch !== undefined) {
          const componentBag: Bag = {
            color: componentMatch?.groups?.color as string,
            count: Number(componentMatch?.groups?.count as string)
          }
          if (componentBag.color !== 'no other') {
            rules[containerBag.color]?.push(componentBag)
          }
        }
      }
    }
  })

  return rules
}

async function solve (): Promise<void> {
  const rules = await parseRules()

  let count = 0
  const queue: Bag[] = [{ color: 'shiny gold', count: 1 }]
  while (queue.length > 0) {
    const bag = queue.shift() as Bag
    for (const component of rules[bag.color] as Bag[]) {
      count += component.count
      queue.push(...(Array<Bag>(component.count)).fill(component))
    }
  }
  console.log(count)
}

syncSolve(solve)
