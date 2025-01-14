const { readDirAsync } = require("../../src/util/fs")
const { getConfig } = require("../../src/config")
const buildWebpack = require("./build-webpack")
const { compileTemplates } = require("../../src/compile/template")
const { touchBuildDirs } = require("../../src/compile/touch-build-dirs")
const { copyPublicFiles } = require("../../src/compile/copy-public-files")

const config = getConfig()

const BUILD_PATH = config.PATH.PATH_BUILD
const PROJECT_PATH = config.PATH.PROJECT_PUBLIC

const build = () =>
  Promise.all([touchBuildDirs(BUILD_PATH), readDirAsync(PROJECT_PATH, { recursive: true })])
    .then((result) => {
      const publicDir = result[1]
      return Promise.all([
        compileTemplates(BUILD_PATH, PROJECT_PATH, publicDir),
        copyPublicFiles(BUILD_PATH, PROJECT_PATH, publicDir),
      ])
    })
    .then(buildWebpack)

module.exports = build
