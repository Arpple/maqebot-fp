/* ts-lint: disable */

enum Direction {
  North = 0,
  East,
  South,
  West
}

interface IReporter {
  readonly print: (str: string) => void
}

type Bot = {
  _x: number
  _y: number
  _direction: Direction
  readonly rotateLeft: () => void
  readonly rotateRight: () => void
  readonly walk: (step: number) => void
  readonly report: (reporter: IReporter) => void
}

const createBot = (x: number, y: number, dir: Direction): Bot => {
  let _x = x
  let _y = y
  let _direction = dir

  return {
    _x,
    _y,
    _direction,
    rotateLeft: () => { _direction = _direction - 1 },
    rotateRight: () => { _direction = _direction + 1 },
    walk: (step) => { },
    report: (reporter) => {
      reporter.print(`x: ${_x}, y: ${_y}, dir: ${Direction[_direction]}`)
    }
  }
}
