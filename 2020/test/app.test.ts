const originalLog = console.log
let logOutput = [] as any[]

beforeAll(() => {
  console.log = (...data: any[]) => { logOutput.push(...data) }
})

afterAll(() => {
  console.log = originalLog
})

afterEach(() => {
  logOutput = []
})

test('hello world', async () => {
  await require('../src/app')
  expect(logOutput[0]).toEqual('Hello World!')
})
