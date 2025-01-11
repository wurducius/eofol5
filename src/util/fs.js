const path = require("node:path")
const fs = require("node:fs")

const join = path.join

const read = fs.readFileSync

const exists = fs.existsSync

const mkdir = fs.mkdirSync

const write = fs.writeSync

module.exports = { join, read, exists, mkdir, write }
