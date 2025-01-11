const { getConfig } = require("../../src/config")
const { exists, mkdir, write, join } = require("../../src/util")
const config = getConfig()

const indexHtml = "<html><head><title>EOFOL5</title></head><body><div>TADA</div></body></html>"

const build = () => {
  const BUILD_PATH = config.PATH.PATH_BUILD
  if (!exists(BUILD_PATH)) {
    mkdir(BUILD_PATH)
  }
  write(join(BUILD_PATH, "index.html"), indexHtml)
}

module.exports = build
