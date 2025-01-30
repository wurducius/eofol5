const _pipe = (f: Function, g: Function) => (arg: any) => g(f(arg))
export const pipe = (...fns: Function[]) => fns.reduce(_pipe)

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

// eslint-disable-next-line no-unused-vars
export function arrayCombinator<T>(handler: (t: T) => any) {
  return function (data: T | T[] | undefined) {
    if (Array.isArray(data)) {
      return data.map(handler)
    } else if (data === undefined) {
      return undefined
    } else {
      return handler(data)
    }
  }
}
