const { readDirAsync } = require("../../compile/util-compile/fs")
const { getConfig } = require("../../compile/config")
const buildWebpack = require("./build-webpack")
const { compileTemplates } = require("../../compile/compile/template")
const { touchBuildDirs } = require("../../compile/compile/touch-build-dirs")
const { copyPublicFiles } = require("../../compile/compile/copy-public-files")
const { mergeINTERNALS } = require("../../compile/compile/internals")

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
    .then((result) => {
      const views = result[0]
      mergeINTERNALS({ views })
      return buildWebpack(views)
    })

module.exports = build
