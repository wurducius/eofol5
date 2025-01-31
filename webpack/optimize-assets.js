const { addAsset, getAsset, PLUGIN_INTERNAL } = require("./plugin-utils")
const { read, join } = require("../src/util-compile/fs")
const minifyJs = require("../src/compile/minify-js")
const minifyHtml = require("../src/compile/minify-html")
const { getINTERNALS } = require("../src/compile/internals")
const replaceRootElementId = require("../src/compile/root-element-id")

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

  addAssetImpl(
    "assets/css/base.css",
    replaceRootElementId(read(join(process.cwd(), "resources", "styles", "base.css")).toString()),
    {},
  )
  addAssetImpl("assets/css/theme.css", read(join(process.cwd(), "resources", "styles", "theme.css")).toString(), {})
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
