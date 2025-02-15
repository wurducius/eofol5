const { getTheme } = require("./theme")
const { eReadFull } = require("../util-compile")
const { getConfig } = require("../config")
const { injectRootId } = require("../helper")
const { base, baseUi, themed } = require("./stylesheets")
const { resetSsxCache, appendSsxCache, getSsxCache } = require("./ssx")

const config = getConfig()

const basicStyles = injectRootId(eReadFull(config.PATH.RESOURCES_STYLES, `basic${config.EXT.CSS}`))
const animationStyles = eReadFull(config.PATH.RESOURCES_STYLES, `animation${config.EXT.CSS}`)

const staticStylesInit = () => {
  resetSsxCache()
  const theme = getTheme()
  appendSsxCache(basicStyles)
  base(theme)
  baseUi(theme)
  themed(theme)
  appendSsxCache(animationStyles)
  return getSsxCache()
}

module.exports = staticStylesInit
