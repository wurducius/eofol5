const copyPublicFiles = require("./copy-public-files")
const minifyHtml = require("./minify-html")
const minifyJs = require("./minify-js")
const template = require("./template")
const touchBuildDirs = require("./touch-build-dirs")
const singleton = require("./singleton")
const ssx = require("./ssx")
const env = require("./env")
const htmlParser = require("./parser-html")
const jsxCompiler = require("./jsx-compiler")
const errorOverlayCompile = require("./error-overlay-compile")

module.exports = {
  ...copyPublicFiles,
  minifyHtml,
  minifyJs,
  ...template,
  ...touchBuildDirs,
  ...singleton,
  ...ssx,
  env,
  htmlParser,
  ...jsxCompiler,
  errorOverlayCompile,
}
