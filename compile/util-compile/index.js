const fs = require("./fs")
const efs = require("./e-fs")
const obj = require("./obj")
const spawn = require("./spawn")
const crypto = require("./crypto")
const string = require("./string")
const func = require("./func")

module.exports = { ...fs, ...efs, ...obj, ...spawn, ...crypto, ...string, ...func }
