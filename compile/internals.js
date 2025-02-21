const { mergeDeep } = require("./util-compile")
const envDefault = require("../resources/env/env-default")
const readEnv = require("./extract/env")

let INTERNALS = {
  instances: {},
  vdom: { tree: [] },
  assets: {},
  env: {},
  views: {},
  config: {},
}

INTERNALS.env = readEnv(envDefault)

const getINTERNALS = () => INTERNALS

const mergeINTERNALS = (nextInternals) => {
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

module.exports = { getINTERNALS, mergeINTERNALS }
