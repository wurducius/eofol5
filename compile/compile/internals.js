const getConfig = require("../config/config")
const { join, read, mergeDeep } = require("../util-compile")
const envDefault = require("../config/env-default")

let INTERNALS = {
  instances: {},
  vdom: { tree: [] },
  assets: {},
  env: {},
  views: {},
  config: {},
}

const config = getConfig()

const envContent = read(join(config.PATH.CWD, ".env")).toString()
const envParsed = envContent
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
const envImpl = mergeDeep(envDefault, envParsed)
INTERNALS.env = envImpl

const getINTERNALS = () => INTERNALS

const mergeINTERNALS = (nextInternals) => {
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

module.exports = { getINTERNALS, mergeINTERNALS }
