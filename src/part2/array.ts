const map = (f) => (array) => {
  return array.map(f)
}

const arr = [1, 2, 3]
const up = (x) => x + 1

map(up)(arr) // ?

const f = map(up)

up(1)
up(2)

f(arr)
f([3, 4, 5])
