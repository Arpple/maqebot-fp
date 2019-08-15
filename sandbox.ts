import S from "sanctuary"

enum Direction {
  North,
  East,
  South,
  West
}

const directionCount = 4

type Bot = {
  readonly x: number
  readonly y: number
  readonly direction: Direction
}

type Command = (bot: Bot) => Bot

const print = (bot: Bot) =>
  `x: ${bot.x}, y: ${bot.y}, dir: ${Direction[bot.direction]}`

const turnRight = (bot: Bot): Bot => ({
  ...bot,
  direction: (bot.direction + 1) % directionCount
})

const turnLeft = (bot: Bot): Bot => ({
  ...bot,
  direction: (bot.direction + 3) % directionCount
})

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

    default:
      // error!
      return bot
  }
}

const back = (step: number) => walk(-step)

const nothing: Command = (bot) => bot

const mapCommand = (str: string) => {
  switch (str.slice(0, 1)) {
    case "L":
      return turnLeft

    case "R":
      return turnRight

    case "W":
      return walk(parseInt(str.slice(1), 10))

    case "B":
      return back(parseInt(str.slice(1), 10))

    default:
      return nothing
  }
}

const double = (command: Command): Command => (bot: Bot) =>
  command(command(bot))

const logBefore = (name: string, command: Command): Command => (bot: Bot) => {
  console.log(`before ${name} = `, print(bot))
  return command(bot)
}

const parseCommand = (input: string): Command[] => {
  const splited = input.match(/L|R|(W\d+)|(B\d+)/g)!
  return splited.map(mapCommand)
}

const warp = (x: number, y: number) => (bot: Bot): Bot =>
  ({ x, y, direction: bot.direction })

const start: Bot = {
  x: 0, y: 0,
  direction: Direction.North
}

const reset: Command = (bot) => start

const main = (input: string) => {
  // const command = parseCommand(input)
  const execute = S.pipe([
    logBefore("R", turnRight),
    logBefore("double W1", double(walk(1))),
    reset,
    print
  ])

  execute(start) // ?
}

main("")
