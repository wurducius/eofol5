// eslint-disable-next-line no-unused-vars
const _pipe = (f: (x?: any) => any, g: (y?: any) => any) => (arg: any) => g(f(arg))
// eslint-disable-next-line no-unused-vars
export const pipe = (...fns: ((z?: any) => any)[]) => fns.reduce(_pipe)

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
