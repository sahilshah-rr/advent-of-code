import { readLines, syncSolve } from '../util'

const FoodRegexp = /^(?<ingredients>(\w+\s)+)\(contains\s(?<allergens>(\w+(, )?)+)\)$/

async function solve (): Promise<void> {
  const aI = new Map<string, string[]>()
  await readLines('src/day-21/input.txt', line => {
    const { ingredients, allergens } = line.match(FoodRegexp)?.groups as { ingredients: string, allergens: string }
    const ings = ingredients.trim().split(' ')

    // Index allergens to possible ingredients
    allergens.split(', ').forEach(a => {
      let set = aI.get(a)
      if (set === undefined) {
        set = ings
      }
      set = set.filter(i => ings.includes(i))
      aI.set(a, set)
    })
  })

  // Map allergens to exactly one ingredient
  const iA = new Map<string, string>()
  while (iA.size < aI.size) {
    aI.forEach((ings, a) => {
      if (ings.length === 1) {
        iA.set(ings[0] as string, a)
      } else {
        aI.set(a, ings.filter(i => !iA.has(i)))
      }
    })
  }

  const dL = [...iA.entries()]
    .sort(([_, a1], [__, a2]) => a1 < a2 ? -1 : 1)
    .map(([i, _]) => i)
    .join(',')

  console.log(dL)
}

syncSolve(solve)
