const wds = require("eofol-dev-server").default
const open = require("open").default
const { getConfig } = require("../../compile")
const { getEnvHTTPS, getEnvHost, getEnvPort, getEnvHotReloadWait, getEnvOpen } = require("../../compile/config/env")

const config = getConfig()

const HTTPS = getEnvHTTPS()
const HOST = getEnvHost()
const PORT = getEnvPort()
const WAIT = getEnvHotReloadWait()
const OPEN = getEnvOpen()

const serveUrl = `${HTTPS ? "https" : "http"}://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`

// @TODO remove ./src
const serveOptions = {
  root: config.PATH.PATH_BUILD,
  watch: ["./build"],
  wait: WAIT,
  mount: ["./node_modules"],
  port: PORT,
  host: HOST,
  https: HTTPS,
}

const openPromise = () => (OPEN ? open(serveUrl) : new Promise())

const serve = () => {
  openPromise().then(() => {
    wds(serveOptions)
  })
}

module.exports = serve
