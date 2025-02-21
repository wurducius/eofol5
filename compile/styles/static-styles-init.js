const { getTheme } = require("./theme")
const { eReadFull, join, pipe } = require("../util-compile")
const { getConfig } = require("../config")
const { injectRootId } = require("../inject")
const { resetSsxCache, appendSsxCache, getSsxCache } = require("../extract/ssx")
const { base, baseUi, themed } = require("./stylesheets")

const config = getConfig()

const getInlineStylesheetPath = (name) => join(config.PATH.RESOURCES_STYLES, `${name}${config.EXT.CSS}`)

const stylesheets = { ssx: [base, baseUi, themed], inline: ["basic", "animation"] }

const staticStylesInit = () => {
  resetSsxCache()
  const theme = getTheme()
  stylesheets.inline.forEach(pipe(getInlineStylesheetPath, eReadFull, injectRootId, appendSsxCache))
  stylesheets.ssx.forEach((stylesheet) => {
    stylesheet(theme)
  })
  return getSsxCache()
}

module.exports = staticStylesInit
