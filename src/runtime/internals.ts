interface Internals {
  instances: Record<string, any>
  vdom: Record<string, any>
  assets: Record<string, any>
  env: Record<string, any>
  views: Record<string, any>
  config: Record<string, any>
}

const EOFOL_INTERNALS: Internals = {
  instances: {},
  vdom: {},
  assets: {},
  env: {},
  views: {},
  config: {},
}

EOFOL_INTERNALS.views["index"] = { name: "index" }
EOFOL_INTERNALS.instances["123456781"] = {}

module.exports = { EOFOL_INTERNALS }
