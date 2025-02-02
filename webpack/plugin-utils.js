const { getEnvEofolName } = require("../compile/config/env")
const { getConfig } = require("../compile/config")

const config = getConfig()

const PLUGIN_NAME = `${getEnvEofolName()} webpack plugin`

const PLUGIN_INTERNAL = {
  DEPENDENCIES: `${config.FILENAME.DIRNAME_ASSETS}/${config.FILENAME.DIRNAME_JS}/dependencies.js`,
  EOFOL: `${config.FILENAME.DIRNAME_ASSETS}/${config.FILENAME.DIRNAME_JS}/eofol.js`,
  RUNTIME: `${config.FILENAME.DIRNAME_ASSETS}/${config.FILENAME.DIRNAME_JS}/runtime.js`,
}

const logInfo = (msg) => console.log(`${PLUGIN_NAME}: ${msg}`)

const getAsset = ({ asset, nextSource, nextSize, nextInfo }) => {
  const map = asset ? asset.map() : null

  return {
    source: () => nextSource,
    map: () => map,
    sourceAndMap: () => ({
      source: nextSource,
      map,
    }),
    size: () => nextSize,
    info: nextInfo,
  }
}

const addAsset = (compilation) => (name, content, info) => {
  compilation.assets[name] = getAsset({
    nextSize: content.length,
    nextInfo: info ?? {},
    nextSource: content,
  })
}

module.exports = { addAsset, getAsset, logInfo, PLUGIN_NAME, PLUGIN_INTERNAL }
