const copyPublicFiles = require("./copy-public-files")
const internals = require("./internals")
const minifyHtml = require("./minify-html")
const minifyJs = require("./minify-js")
const template = require("./template")
const touchBuildDirs = require("./touch-build-dirs")

module.exports = {
  ...copyPublicFiles,
  ...internals,
  minifyHtml,
  minifyJs,
  ...template,
  ...touchBuildDirs,
}
