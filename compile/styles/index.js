const staticStylesInit = require("./static-styles-init")
const stylesheets = require("./stylesheets")
const theme = require("./theme")
const styleConstants = require("./constants")

module.exports = { staticStylesInit, ...stylesheets, ...theme, ...styleConstants }
