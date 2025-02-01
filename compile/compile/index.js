const copyPublicFiles = require("./copy-public-files")
const rootElementId = require("./root-element-id")
const internals = require("./internals")
const minifyHtml = require("./minify-html")
const minifyJs = require("./minify-js")
const errorOverlay = require("./error-overlay")
const template = require("./template")
const touchBuildDirs = require("./touch-build-dirs")

module.exports = {
  ...copyPublicFiles,
  rootElementId,
  ...internals,
  minifyHtml,
  minifyJs,
  errorOverlay,
  ...template,
  ...touchBuildDirs,
}
