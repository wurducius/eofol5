const _pipe = (f, g) => (arg) => g(f(arg))
export const pipe = (...fns) => fns.reduce(_pipe)

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const arrayCombinator = (handler) => (data) => {
  if (Array.isArray(data)) {
    return data.map(handler)
  } else if (data === undefined) {
    return undefined
  } else {
    return handler(data)
  }
}
