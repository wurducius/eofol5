const { addAsset, getAsset, PLUGIN_INTERNAL } = require("./plugin-utils")
const { read, join } = require("../compile/util-compile/fs")
const minifyJs = require("../compile/compile/minify-js")
const minifyHtml = require("../compile/compile/minify-html")
const { getINTERNALS } = require("../compile/compile/internals")

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

  // @TODO extract @VIEWS@ constant and add VIEWS
  addAssetImpl(
    "service-worker.js",
    read(join(process.cwd(), "resources", "service-worker", "service-worker.js"))
      .toString()
      .replaceAll("@VIEWS@", "index.html"),
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
