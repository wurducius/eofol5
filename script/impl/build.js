const {
  readDirAsync,
  getConfig,
  compileTemplates,
  touchBuildDirs,
  copyPublicFiles,
  mergeINTERNALS,
} = require("../../compile")
const buildWebpack = require("./build-webpack")
const { compileViewsJsx } = require("../../src/extract/jsx-compiler/jsx")

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
      compileViewsJsx(views)
      return buildWebpack(views)
    })

module.exports = build
