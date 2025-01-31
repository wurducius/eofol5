const getConfig = require("../config/config")
const { read, join } = require("../util-compile/fs")
const HTMLParser = require("node-html-parser")
const { EOFOL_ROOT_ELEMENT_ID } = require("../constants")
const replaceRootElementId = require("./root-element-id")
const config = getConfig()

const errorOverlayHtml = read(join(config.PATH.CWD, "resources", "error-overlay", "error-overlay.html")).toString()

const errorOverlayStyles = replaceRootElementId(
  read(join(config.PATH.CWD, "resources", "error-overlay", "error-overlay.css")).toString(),
)

const getErrorOverlay = (content) => {
  const parsed = HTMLParser.parse(content.toString())
  const rootElement = parsed.getElementById(EOFOL_ROOT_ELEMENT_ID)
  if (rootElement) {
    rootElement.innerHTML = rootElement.innerHTML + errorOverlayHtml
  }
  const injectedContent = parsed.toString()
  return { injectedContent, errorOverlayStyles }
}

module.exports = getErrorOverlay
