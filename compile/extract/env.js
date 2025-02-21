const { eRead } = require("../util-compile/e-fs")
const { mergeDeep } = require("../util-compile/obj")

const readEnv = (envDefault) => {
  const envParsed = eRead(".env")
    .replaceAll("\r", "")
    .split("\n")
    .map((line) => {
      const splitLine = line.split("=")
      if (
        splitLine &&
        splitLine.length === 2 &&
        splitLine[0] !== undefined &&
        splitLine[0] !== "" &&
        splitLine[1] !== undefined &&
        splitLine[1] !== ""
      ) {
        return { name: splitLine[0], value: splitLine[1] }
      } else {
        return undefined
      }
    })
    .filter(Boolean)
    .reduce((acc, next) => ({ ...acc, [next.name]: next.value }), {})
  return mergeDeep(envDefault, envParsed)
}

module.exports = readEnv
