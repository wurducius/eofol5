const fs = require("./fs")
const efs = require("./e-fs")
const obj = require("./obj")
const spawn = require("./spawn")

module.exports = { ...fs, ...efs, ...obj, ...spawn }
