const pluginName = "Eofol5 webpack plugin"

const logInfo = (msg) => console.log(`${pluginName}: ${msg}`)

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
  //logInfo("onBuildStarted()")
}

const onCompilationFinished = (compiler) => (compilation) => {
  /*
  compilation.hooks.processAssets.tapPromise(
    {
      name: pluginName,
      stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
      additionalAssets: true,
    },
  optimizeAssets(compiler, compilation, instances),
  )
   */
  //logInfo("onCompilationFinished()")
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
