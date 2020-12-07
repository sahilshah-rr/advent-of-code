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
        if (componentMatch !== undefined) {
          const componentBag: Bag = {
            color: componentMatch?.groups?.color as string,
            count: Number(componentMatch?.groups?.count as string)
          }
          if (rules[componentBag.color] !== undefined) {
            rules[componentBag.color]?.push(containerBag)
          } else {
            rules[componentBag.color] = [containerBag]
          }
        }
      }
    }
  })

  return rules
}

async function solve (): Promise<void> {
  const rules = await parseRules()
  const colors = new Set<string>()
  const queue: Bag[] = rules['shiny gold'] as Bag[]
  while (queue.length > 0) {
    const bag = queue.shift() as Bag
    if (!(bag.color in colors)) {
      colors.add(bag.color)
      if (rules[bag.color] !== undefined) {
        queue.push(...rules[bag.color] as Bag[])
      }
    }
  }
  console.log(colors.size)
}

syncSolve(solve)
