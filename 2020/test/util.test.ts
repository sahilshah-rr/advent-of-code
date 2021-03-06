import util from '../src/util'

describe('readLines', () => {
  test('accepts project-root relative path', async () => {
    await expect(util.readLines('test/input.txt', () => {}))
      .resolves.toBeUndefined()
  })

  test('accepts absolute path', async () => {
    await expect(util.readLines(`${__dirname}/input.txt`, () => {}))
      .resolves.toBeUndefined()
  })

  test('reads one line at a time', async () => {
    const lines = ['This', 'is', 'a', '', 'sample input', 'file', '']
    let index = 0
    await util.readLines('test/input.txt', (line) => {
      expect(line).toEqual(lines[index++])
    })
    expect(index).toEqual(lines.length - 1)
  })
})

describe('readFile', () => {
  test('accepts project-root relative path', async () => {
    await expect(util.readFile('test/input.txt'))
      .resolves.toMatch('sample input')
  })

  test('accepts absolute path', async () => {
    await expect(util.readFile(`${__dirname}/input.txt`))
      .resolves.toMatch('sample input')
  })

  test('reads the entire file', async () => {
    const fileContents = 'This\nis\na\n\nsample input\nfile'
    await expect(util.readFile('test/input.txt'))
      .resolves.toMatch(fileContents)
  })
})

describe('readGroups', () => {
  test('accepts project-root relative path', async () => {
    await expect(util.readGroups('test/input.txt', () => {}))
      .resolves.toBeUndefined()
  })

  test('accepts absolute path', async () => {
    await expect(util.readGroups(`${__dirname}/input.txt`, () => {}))
      .resolves.toBeUndefined()
  })

  test('reads empty-line-separated groups of lines', async () => {
    const groups = [['This', 'is', 'a'], ['sample input', 'file']]
    let index = 0
    await util.readGroups('test/input.txt', (group) => {
      expect(group).toEqual(groups[index++])
    })
    expect(index).toEqual(groups.length)
  })
})

describe('syncSolve', () => {
  test('runs the given async solve function', () => {
    let flag = false
    async function solve (): Promise<void> {
      flag = true
    }
    util.syncSolve(solve)
    expect(flag).toEqual(true)
  })
})
