const { addAsset, getAsset, PLUGIN_INTERNAL } = require("./plugin-utils")
const { getINTERNALS, read, join, minifyHtml, minifyJs } = require("../compile")
const { getEnvEofolServiceWorkerFilename, getEnvEofolViewsPlaceholder } = require("../compile/config/env")

const isAssetView = (views, assetName) =>
  Object.values(views).filter((view) => `assets/js/${view}.js` === assetName).length > 0

const injectInternals = (assetName, source) => {
  const internals = getINTERNALS()
  let appendSource = ""
  if (isAssetView(internals.views, assetName)) {
    appendSource = `let INTERNALS = ${JSON.stringify(internals)}\n`
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

  const EOFOL_SERVICE_WORKER_FILENAME = getEnvEofolServiceWorkerFilename()

  const views = getINTERNALS().views
  addAssetImpl(
    EOFOL_SERVICE_WORKER_FILENAME,
    read(join(process.cwd(), "resources", "service-worker", EOFOL_SERVICE_WORKER_FILENAME))
      .toString()
      .replaceAll(
        getEnvEofolViewsPlaceholder(),
        Object.values(views)
          .map((view) => `${view}.html`)
          .join(", "),
      ),
    {},
  )
}

const optimizeAssets = async (compiler, compilation) => {
  addInternalAssets(compilation)
  return await Promise.all(
    Object.keys(compilation.assets).map(async (assetName) => {
      const asset = compilation.assets[assetName]
      if (!asset.info || !asset.info.optimized) {
        const source = asset.source()
        let nextSource = undefined
        if (assetName.endsWith(".js")) {
          nextSource = minifyJs(injectInternals(assetName, source))
        } else if (assetName.endsWith(".css")) {
          nextSource = await minifyHtml(source)
        } else if (assetName.endsWith(".html")) {
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
