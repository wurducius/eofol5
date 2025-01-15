const PLUGIN_NAME = "Eofol5 webpack plugin"

const PLUGIN_INTERNAL = {
  DEPENDENCIES: "assets/js/dependencies.js",
  EOFOL: "assets/js/eofol.js",
  RUNTIME: "assets/js/runtime.js",
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
