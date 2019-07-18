import S from "sanctuary"

enum Direction {
  North = 0,
  East,
  South,
  West
}

type Bot = {
  readonly x: number
  readonly y: number
  readonly direction: Direction
}

type Command = (bot: Bot) => Bot

const rotateLeft = (bot: Bot): Bot => {
  return {
    ...bot,
    direction: (bot.direction + 1) % 4
  }
}

const rotateRight = (bot: Bot): Bot => {
  return {
    ...bot,
    direction: (3 + bot.direction) % 4
  }
}

const walk = (step: number) => (bot: Bot): Bot => {
  switch (bot.direction) {
    case Direction.North:
      return { ...bot, y: bot.y + step }
    case Direction.East:
      return { ...bot, x: bot.x + step }
    case Direction.South:
      return { ...bot, y: bot.y - step }
    case Direction.West:
      return { ...bot, x: bot.x - step }
  }
}

const back = (step: number) => walk(-step)

const nothing: Command = (bot) => bot

const mapCommand = (str: string) => {
  switch (str.slice(0, 1)) {
    case "L":
      return rotateLeft
    case "R":
      return rotateRight
    case "W":
      return walk(parseInt(str.slice(1), 10))
    case "B":
      return back(parseInt(str.slice(1), 10))

    default:
      return nothing
  }
}

const parseCommand = (input: string): Command[] => {
  const splited = input.match(/L|R|(W\d+)|(B\d+)/g)!
  return splited.map(mapCommand)
}

const result = (bot: Bot) => {
  return `x: ${bot.x}, y: ${bot.y}, dir: ${Direction[bot.direction]}`
}

const main = (input: string) => {
  const start: Bot = { x: 0, y: 0, direction: Direction.North }
  const commands = parseCommand(input)
  const final = S.pipe([...commands, result])(start)
  console.log(final)
}

main("LW15")
