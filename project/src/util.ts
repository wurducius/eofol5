// @TODO extract
const EOFOL_VERBOSITY_LEVEL = 3

const eofolLog = (levelName: string, level: number) => (msg: string) => {
  if (level === 0 || level >= EOFOL_VERBOSITY_LEVEL) {
    console.log(`Eofol${level ? ` ${level}` : ""}: ${msg}`)
  }
}
export const eofolInfo = eofolLog("info", 3)
export const eofolWarn = eofolLog("warning", 2)
export const eofolError = eofolLog("error", 1)
export const eofolFatal = eofolLog("fatal", 0)

export const mergeDeep = (...objects: object[]) => {
  const isObject = (obj: object) => obj && typeof obj === "object"

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      // @ts-ignore
      const pVal = prev[key]
      // @ts-ignore
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        // @ts-ignore
        prev[key] = oVal ?? pVal
      } else if (isObject(pVal) && isObject(oVal)) {
        // @ts-ignore
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        // @ts-ignore
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}
