import { pipe } from "fp-ts/lib/pipeable"

type Fail<E> = {
  readonly isError: true,
  readonly error: E
}

type Success<T> = {
  readonly isError: false,
  readonly value: T
}

export type Either<E, T> = Fail<E> | Success<T>

const success = (value) => ({
  isError: false,
  value
})

const error = (reason) => ({
  isError: true,
  error: reason
})

const map = (f) => (either) => {
  if (either.isError)
    return error(either.error)

  return success(f(either.value))
}

const fold = (onError, onSuccess) => (either) => {
  if (either.isError)
    return onError(either.error)

  return onSuccess(either.value)
}

const chain = (f) => (either) => {
  if (either.isError)
    return error(either.error)

  return f(either.value)
}

const hello = (name: string) =>
  name.includes("bad")
    ? error("cannot hello bad guy")
    : success(`Hello ${name}`)

const mr = (name) =>
  name.includes("girl")
    ? error("not a mr")
    : success(`Mr. ${name}`)


const person = success("bad guy")

pipe(
  person,
  chain(mr),
  chain(hello),
  fold(
    (reason) => console.error(reason),
    console.log
  )
) // ?
