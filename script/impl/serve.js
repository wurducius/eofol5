const wds = require("eofol-dev-server").default
const { getConfig } = require("../../src/config")

const config = getConfig()

const serveOptions = { root: config.PATH.PATH_BUILD }

const serve = () => {
  wds(serveOptions)
}

module.exports = serve
