const { addAsset, getAsset, PLUGIN_INTERNAL } = require("./plugin-utils")
const { getINTERNALS, minifyHtml, minifyJs } = require("../compile")
const { getEnvEofolServiceWorkerFilename, getEnvServiceWorker } = require("../compile/config/env")
const { getConfig } = require("../compile/config")
const { eReadFull } = require("../compile/util-compile/e-fs")
const { injectViews, injectInternals } = require("../compile/helper/inject")

const config = getConfig()

const isAssetView = (views, assetName) =>
  Object.values(views).filter(
    (view) => `${config.PATH.DIRNAME_ASSETS}/${config.PATH.DIRNAME_JS}/${view}${config.EXT.JS}` === assetName,
  ).length > 0

const injectInternalsImpl = (assetName, source) => {
  const internals = getINTERNALS()
  let appendSource = ""
  if (isAssetView(internals.views, assetName)) {
    appendSource = injectInternals(JSON.stringify(internals))
  }
  return `${appendSource}${source}`
}

const addInternalAssets = (compilation) => {
  const addAssetImpl = addAsset(compilation)

  addAssetImpl(PLUGIN_INTERNAL.EOFOL, "", {})
  // Touch assets/js/dependencies.js in case no views are importing external dependencies
  // @TODO Move somewhere else i guess
  if (!compilation.assets[PLUGIN_INTERNAL.DEPENDENCIES]) {
    addAssetImpl(PLUGIN_INTERNAL.DEPENDENCIES, "", {})
  }

  if (getEnvServiceWorker()) {
    const EOFOL_SERVICE_WORKER_FILENAME = getEnvEofolServiceWorkerFilename()
    addAssetImpl(
      EOFOL_SERVICE_WORKER_FILENAME,
      injectViews(
        Object.values(getINTERNALS().views)
          .map((view) => `${view}${config.EXT.HTML}`)
          .join(", "),
      )(eReadFull(config.PATH.RESOURCES_SERVICEWORKER, EOFOL_SERVICE_WORKER_FILENAME)),
      {},
    )
  }
}

const optimizeAssets = async (compiler, compilation) => {
  addInternalAssets(compilation)
  return await Promise.all(
    Object.keys(compilation.assets).map(async (assetName) => {
      const asset = compilation.assets[assetName]
      if (!asset.info || !asset.info.optimized) {
        const source = asset.source()
        let nextSource = undefined
        if (assetName.endsWith(config.EXT.JS)) {
          nextSource = minifyJs(injectInternalsImpl(assetName, source))
        } else if (assetName.endsWith(config.EXT.CSS)) {
          nextSource = await minifyHtml(source)
        } else if (assetName.endsWith(config.EXT.HTML)) {
          nextSource = await minifyHtml(source)
        }

        if (nextSource) {
          compilation.assets[assetName] = getAsset({
            nextSource,
            nextInfo: { ...asset.info, optimized: true },
            nextSize: nextSource.length,
          })
        }
      }
    }),
  )
}

module.exports = optimizeAssets
