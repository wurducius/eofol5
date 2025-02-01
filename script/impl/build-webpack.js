const webpack = require("webpack")
const getWebpackConfig = require("../../webpack/webpack.config")
const { error, success } = require("@eofol/eofol-dev-utils")
const { getConfig, EOFOL_NAME } = require("../../compile")

const config = getConfig()

const buildWebpack = (views) => {
  webpack(getWebpackConfig(views), (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(error(`Webpack error: ${err}`))
    } else {
      console.log(success(`${EOFOL_NAME} project built at ${config.PATH.PATH_BUILD}`))
    }
  })
}

module.exports = buildWebpack
