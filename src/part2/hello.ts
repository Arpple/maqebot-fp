import { pipe } from "fp-ts/lib/pipeable";

const hello = (name) => `Hello ${name}`
const mr = (name) => `Mr. ${name}`

hello(mr("Anderson"))

pipe(
  "Anderson",
  mr,
  hello
)
