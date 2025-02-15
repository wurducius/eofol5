const { eWriteAsyncFull, parse, eReadFull } = require("../util-compile")
const { head } = require("eofol-head")
const minifyHtml = require("./minify-html")
const { getConfig } = require("../config")
const getErrorOverlay = require("../../src/extract/error-overlay/error-overlay-compile")
const { injectRootId, injectDoctype } = require("../helper")
const defaultHeadData = require("../../resources/head/head-data-default")
const { staticStylesInit } = require("../styles")

const config = getConfig()

const precompileTemplate = (buildPath, projectPath, stylesStatic) => async (viewName) => {
  const { injectedContent, errorOverlayStyles } = getErrorOverlay(
    injectRootId(eReadFull(projectPath, `${viewName}${config.EXT.HTML}`)),
  )
  const stylesImpl = await minifyHtml([errorOverlayStyles, stylesStatic].filter(Boolean).join(" "))
  const compiled = await head(
    defaultHeadData,
    injectedContent,
    [viewName, config.FILENAME.RUNTIME, config.FILENAME.EOFOL, config.FILENAME.DEPENDENCIES],
    [],
    stylesImpl,
  )
  // @TODO avoid minifying twice
  const minified = await minifyHtml(compiled)
  await eWriteAsyncFull(injectDoctype(minified), buildPath, `${viewName}${config.EXT.HTML}`)
  return viewName
}

// @TODO in case index.html is not present, add empty file
const compileTemplates = (buildPath, projectPath, publicDir) => {
  const precompiledStyles = staticStylesInit()
  return Promise.all(
    publicDir
      .filter((publicFile) => publicFile.endsWith(config.EXT.HTML))
      .map((publicView) => parse(publicView).name)
      .map(precompileTemplate(buildPath, projectPath, precompiledStyles)),
  )
}

module.exports = { compileTemplates }
