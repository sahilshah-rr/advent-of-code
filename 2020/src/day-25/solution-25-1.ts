import { readFile, syncSolve } from '../util'

const Subject = 7
const Modulo = 20201227

function hack (key: number): number {
  let val = 1
  let i = 0
  while (val !== key) {
    val *= Subject
    val = val % Modulo
    i += 1
  }
  return i
}

function encrypt (subject: number, loops: number): number {
  let val = 1
  for (let i = 0; i < loops; i++) {
    val *= subject
    val = val % Modulo
  }
  return val
}

async function solve (): Promise<void> {
  const [key1, key2] = (await readFile('src/day-25/input.txt')).split('\n').map(Number) as [number, number]
  const ls1 = hack(key1)
  const pk1 = encrypt(key2, ls1)
  console.log(pk1)
}

syncSolve(solve)
