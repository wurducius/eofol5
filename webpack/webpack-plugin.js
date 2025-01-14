const { join, read } = require("../src/util/fs")
const minifyJs = require("../src/compile/minify-js")
const minifyHtml = require("../src/compile/minify-html")

const pluginName = "Eofol5 webpack plugin"

// eslint-disable-next-line no-unused-vars
const logInfo = (msg) => console.log(`${pluginName}: ${msg}`)

// eslint-disable-next-line no-unused-vars
const onInitCompilation = (compiler) => (compilation) => {
  /*
  compilation.hooks.processAssets.tapPromise(
    {
      name: pluginName,
      stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
    },
    async () => {
        return await processViews(compiler, compilation, instances)
    },
  )
   */
  //logInfo("onInitCompilation()")
}

// eslint-disable-next-line no-unused-vars
const onBuildStarted = (compilation) => {
  // lifecycle.onCompilationStart()
  // logInfo("onBuildStarted()")
}

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

// @TODO fix html minify await
const optimizeAssets = async (compiler, compilation) => {
  const addAssetImpl = addAsset(compilation)
  addAssetImpl("assets/js/eofol.js", "console.log('EOFOL RUNTIME CODE!!!')", {})
  addAssetImpl("assets/css/base.css", read(join(process.cwd(), "src", "resources", "base.css")).toString(), {})
  addAssetImpl("assets/css/theme.css", read(join(process.cwd(), "src", "resources", "theme.css")).toString(), {})

  return await Promise.all(
    Object.keys(compilation.assets).map(async (assetName) => {
      const asset = compilation.assets[assetName]
      if (!asset.info || !asset.info.optimized) {
        const source = asset.source()

        let nextSource = undefined
        if (assetName.endsWith(".js")) {
          nextSource = minifyJs(source)
        } else if (assetName.endsWith(".html")) {
          nextSource = await minifyHtml(source)
        }

        if (nextSource) {
          compilation.assets[assetName] = getAsset({
            asset,
            nextSource,
            nextInfo: { ...asset.info, optimized: true },
            nextSize: nextSource.length,
          })
        }
      }
    }),
  )
}

// eslint-disable-next-line no-unused-vars
const onCompilationFinished = (compiler) => (compilation) => {
  // logInfo("onCompilationFinished()")

  compilation.hooks.processAssets.tapPromise(
    {
      name: pluginName,
      //   stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
      additionalAssets: true,
    },
    async (compiler) => {
      return await optimizeAssets(compiler, compilation)
    },
  )
}

// eslint-disable-next-line no-unused-vars
const onAfterCompile = (compiler) => (compilation) => {
  //  lifecycle.onCompilationFinished()
  //logInfo("onAfterCompile()")
}

class EofolCompilerWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, onBuildStarted)
    compiler.hooks.compilation.tap(pluginName, onCompilationFinished(compiler))
    compiler.hooks.thisCompilation.tap(pluginName, onInitCompilation(compiler))
    compiler.hooks.afterCompile.tap(pluginName, onAfterCompile(compiler))
  }
}

module.exports = EofolCompilerWebpackPlugin
