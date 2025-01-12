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
  //  logInfo("onInitCompilation()")
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

const optimizeAssets = (compiler, compilation) => {
  const addAssetImpl = addAsset(compilation)
  addAssetImpl("assets/js/eofol.js", "console.log('EOFOL RUNTIME CODE!!!')", {})
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
      optimizeAssets(compiler, compilation)
    },
  )
}

// eslint-disable-next-line no-unused-vars
const onAfterCompile = (compiler) => (compilation) => {
  //  lifecycle.onCompilationFinished()
  // logInfo("onAfterCompile()")
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
