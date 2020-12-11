import { readLines, syncSolve } from '../util'

const EMPTY = 'L'
const HUMAN = '#'

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, -1],
  [0, +1],
  [+1, -1],
  [+1, 0],
  [+1, +1]
]

function chartsEqual (chart1: string[][], chart2: string[][]): boolean {
  if (chart1.length !== chart2.length) {
    return false
  }
  for (let i = 0; i < chart1.length; i++) {
    const row1 = chart1[i] as string[]
    const row2 = chart2[i] as string[]
    if (row1.length !== row2.length) {
      return false
    }
    for (let j = 0; j < row1.length; j++) {
      if (row1[j] !== row2[j]) {
        return false
      }
    }
  }
  return true
}

function countChart (chart: string[][], val: string): number {
  let count = 0
  for (let i = 0; i < chart.length; i++) {
    const row = chart[i] as string[]
    for (let j = 0; j < row.length; j++) {
      if (row[j] === val) {
        count += 1
      }
    }
  }
  return count
}

function nextChart (chart: string[][]): string[][] {
  const newChart: string[][] = []
  for (let i = 0; i < chart.length; i++) {
    newChart.push([])
    const row = chart[i] as string[]
    for (let j = 0; j < row.length; j++) {
      let countHuman = 0
      for (const [x, y] of neighbors) {
        const newX = i + (x as number)
        const newY = j + (y as number)
        if (newX >= 0 && newX < chart.length && newY >= 0 && newY < row.length) {
          if ((chart[newX] as string[])[newY] as string === HUMAN) {
            countHuman += 1
          }
        }
      }
      const current = (chart[i] as string[])[j] as string
      switch (current) {
        case EMPTY:
          (newChart[i] as string[]).push(countHuman === 0 ? HUMAN : current)
          break
        case HUMAN:
          (newChart[i] as string[]).push(countHuman >= 4 ? EMPTY : current)
          break
        default:
          (newChart[i] as string[]).push(current)
      }
    }
  }
  return newChart
}

async function solve (): Promise<void> {
  const chart: string[][] = []
  await readLines('src/day-11/input.txt', (line) => {
    chart.push(line.split(''))
  })
  let curChart = chart
  let newChart = nextChart(curChart)
  while (!chartsEqual(curChart, newChart)) {
    curChart = newChart
    newChart = nextChart(curChart)
  }
  console.log(countChart(newChart, HUMAN))
}

syncSolve(solve)
