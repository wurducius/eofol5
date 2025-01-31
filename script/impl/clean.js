const rimraf = require("rimraf")
const { getConfig } = require("../../compile/config")

const config = getConfig()

const clean = () => {
  rimraf.rimrafSync(config.PATH.PATH_BUILD)
}

module.exports = clean
