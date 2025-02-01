const fs = require("./fs")
const obj = require("./obj")
const spawn = require("./spawn")

module.exports = { ...fs, ...obj, ...spawn }
