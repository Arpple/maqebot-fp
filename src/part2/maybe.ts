import { pipe } from "fp-ts/lib/pipeable"

type Just<T> = {
  readonly hasValue: true
  readonly value: T
}

type Nothing = {
  readonly hasValue: false
}

type Maybe<T> = Just<T> | Nothing

const just = (value) => ({
  hasValue: true,
  value
})

const nothing = () => ({
  hasValue: false
})

const map = (f) => (maybe) => {
  if (!maybe.hasValue)
    return nothing()

  return just(f(maybe.value))
}

const fold = (onNothing, onSome) => (maybe) => {
  if (!maybe.hasValue)
    return onNothing()

  return onSome(maybe.value)
}

const fromUndefined = (value) => {
  return value === undefined
    ? nothing()
    : just(value)
}

const ap = (maybe) => (maybeFn) => {
  if (maybeFn.hasValue)
    return map(maybeFn.value)(maybe)

  return nothing()
}

export const hello = (name) => `Hello ${name}`
export const mr = (name) => `Mr. ${name}`

const person = undefined

pipe(
  person,
  fromUndefined,
  map(mr),
  map(hello),
  fold(
    () => console.log("nothing here"),
    (msg) => console.log(msg)
  )
) // ?

const add = (x) => (y) => x + y

pipe(
  just(add),
  ap(just(3)),
  ap(nothing())
) // ?
