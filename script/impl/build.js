const { join, readDir } = require("../../src/util/fs")
const { getConfig } = require("../../src/config")
const buildWebpack = require("./build-webpack")
const { compileTemplates } = require("../../src/compile/template")
const { touchBuildDirs } = require("../../src/compile/touch-build-dirs")
const { copyPublicFiles } = require("../../src/compile/copy-public-files")

const config = getConfig()

const build = () => {
  const BUILD_PATH = config.PATH.PATH_BUILD
  const PROJECT_PATH = join(config.PATH.CWD, "project", "public")

  touchBuildDirs(BUILD_PATH)

  const publicDir = readDir(PROJECT_PATH, { recursive: true })
  compileTemplates(BUILD_PATH, PROJECT_PATH, publicDir).then(() => {
    copyPublicFiles(BUILD_PATH, PROJECT_PATH, publicDir)
    buildWebpack()
  })
}

module.exports = build
