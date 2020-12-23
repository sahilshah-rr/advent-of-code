import { readFile, syncSolve } from '../util'

interface Node {
  val: number
  next?: Node
  prev?: Node
}

class CList {
  current: Node
  min: Node
  max: Node
  size: number

  constructor (arr: number[]) {
    const first: Node = { val: arr[0] as number }
    this.current = first
    this.min = first
    this.max = first
    this.size = 1
    arr.slice(1).forEach(a => {
      this.current.next = { val: a, prev: this.current }
      this.current = this.current.next
      this.size += 1
      if (a < this.min.val) { this.min = this.current }
      if (a > this.max.val) { this.max = this.current }
    })
    this.current.next = first
    first.prev = this.current
    this.current = first
  }

  popNext (): Node | undefined {
    let popped
    if (this.size > 1) {
      popped = this.current.next as Node
      this.current.next = popped.next as Node
      this.current.next.prev = this.current
      popped.next = undefined
      popped.prev = undefined
      this.size -= 1
      if (this.min === popped) { this.setMin() }
      if (this.max === popped) { this.setMax() }
    }
    return popped
  }

  pushNext (pushed: Node, ptr?: Node): void {
    if (ptr === undefined) {
      ptr = this.current
    }
    pushed.prev = ptr
    pushed.next = ptr.next as Node
    ptr.next = pushed
    pushed.next.prev = pushed
    this.size += 1
    if (pushed.val < this.min.val) { this.min = pushed }
    if (pushed.val > this.max.val) { this.max = pushed }
  }

  advance (): void {
    this.current = this.current.next as Node
  }

  findNext (): Node {
    let lessMax: Node
    if (this.current === this.min) {
      lessMax = this.max
    } else {
      lessMax = this.min
      this.loopOnce(cur => {
        if (cur.val < this.current.val && cur.val > lessMax.val) {
          lessMax = cur
        }
      })
    }
    return lessMax
  }

  minAll (): number[] {
    const nums: number[] = []
    this.loopOnce(cur => { nums.push(cur.val) }, this.min)
    return nums
  }

  private setMin (): void {
    this.min = this.current
    this.loopOnce(cur => { if (cur.val < this.min.val) { this.min = cur } })
  }

  private setMax (): void {
    this.max = this.current
    this.loopOnce(cur => { if (cur.val > this.max.val) { this.max = cur } })
  }

  private loopOnce (f: (node: Node) => void, ptr?: Node): void {
    if (ptr === undefined) {
      ptr = this.current
    }
    let cur = ptr
    do {
      f(cur)
      cur = cur.next as Node
    } while (cur !== ptr)
  }
}

async function solve (): Promise<void> {
  const cups = (await readFile('src/day-23/input.txt')).split('').map(Number)
  const clist = new CList(cups)

  for (let i = 0; i < 100; i++) {
    const hand = [1, 2, 3].map(_ => clist.popNext() as Node)
    let destination = clist.findNext()
    hand.forEach(cup => {
      clist.pushNext(cup, destination)
      destination = cup
    })
    clist.advance()
  }

  console.log(clist.minAll().slice(1).join(''))
}

syncSolve(solve)
