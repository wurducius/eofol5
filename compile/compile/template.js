const { eWriteAsyncFull, parse, eReadFull } = require("../util-compile")
const { head } = require("eofol-head")
const minifyHtml = require("./minify-html")
const { getConfig } = require("../config")
const getErrorOverlay = require("../../src/extract/error-overlay-compile")
const { injectRootId, injectDoctype } = require("../helper")
const defaultHeadData = require("./head-data-default")

const config = getConfig()

const baseStyles = injectRootId(eReadFull(config.PATH.RESOURCES_STYLES, `base${config.EXT.CSS}`))
const themeStyles = eReadFull(config.PATH.RESOURCES_STYLES, `theme${config.EXT.CSS}`)

const precompileTemplate = (buildPath, projectPath, stylesStatic) => async (viewName) => {
  const { injectedContent, errorOverlayStyles } = getErrorOverlay(
    injectRootId(eReadFull(projectPath, `${viewName}${config.EXT.HTML}`)),
  )
  const stylesImpl = await minifyHtml(
    [errorOverlayStyles, baseStyles, themeStyles, stylesStatic].filter(Boolean).join(" "),
  )
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

const compileTemplates = (buildPath, projectPath, publicDir) =>
  Promise.all(
    publicDir
      .filter((publicFile) => publicFile.endsWith(config.EXT.HTML))
      .map((publicView) => parse(publicView).name)
      .map(precompileTemplate(buildPath, projectPath)),
  )

module.exports = { compileTemplates }
