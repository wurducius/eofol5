const { getConfig } = require("../config")
const parseHtml = require("./parser-html")
const { getEnvEofolRootElementId } = require("../config/env")
const { eReadFull } = require("../util-compile")
const { injectEofolName, injectRootId } = require("../inject")

const config = getConfig()

const errorOverlayHtml = injectEofolName(
  eReadFull(config.PATH.RESOURCES_ERROROVERLAY, `error-overlay${config.EXT.HTML}`),
)

const errorOverlayStyles = injectRootId(eReadFull(config.PATH.RESOURCES_ERROROVERLAY, `error-overlay${config.EXT.CSS}`))

const getErrorOverlay = (content) => {
  const parsed = parseHtml(content)
  const rootElement = parsed.getElementById(getEnvEofolRootElementId())
  if (rootElement) {
    rootElement.innerHTML = rootElement.innerHTML + errorOverlayHtml
  }
  const injectedContent = parsed.toString()
  return { injectedContent, errorOverlayStyles }
}

module.exports = getErrorOverlay
