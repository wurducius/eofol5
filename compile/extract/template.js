const { eWriteAsyncFull, parse, eReadFull } = require("../util-compile")
const { head } = require("eofol-head")
const minifyHtml = require("./minify-html")
const { getConfig } = require("../config")
const getErrorOverlay = require("./error-overlay-compile")
const defaultHeadData = require("../../resources/head/head-data-default")
const staticStylesInit = require("../styles/static-styles-init")
const { injectDoctype, injectRootId } = require("../inject")
const { getEnvEofolRootElementId } = require("../config/env")

const config = getConfig()

const VIEW_INDEX_NAME = "index"
const TEMPLATE_AUTO_INJECTED_VIEWS = [VIEW_INDEX_NAME]
const TEMPLATE_VIEW_EMPTY = `<div id="${getEnvEofolRootElementId()}"></div>`

const precompileTemplate = (buildPath, projectPath) => async (viewItem) => {
  const viewName = viewItem.name
  const { injectedContent, errorOverlayStyles } = getErrorOverlay(
    viewItem.empty ? TEMPLATE_VIEW_EMPTY : injectRootId(eReadFull(projectPath, `${viewName}${config.EXT.HTML}`)),
  )
  const stylesImpl = await minifyHtml([errorOverlayStyles, staticStylesInit()].filter(Boolean).join(" "))
  const compiled = await head(
    defaultHeadData,
    injectedContent,
    [viewName, config.FILENAME.RUNTIME, config.FILENAME.EOFOL, config.FILENAME.DEPENDENCIES],
    [],
    stylesImpl,
  )
  const result = injectDoctype(compiled)
  await eWriteAsyncFull(result, buildPath, `${viewName}${config.EXT.HTML}`)
  return viewName
}

const compileTemplates = (buildPath, projectPath, publicDir) => {
  const views = publicDir
    .filter((publicFile) => publicFile.endsWith(config.EXT.HTML))
    .map((publicView) => ({ name: parse(publicView).name }))
  TEMPLATE_AUTO_INJECTED_VIEWS.forEach((injectedView) => {
    if (!views.includes(injectedView)) {
      views.push({ name: injectedView, empty: true })
    }
  })
  return Promise.all(views.map(precompileTemplate(buildPath, projectPath)))
}

module.exports = { compileTemplates }
