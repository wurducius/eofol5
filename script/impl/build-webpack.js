const webpack = require("webpack")
const getWebpackConfig = require("../../webpack/webpack.config")
const { error, success } = require("@eofol/eofol-dev-utils")
const { getConfig } = require("../../src/config")

const config = getConfig()

const buildWebpack = (views) => {
  webpack(getWebpackConfig(views), (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(error(`Webpack error: ${err}`))
    } else {
      console.log(success(`Eofol5 project built at ${config.PATH.PATH_BUILD}`))
    }
  })
}

module.exports = buildWebpack
