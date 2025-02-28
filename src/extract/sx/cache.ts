let sxCache: string[] = []

export const getSxCache = (className: string) => sxCache.includes(className)

export const appendSxCache = (className: string) => {
  sxCache.push(className)
}

export const resetSxCache = () => {
  sxCache = []
}
