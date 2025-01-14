const path = require("node:path")
const fs = require("node:fs")
const { rimrafSync } = require("rimraf")

const join = path.join

const parse = path.parse

const resolve = path.resolve

const sep = path.sep

const read = fs.readFileSync

const exists = fs.existsSync

const mkdir = fs.mkdirSync

const write = (path, content) => fs.writeFileSync(path, content)

const cp = fs.cpSync

const readDir = fs.readdirSync

const isDirectory = (path) => fs.lstatSync(path).isDirectory()

const stat = (path) => fs.statSync(path)

const rm = rimrafSync

const touch = (path) => {
  if (!exists(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

module.exports = { join, read, exists, mkdir, write, rm, touch, parse, resolve, sep, cp, readDir, isDirectory, stat }
