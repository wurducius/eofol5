const wds = require("eofol-dev-server").default
const open = require("open").default
const { getConfig } = require("../../src/config")

const config = getConfig()

const PROTOCOL = "https"
const HOST = "0.0.0.0"
const PORT = "3000"
const WAIT = 150
const OPEN = true

const serveUrl = `${PROTOCOL}://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`

// @TODO remove ./src
const serveOptions = {
  root: config.PATH.PATH_BUILD,
  watch: ["./build"],
  wait: WAIT,
  mount: ["./node_modules"],
  port: PORT,
  host: HOST,
  https: PROTOCOL === "https",
}

const openPromise = () => (OPEN ? open(serveUrl) : new Promise())

const serve = () => {
  openPromise().then(() => {
    wds(serveOptions)
  })
}

module.exports = serve
