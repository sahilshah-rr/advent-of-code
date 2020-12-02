import { createInterface } from 'readline'
import { createReadStream } from 'fs'
import { once } from 'events'

export async function readLines (
  filePath: string,
  processor: (line: string) => any
): Promise<void> {
  const rl = createInterface({
    input: createReadStream(filePath),
    crlfDelay: Infinity
  })
  rl.on('line', processor)
  await once(rl, 'close')
}

export async function readFile (filePath: string): Promise<string> {
  const lines = [] as string[]
  await readLines(filePath, (line) => lines.push(line))
  return lines.join('\n')
}

export default {
  readLines,
  readFile
}
