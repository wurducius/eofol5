const { spawnSync } = require("node:child_process")
const { exists, mkdir, cp, join } = require("../../src/util/fs")
const { spawnOptions } = require("../../src/util/spawn")
const { getConfig } = require("../../src/config")

const config = getConfig()

const build = () => {
  const BUILD_PATH = config.PATH.PATH_BUILD
  if (!exists(BUILD_PATH)) {
    mkdir(BUILD_PATH)
    mkdir(join(BUILD_PATH, "assets"))
    mkdir(join(BUILD_PATH, "assets", "js"))
    mkdir(join(BUILD_PATH, "assets", "css"))
    mkdir(join(BUILD_PATH, "assets", "media"))
    mkdir(join(BUILD_PATH, "assets", "media", "fonts"))
    mkdir(join(BUILD_PATH, "assets", "media", "images"))
    mkdir(join(BUILD_PATH, "assets", "media", "icons"))
  }

  cp(join(config.PATH.CWD, "project", "public"), join(config.PATH.PATH_BUILD), { recursive: true })

  spawnSync("tsc", ["-outDir", "./build/assets/js"], spawnOptions)

  // compile()
}

module.exports = build
