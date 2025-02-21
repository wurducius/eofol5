const config = require("./config")
const utilCompile = require("./util-compile")
const styles = require("./styles")
const extract = require("./extract")
const inject = require("./inject")
const internals = require("./internals")

module.exports = { ...config, ...utilCompile, ...styles, ...extract, ...inject, ...internals }
