const { getTheme } = require("./theme")
const base = require("./base")
const baseUi = require("./base-ui")
const themed = require("./themed")
const { resetSsxCache, getSsxCache } = require("./cache")

const staticStylesInit = () => {
  resetSsxCache()
  const theme = getTheme()
  base(theme)
  baseUi(theme)
  themed(theme)
  return getSsxCache()
}

module.exports = staticStylesInit
