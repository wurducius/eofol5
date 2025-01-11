const wds = require("eofol-dev-server").default
const open = require("open").default
const { getConfig } = require("../../src/config")

const config = getConfig()

const PROTOCOL = "https"
const HOST = "localhost"
const PORT = "3000"

const serveUrl = `${PROTOCOL}://${HOST}:${PORT}`

const serveOptions = { root: config.PATH.PATH_BUILD, port: PORT, host: HOST, https: PROTOCOL === "https" }

const serve = () => {
  open(serveUrl).then(() => {
    wds(serveOptions)
  })
}

module.exports = serve
