const staticStylesInit = require("./static-styles-init")
const stylesheets = require("./stylesheets")
const ssx = require("./ssx")

module.exports = { staticStylesInit, ...stylesheets, ...ssx }
