const { mergeDeep } = require("../util/obj")

let INTERNALS = {
  instances: {},
  vdom: { tree: [] },
  assets: {},
  env: {},
  views: {},
  config: {},
}

const getINTERNALS = () => INTERNALS

const mergeINTERNALS = (nextInternals) => {
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

module.exports = { getINTERNALS, mergeINTERNALS }
