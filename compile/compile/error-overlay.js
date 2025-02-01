const getConfig = require("../config/config")
const { read, join } = require("../util-compile")
const HTMLParser = require("node-html-parser")
const replaceRootElementId = require("./root-element-id")
const { getEnvEofolName, getEnvEofolNamePlaceholder, getEnvEofolRootElementId } = require("../config/env")

const config = getConfig()

const errorOverlayHtml = read(join(config.PATH.RESOURCES_ERROROVERLAY, `error-overlay${config.EXT.HTML}`))
  .toString()
  .replaceAll(getEnvEofolNamePlaceholder(), getEnvEofolName())

const errorOverlayStyles = replaceRootElementId(
  read(join(config.PATH.RESOURCES_ERROROVERLAY, `error-overlay${config.EXT.CSS}`)).toString(),
)

const getErrorOverlay = (content) => {
  const parsed = HTMLParser.parse(content.toString())
  const rootElement = parsed.getElementById(getEnvEofolRootElementId())
  if (rootElement) {
    rootElement.innerHTML = rootElement.innerHTML + errorOverlayHtml
  }
  const injectedContent = parsed.toString()
  return { injectedContent, errorOverlayStyles }
}

module.exports = getErrorOverlay
